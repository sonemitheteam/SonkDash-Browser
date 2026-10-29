export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isLoading: boolean;
  mode: 'home' | 'search' | 'web';
  searchData?: SearchResultData | null;
  browseData?: BrowsePageData | null;
  history: string[];
  historyIndex: number;
}

export interface SearchSource {
  title: string;
  url: string;
}

export interface SearchResultData {
  query: string;
  answer: string;
  sources: SearchSource[];
  searchQueries: string[];
  executionTimeMs: number;
  timestamp: string;
}

export interface BrowsePageData {
  url: string;
  hostname: string;
  title: string;
  proxyUrl?: string;
  html?: string;
  status: number;
  adsBlocked: number;
  trackersBlocked: number;
  bytesSavedKb: number;
  elapsedMs: number;
  sonkShieldActive: boolean;
}

export interface GmailMessage {
  id: string;
  sender: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  read: boolean;
  category: string;
  starred: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  icon?: string;
  category?: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  timestamp: number;
}

export type ThemeMode = 'calido' | 'claro' | 'oscuro' | 'sistema';

export interface AdBlockConfig {
  enabled: boolean;
  blockTrackers: boolean;
  blockPopups: boolean;
  blockSocialWidgets: boolean;
  whitelistedDomains: string[];
}

export interface BrowserCustomization {
  wallpaperType: 'default' | 'preset' | 'upload' | 'url';
  wallpaperUrl?: string;
  presetId?: string;
  dimLevel: number; // 0 to 100
  blurLevel: number; // 0 to 20 px
  accentColor: string;
}

export interface ChromeProfile {
  id: string;
  name: string;
  email: string;
  avatarType: 'sonic' | 'tails' | 'knuckles' | 'shadow' | 'google' | 'custom';
  avatarUrl?: string;
  syncEnabled: boolean;
  isSignedIn: boolean;
}
