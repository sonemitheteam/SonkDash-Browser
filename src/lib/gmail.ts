import { GmailMessage } from '../types/browser';

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

/**
 * Encodes a string to RFC 2822 base64url format for Gmail API
 */
function createBase64Email(to: string, from: string, subject: string, bodyText: string): string {
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const emailLines = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    bodyText,
  ];

  const email = emailLines.join('\r\n');
  const base64 = btoa(unescape(encodeURIComponent(email)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Decodes Gmail API message snippet or body payload
 */
function parseHeaders(headers: Array<{ name: string; value: string }>) {
  const headerMap: Record<string, string> = {};
  for (const h of headers || []) {
    headerMap[h.name.toLowerCase()] = h.value;
  }
  return headerMap;
}

function formatDate(dateHeader?: string): string {
  if (!dateHeader) return 'Reciente';
  try {
    const d = new Date(dateHeader);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString([], { day: 'numeric', month: 'short' });
  } catch {
    return dateHeader;
  }
}

/**
 * Fetch current user profile info from Gmail API
 */
export async function getGmailUserProfile(accessToken: string): Promise<GmailProfile | null> {
  try {
    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      console.warn('Failed to fetch Gmail profile:', res.status, res.statusText);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching Gmail profile:', error);
    return null;
  }
}

/**
 * Fetch real messages from Gmail API for the authenticated user
 */
export async function getRealGmailMessages(accessToken: string, maxResults: number = 15): Promise<{
  messages: GmailMessage[];
  unreadCount: number;
}> {
  try {
    // 1. List messages
    const listRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}&q=in:inbox`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!listRes.ok) {
      throw new Error(`Gmail API error ${listRes.status}: ${listRes.statusText}`);
    }

    const listData = await listRes.json();
    const messageIds: Array<{ id: string; threadId: string }> = listData.messages || [];

    if (messageIds.length === 0) {
      return { messages: [], unreadCount: 0 };
    }

    // 2. Fetch details for each message in parallel (batch of up to 15)
    const detailsPromises = messageIds.map(async ({ id }) => {
      try {
        const msgRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!msgRes.ok) return null;
        return await msgRes.json();
      } catch (e) {
        console.warn(`Error fetching message ${id}:`, e);
        return null;
      }
    });

    const results = await Promise.all(detailsPromises);
    const parsedMessages: GmailMessage[] = [];
    let unreads = 0;

    for (const item of results) {
      if (!item) continue;
      const headers = parseHeaders(item.payload?.headers || []);
      const labelIds: string[] = item.labelIds || [];
      const isUnread = labelIds.includes('UNREAD');
      if (isUnread) unreads++;

      const senderFull = headers['from'] || 'Desconocido';
      // Extract sender display name e.g. "Google <no-reply@...>" -> "Google"
      let sender = senderFull;
      const nameMatch = senderFull.match(/^"?([^"<]+)"?\s*<.*>$/);
      if (nameMatch) {
        sender = nameMatch[1].trim();
      } else if (senderFull.includes('@')) {
        sender = senderFull.split('@')[0];
      }

      // Determine category from labelIds or content
      let category = 'Principal';
      if (labelIds.includes('CATEGORY_SOCIAL')) category = 'Social';
      else if (labelIds.includes('CATEGORY_PROMOTIONS')) category = 'Promociones';
      else if (labelIds.includes('CATEGORY_UPDATES')) category = 'Actualizaciones';
      else if (labelIds.includes('CATEGORY_FORUMS')) category = 'Social';

      parsedMessages.push({
        id: item.id,
        sender,
        from: headers['from'] || '',
        subject: headers['subject'] || '(Sin asunto)',
        snippet: item.snippet ? item.snippet.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&') : '',
        date: formatDate(headers['date']),
        read: !isUnread,
        category,
        starred: labelIds.includes('STARRED'),
      });
    }

    return {
      messages: parsedMessages,
      unreadCount: unreads,
    };
  } catch (error) {
    console.error('Error fetching real Gmail messages:', error);
    throw error;
  }
}

/**
 * Send an email directly through the Gmail API
 */
export async function sendRealGmailMessage(
  accessToken: string,
  userEmail: string,
  to: string,
  subject: string,
  body: string
): Promise<{ success: boolean; id?: string }> {
  try {
    const rawMessage = createBase64Email(to, userEmail, subject, body);

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: rawMessage,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error enviando email (${res.status}): ${errText}`);
    }

    const data = await res.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Error sending real Gmail message:', error);
    throw error;
  }
}
