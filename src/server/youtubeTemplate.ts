// Complete 1:1 authentic YouTube web application template for SonkDash
export function renderAuthenticYouTubeHtml(options: { videoId?: string; searchQuery?: string; currentUrl?: string }) {
  const initialVideoId = options.videoId || '';
  const initialSearch = options.searchQuery || '';

  return `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YouTube</title>
  <link rel="icon" href="https://www.youtube.com/s/desktop/d743f786/img/favicon.ico">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --yt-bg: #0f0f0f;
      --yt-surface: #181818;
      --yt-elevated: #212121;
      --yt-border: #272727;
      --yt-text-primary: #f1f1f1;
      --yt-text-secondary: #aaaaaa;
      --yt-red: #ff0000;
      --yt-chip-bg: rgba(255, 255, 255, 0.1);
      --yt-chip-hover: rgba(255, 255, 255, 0.2);
    }
    body {
      background-color: var(--yt-bg);
      color: var(--yt-text-primary);
      font-family: "Roboto", "Segoe UI", Arial, sans-serif;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* TOP HEADER */
    .yt-header {
      height: 56px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--yt-bg);
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .yt-header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .yt-icon-btn {
      background: transparent;
      border: none;
      color: var(--yt-text-primary);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .yt-icon-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .yt-logo {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      text-decoration: none;
      color: #fff;
    }
    .yt-logo svg {
      width: 90px;
      height: 20px;
    }
    .yt-country-badge {
      font-size: 10px;
      color: var(--yt-text-secondary);
      margin-left: 2px;
      margin-top: -8px;
    }

    .yt-header-center {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 0 1 732px;
      justify-content: center;
    }
    .yt-search-form {
      display: flex;
      align-items: center;
      flex: 1;
      max-width: 600px;
      height: 40px;
    }
    .yt-search-input-box {
      display: flex;
      align-items: center;
      flex: 1;
      height: 100%;
      background: #121212;
      border: 1px solid #303030;
      border-right: none;
      border-radius: 40px 0 0 40px;
      padding: 0 16px;
    }
    .yt-search-input-box:focus-within {
      border-color: #1c62b9;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.3);
    }
    .yt-search-input {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      font-size: 16px;
    }
    .yt-search-btn {
      width: 64px;
      height: 100%;
      background: #222222;
      border: 1px solid #303030;
      border-radius: 0 40px 40px 0;
      color: var(--yt-text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .yt-search-btn:hover {
      background: #272727;
    }
    .yt-mic-btn {
      background: #222222;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
    }
    .yt-mic-btn:hover {
      background: #272727;
    }

    .yt-header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .yt-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #0284c7;
      color: white;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      cursor: pointer;
    }

    /* MAIN CONTAINER */
    .yt-main {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    /* LEFT SIDEBAR */
    .yt-sidebar {
      width: 240px;
      background: var(--yt-bg);
      overflow-y: auto;
      padding: 12px;
      flex-shrink: 0;
      border-right: 1px solid rgba(255,255,255,0.04);
    }
    .yt-sidebar-item {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 10px 12px;
      border-radius: 10px;
      color: var(--yt-text-primary);
      text-decoration: none;
      font-size: 14px;
      cursor: pointer;
      user-select: none;
    }
    .yt-sidebar-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .yt-sidebar-item.active {
      background: #272727;
      font-weight: 600;
    }
    .yt-sidebar-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 12px 0;
    }
    .yt-sidebar-title {
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--yt-text-primary);
    }
    .yt-channel-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 8px 12px;
      border-radius: 10px;
      font-size: 14px;
      color: var(--yt-text-primary);
      cursor: pointer;
      position: relative;
    }
    .yt-channel-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .yt-channel-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: bold;
    }
    .yt-unread-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #3ea6ff;
      margin-left: auto;
    }

    /* FEED CONTENT */
    .yt-content {
      flex: 1;
      overflow-y: auto;
      background: var(--yt-bg);
      display: flex;
      flex-direction: column;
    }

    /* CATEGORIES BAR */
    .yt-chips-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 24px;
      background: var(--yt-bg);
      position: sticky;
      top: 0;
      z-index: 50;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
    }
    .yt-chips-bar::-webkit-scrollbar { display: none; }
    .yt-chip {
      background: var(--yt-chip-bg);
      color: var(--yt-text-primary);
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: background 0.15s ease;
    }
    .yt-chip:hover {
      background: var(--yt-chip-hover);
    }
    .yt-chip.active {
      background: #ffffff;
      color: #0f0f0f;
      font-weight: 600;
    }

    /* FEED GRID */
    .yt-feed-container {
      padding: 16px 24px;
      max-width: 1800px;
    }
    .yt-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 20px 16px;
    }

    /* VIDEO CARD */
    .yt-card {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
    }
    .yt-card-thumb-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 12px;
      overflow: hidden;
      background: #272727;
    }
    .yt-card-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.2s ease;
    }
    .yt-card:hover .yt-card-thumb {
      transform: scale(1.03);
    }
    .yt-duration-badge {
      position: absolute;
      bottom: 8px;
      right: 8px;
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      padding: 2px 5px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }
    .yt-card-info {
      display: flex;
      gap: 12px;
      margin-top: 12px;
    }
    .yt-card-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #3b82f6;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 13px;
      overflow: hidden;
    }
    .yt-card-meta {
      flex: 1;
      min-width: 0;
    }
    .yt-card-title {
      font-size: 15px;
      font-weight: 600;
      line-height: 1.35;
      color: var(--yt-text-primary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 4px;
    }
    .yt-card-channel {
      font-size: 13px;
      color: var(--yt-text-secondary);
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .yt-card-stats {
      font-size: 13px;
      color: var(--yt-text-secondary);
      margin-top: 2px;
    }

    /* SPONSORED CARD */
    .yt-ad-card {
      grid-column: 1 / -1;
      background: #181818;
      border: 1px solid #272727;
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 20px;
      margin-bottom: 8px;
    }
    .yt-ad-logo {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: white;
      font-size: 20px;
    }
    .yt-ad-btn {
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
    }

    /* SHORTS SHELF */
    .yt-shorts-shelf {
      margin: 32px 0;
      padding: 16px 0;
      border-top: 1px solid rgba(255,255,255,0.08);
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .yt-shorts-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 700;
    }
    .yt-shorts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
    }
    .yt-short-card {
      aspect-ratio: 9 / 16;
      border-radius: 12px;
      background: #212121;
      overflow: hidden;
      position: relative;
      cursor: pointer;
    }
    .yt-short-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .yt-short-title {
      position: absolute;
      bottom: 12px;
      left: 12px;
      right: 12px;
      font-size: 13px;
      font-weight: 600;
      color: white;
      text-shadow: 0 1px 4px rgba(0,0,0,0.8);
      line-height: 1.3;
    }

    /* VERTICAL SHORTS FULLSCREEN VIEWER */
    .yt-shorts-view {
      display: none;
      flex: 1;
      height: 100%;
      background: #000;
      overflow: hidden;
      position: relative;
      align-items: center;
      justify-content: center;
    }
    .yt-shorts-view.active {
      display: flex;
    }
    .yt-shorts-stage {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      height: calc(100vh - 80px);
      max-height: 850px;
      position: relative;
    }
    .yt-shorts-card-player {
      width: 420px;
      max-width: 90vw;
      height: 100%;
      aspect-ratio: 9 / 16;
      background: #121212;
      border-radius: 16px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0,0,0,0.8);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .yt-shorts-card-player iframe {
      width: 100%;
      height: 100%;
      border: 0;
      pointer-events: auto;
    }
    .yt-shorts-info-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px 16px;
      background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
      pointer-events: none;
      z-index: 10;
    }
    .yt-shorts-info-overlay * {
      pointer-events: auto;
    }
    .yt-shorts-author {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .yt-shorts-author-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #0284c7;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }
    .yt-shorts-author-name {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
    }
    .yt-shorts-subscribe {
      background: #fff;
      color: #0f0f0f;
      border: none;
      padding: 0 14px;
      height: 30px;
      border-radius: 15px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      margin-left: 6px;
    }
    .yt-shorts-caption {
      font-size: 14px;
      color: #f1f1f1;
      line-height: 1.4;
      text-shadow: 0 1px 3px rgba(0,0,0,0.8);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* SHORTS ACTION COLUMN */
    .yt-shorts-sidebar-actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
    }
    .yt-shorts-act-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
    }
    .yt-shorts-act-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, transform 0.1s;
    }
    .yt-shorts-act-btn:hover .yt-shorts-act-circle {
      background: rgba(255,255,255,0.3);
      transform: scale(1.05);
    }
    .yt-shorts-act-circle.liked {
      background: #ff0000;
      color: white;
    }
    .yt-shorts-act-label {
      font-size: 12px;
      font-weight: 500;
      color: #f1f1f1;
    }

    /* SHORTS NAV ARROWS */
    .yt-shorts-nav-ctrls {
      position: absolute;
      right: -70px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .yt-shorts-arrow {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #272727;
      border: 1px solid rgba(255,255,255,0.15);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    }
    .yt-shorts-arrow:hover {
      background: #3f3f3f;
    }
    .yt-shorts-close {
      position: absolute;
      top: 16px;
      left: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.2);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 50;
    }
    .yt-shorts-close:hover {
      background: rgba(255,255,255,0.2);
    }

    /* WATCH VIEW */
    .yt-watch-view {
      display: none;
      flex: 1;
      padding: 24px;
      gap: 24px;
      max-width: 1700px;
      margin: 0 auto;
      width: 100%;
    }
    .yt-watch-view.active {
      display: flex;
    }
    .yt-watch-left {
      flex: 1;
      min-width: 0;
    }
    .yt-player-box {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 12px 30px rgba(0,0,0,0.7);
    }
    .yt-player-box iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
    .yt-watch-title {
      font-size: 20px;
      font-weight: 700;
      margin-top: 14px;
      line-height: 1.3;
    }
    .yt-watch-meta-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-top: 12px;
    }
    .yt-channel-info-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .yt-sub-btn {
      background: #fff;
      color: #0f0f0f;
      border: none;
      padding: 0 16px;
      height: 36px;
      border-radius: 18px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
    }
    .yt-actions-pill-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .yt-action-pill {
      background: rgba(255,255,255,0.1);
      border: none;
      color: #fff;
      padding: 0 16px;
      height: 36px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
    .yt-action-pill:hover {
      background: rgba(255,255,255,0.2);
    }
    .yt-desc-box {
      background: rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 14px;
      margin-top: 16px;
      font-size: 14px;
      line-height: 1.5;
    }

    .yt-watch-right {
      width: 400px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .yt-related-card {
      display: flex;
      gap: 10px;
      cursor: pointer;
    }
    .yt-related-thumb {
      width: 168px;
      aspect-ratio: 16 / 9;
      border-radius: 8px;
      object-fit: cover;
      background: #272727;
      flex-shrink: 0;
    }
    .yt-related-title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .yt-related-channel {
      font-size: 12px;
      color: var(--yt-text-secondary);
      margin-top: 4px;
    }

    @media (max-width: 1000px) {
      .yt-watch-view { flex-direction: column; }
      .yt-watch-right { width: 100%; }
      .yt-sidebar { width: 72px; padding: 6px; }
      .yt-sidebar-item span, .yt-sidebar-title, .yt-channel-item span, .yt-unread-dot { display: none; }
      .yt-sidebar-item { justify-content: center; padding: 16px 0; }
    }
  </style>
</head>
<body>

  <!-- TOP HEADER -->
  <header class="yt-header">
    <div class="yt-header-left">
      <button class="yt-icon-btn" onclick="toggleSidebar()">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
      </button>

      <a class="yt-logo" onclick="goHome()">
        <svg viewBox="0 0 90 20" fill="currentColor">
          <g>
            <path fill="#FF0000" d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35031 0 10 0 10C0 10 2.24288e-07 14.6497 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6497 28.5701 10 28.5701 10C28.5701 10 28.5701 5.35031 27.9727 3.12324Z"></path>
            <path fill="#FFFFFF" d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"></path>
          </g>
          <g fill="#FFFFFF">
            <path d="M35.6 18.2V5.3H38.3V18.2H35.6Z"></path>
            <path d="M42.8 15.3C42.8 14.2 43 13.3 43.5 12.7C44 12 44.8 11.7 45.9 11.7C46.9 11.7 47.7 12 48.2 12.7C48.7 13.3 48.9 14.2 48.9 15.3V15.7C48.9 16.8 48.7 17.6 48.2 18.3C47.7 18.9 46.9 19.3 45.9 19.3C44.8 19.3 44 18.9 43.5 18.3C43 17.6 42.8 16.7 42.8 15.7V15.3ZM45.5 16.4C45.5 17.1 45.6 17.6 45.9 17.6C46.2 17.6 46.3 17.1 46.3 16.4V14.6C46.3 13.9 46.2 13.4 45.9 13.4C45.6 13.4 45.5 13.9 45.5 14.6V16.4Z"></path>
            <path d="M51.9 16.1V5.3H54.6V15.8C54.6 16.3 54.7 16.6 54.9 16.8C55.1 17 55.4 17.1 55.8 17.1C56.3 17.1 56.7 16.9 57.1 16.5C57.4 16.1 57.6 15.6 57.6 15V5.3H60.3V19H58.1L57.8 17.8C57.2 18.7 56.4 19.2 55.3 19.2C54.3 19.2 53.5 18.8 52.9 18.1C52.2 17.5 51.9 16.8 51.9 16.1Z"></path>
            <path d="M64.6 7.4H67.5V19H64.6V7.4ZM64.6 4.3H67.5V5.9H64.6V4.3Z"></path>
            <path d="M72.3 5.3V7.2H69.8V19H67.1V7.2H64.6V5.3H72.3Z"></path>
            <path d="M73.5 16.1V5.3H76.2V15.8C76.2 16.3 76.3 16.6 76.5 16.8C76.7 17 77 17.1 77.4 17.1C77.9 17.1 78.3 16.9 78.7 16.5C79 16.1 79.2 15.6 79.2 15V5.3H81.9V19H79.7L79.4 17.8C78.8 18.7 78 19.2 76.9 19.2C75.9 19.2 75.1 18.8 74.5 18.1C73.8 17.5 73.5 16.8 73.5 16.1Z"></path>
            <path d="M83.4 15.2V5.3H86.1V14.6C86.1 15.4 86.3 16 86.6 16.4C86.9 16.8 87.4 17 88 17C88.6 17 89.1 16.8 89.5 16.4C89.9 16 90.2 15.4 90.2 14.6V5.3H92.9V19H90.7L90.4 17.7C89.8 18.7 88.9 19.2 87.8 19.2C86.7 19.2 85.8 18.8 85.1 18C84.4 17.3 83.4 16.4 83.4 15.2Z"></path>
          </g>
        </svg>
        <span class="yt-country-badge">ES</span>
      </a>
    </div>

    <!-- SEARCH BAR -->
    <div class="yt-header-center">
      <form class="yt-search-form" onsubmit="handleSearch(event)">
        <div class="yt-search-input-box">
          <input
            type="text"
            id="yt-main-search"
            class="yt-search-input"
            placeholder="Buscar"
            value="${initialSearch}"
          >
        </div>
        <button type="submit" class="yt-search-btn" title="Buscar">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.87 20.17l-5.59-5.59a7.5 7.5 0 10-1.41 1.41l5.59 5.59 1.41-1.41zM10.5 16.5a6 6 0 110-12 6 6 0 010 12z"></path></svg>
        </button>
      </form>
      <button class="yt-mic-btn" title="Buscar por voz">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zm5.3 6a.75.75 0 00-1.5 0 4.5 4.5 0 01-9 0 .75.75 0 00-1.5 0 6 6 0 005.25 5.95V18.5H8.5a.75.75 0 000 1.5h7a.75.75 0 000-1.5h-2.25v-3.55A6 6 0 0017.3 9z"></path></svg>
      </button>
    </div>

    <div class="yt-header-right">
      <button class="yt-icon-btn" title="Crear">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-4.5l4 4v-11l-4 4V6zm1 11.5l-3-3V17H4V7h11v2.5l3-3v10z"></path></svg>
      </button>
      <button class="yt-icon-btn" title="Notificaciones">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2v1H4v-1l2-2v-5c0-3.07 1.63-5.64 4.5-6.32V4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.68C16.37 5.36 18 7.92 18 11v5l2 2z"></path></svg>
      </button>
      <div class="yt-avatar" title="Tu perfil">
        S
      </div>
    </div>
  </header>

  <!-- MAIN BODY -->
  <div class="yt-main">
    <!-- LEFT SIDEBAR -->
    <aside class="yt-sidebar" id="yt-sidebar">
      <div class="yt-sidebar-item active" onclick="goHome()">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
        <span>Inicio</span>
      </div>
      <div class="yt-sidebar-item" id="sidebar-shorts-btn" onclick="openShorts(0)">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 00-3.5-5.42A3.75 3.75 0 0011 5.48L6.23 13.68a3.74 3.74 0 003.5 5.42 3.75 3.75 0 003.5-1.84l1.2.5-1.43.76a3.74 3.74 0 003.5 5.42 3.75 3.75 0 003.5-1.84l4.77-8.2a3.74 3.74 0 00-3.5-5.42zM10 14.5v-5l4.5 2.5-4.5 2.5z"></path></svg>
        <span>Shorts</span>
      </div>
      <div class="yt-sidebar-item" onclick="filterChip('Suscripciones')">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.7 8.7H5.3V7h13.4v1.7zm-1.7-5H7v1.7h10V3.7zm3.4 8.6H3.6v10h16.8v-10zM12 19.3l-4-2.5V14l4 2.5 4-2.5v2.8l-4 2.5z"></path></svg>
        <span>Suscripciones</span>
      </div>

      <div class="yt-sidebar-divider"></div>

      <!-- User Subscriptions exactly from user screenshot -->
      <div class="yt-sidebar-title">
        <span>Suscripciones</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.41 1.41l4.59-4.59a1 1 0 000-1.41l-4.59-4.59a1 1 0 00-1.41 0z"></path></svg>
      </div>

      <div class="yt-channel-item" onclick="searchFor('AradirOff')">
        <div class="yt-channel-avatar" style="background: #e11d48;">A</div>
        <span>AradirOff</span>
        <div class="yt-unread-dot"></div>
      </div>
      <div class="yt-channel-item" onclick="searchFor('Bobicraft')">
        <div class="yt-channel-avatar" style="background: #16a34a;">B</div>
        <span>Bobicraft</span>
      </div>
      <div class="yt-channel-item" onclick="searchFor('AradirPrendido')">
        <div class="yt-channel-avatar" style="background: #ea580c;">AP</div>
        <span>AradirPrendido</span>
        <div class="yt-unread-dot"></div>
      </div>
      <div class="yt-channel-item" onclick="searchFor('Me Dicen el Oso Po')">
        <div class="yt-channel-avatar" style="background: #8b5cf6;">O</div>
        <span>Me Dicen el Oso Po'</span>
      </div>
      <div class="yt-channel-item" onclick="searchFor('Snaky')">
        <div class="yt-channel-avatar" style="background: #0284c7;">S</div>
        <span>Snaky</span>
      </div>
      <div class="yt-channel-item" onclick="searchFor('TheBlackHacker')">
        <div class="yt-channel-avatar" style="background: #0f172a; border: 1px solid #38bdf8;">H</div>
        <span>TheBlackHacker</span>
        <div class="yt-unread-dot"></div>
      </div>
      <div class="yt-channel-item" onclick="searchFor('Alex Crashers')">
        <div class="yt-channel-avatar" style="background: #9333ea;">AC</div>
        <span>Alex Crashers</span>
      </div>

      <div class="yt-sidebar-divider"></div>

      <div class="yt-sidebar-title">
        <span>Tú</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9.29 6.71a1 1 0 000 1.41L13.17 12l-3.88 3.88a1 1 0 101.41 1.41l4.59-4.59a1 1 0 000-1.41l-4.59-4.59a1 1 0 00-1.41 0z"></path></svg>
      </div>
      <div class="yt-sidebar-item">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg>
        <span>Tu canal</span>
      </div>
      <div class="yt-sidebar-item">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7a6.98 6.98 0 01-4.95-2.05l-1.42 1.42A8.96 8.96 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></svg>
        <span>Historial</span>
      </div>
      <div class="yt-sidebar-item">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10 8v8l6-4-6-4zm11-5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"></path></svg>
        <span>Tus videos</span>
      </div>
    </aside>

    <!-- CONTENT AREA -->
    <main class="yt-content" id="yt-content-area">
      <!-- CATEGORY CHIPS BAR (Matching user screenshot) -->
      <div class="yt-chips-bar" id="yt-chips">
        <button class="yt-chip active" onclick="filterChip('Todo')">Todo</button>
        <button class="yt-chip" onclick="filterChip('Videojuegos')">Videojuegos</button>
        <button class="yt-chip" onclick="filterChip('Música')">Música</button>
        <button class="yt-chip" onclick="filterChip('Homero Simpson')">Homero Simpson</button>
        <button class="yt-chip" onclick="filterChip('Mixes')">Mixes</button>
        <button class="yt-chip" onclick="filterChip('Mod')">Mod</button>
        <button class="yt-chip" onclick="filterChip('Friday Night Funkin\'')">Friday Night Funkin'</button>
        <button class="yt-chip" onclick="filterChip('Plants vs. Zombies 2: It\'s About Time')">Plants vs. Zombies 2: It's About Time</button>
        <button class="yt-chip" onclick="filterChip('En directo')">En directo</button>
        <button class="yt-chip" onclick="filterChip('Sonic')">Sonic The Hedgehog</button>
        <button class="yt-chip" onclick="filterChip('Minecraft')">Minecraft</button>
      </div>

      <!-- HOME FEED -->
      <div class="yt-feed-container" id="yt-home-feed">
        <div class="yt-grid" id="yt-video-grid">
          <!-- Populated by JavaScript with authentic YouTube cards -->
        </div>

        <!-- SHORTS SHELF (From user screenshot) -->
        <div class="yt-shorts-shelf">
          <div class="yt-shorts-header">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#FF0000"><path d="M17.77 10.32l-1.2-.5L18 9.06a3.74 3.74 0 00-3.5-5.42A3.75 3.75 0 0011 5.48L6.23 13.68a3.74 3.74 0 003.5 5.42 3.75 3.75 0 003.5-1.84l1.2.5-1.43.76a3.74 3.74 0 003.5 5.42 3.75 3.75 0 003.5-1.84l4.77-8.2a3.74 3.74 0 00-3.5-5.42zM10 14.5v-5l4.5 2.5-4.5 2.5z"></path></svg>
            <span>Shorts</span>
          </div>
          <div class="yt-shorts-grid" id="yt-shorts-grid">
            <!-- Shorts cards -->
          </div>
        </div>

        <div class="yt-grid" id="yt-video-grid-2">
          <!-- More video cards -->
        </div>
      </div>

      <!-- WATCH VIEW (When playing a video) -->
      <div class="yt-watch-view" id="yt-watch-view">
        <div class="yt-watch-left">
          <div class="yt-player-box">
            <iframe
              id="yt-active-iframe"
              src=""
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>

          <h1 class="yt-watch-title" id="yt-watch-title">Título del video</h1>

          <div class="yt-watch-meta-row">
            <div class="yt-channel-info-row">
              <div class="yt-card-avatar" id="yt-watch-channel-avatar">C</div>
              <div>
                <div style="font-weight: 700; font-size: 15px;" id="yt-watch-channel-name">Canal</div>
                <div style="font-size: 12px; color: var(--yt-text-secondary);" id="yt-watch-subs">1.45 M suscriptores</div>
              </div>
              <button class="yt-sub-btn">Suscribirme</button>
            </div>

            <div class="yt-actions-pill-group">
              <button class="yt-action-pill">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path></svg>
                <span id="yt-watch-likes">124 K</span>
                <span style="opacity: 0.3; margin: 0 4px;">|</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></svg>
              </button>
              <button class="yt-action-pill">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15 8v-4l7 7-7 7v-4c-5 0-9.27 3.11-11 7.5 1-6.5 5-13.5 11-13.5z"></path></svg>
                <span>Compartir</span>
              </button>
              <button class="yt-action-pill">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
                <span>Descargar</span>
              </button>
            </div>
          </div>

          <div class="yt-desc-box">
            <div style="font-weight: 700; margin-bottom: 6px;">
              <span id="yt-desc-views">345 K vistas</span> • <span id="yt-desc-date">hace 3 días</span>
            </div>
            <p id="yt-desc-text">
              Video oficial en alta definición. No olvides suscribirte al canal y activar la campanita para más contenido.
            </p>
          </div>
        </div>

        <!-- RIGHT RELATED VIDEOS -->
        <div class="yt-watch-right" id="yt-related-list">
          <!-- Related video items -->
        </div>
      </div>

      <!-- VERTICAL SHORTS VIEWER -->
      <div class="yt-shorts-view" id="yt-shorts-view">
        <button class="yt-shorts-close" onclick="closeShorts()" title="Cerrar Shorts (Esc)">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        </button>

        <div class="yt-shorts-stage">
          <!-- 9:16 Vertical Video Frame -->
          <div class="yt-shorts-card-player">
            <iframe id="yt-shorts-iframe" src="" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
            
            <div class="yt-shorts-info-overlay">
              <div class="yt-shorts-author">
                <div class="yt-shorts-author-avatar" id="yt-shorts-avatar">S</div>
                <span class="yt-shorts-author-name" id="yt-shorts-channel">@YouTubeShorts</span>
                <button class="yt-shorts-subscribe" id="yt-shorts-sub-btn" onclick="toggleShortSub()">Suscribirme</button>
              </div>
              <div class="yt-shorts-caption" id="yt-shorts-title">Título del Short</div>
            </div>
          </div>

          <!-- Vertical Action Buttons -->
          <div class="yt-shorts-sidebar-actions">
            <button class="yt-shorts-act-btn" onclick="toggleShortLike()">
              <div class="yt-shorts-act-circle" id="yt-short-like-btn">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path></svg>
              </div>
              <span class="yt-shorts-act-label" id="yt-short-likes-count">148 K</span>
            </button>

            <button class="yt-shorts-act-btn" onclick="toggleShortDislike()">
              <div class="yt-shorts-act-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></svg>
              </div>
              <span class="yt-shorts-act-label">No me gusta</span>
            </button>

            <button class="yt-shorts-act-btn" onclick="openShortComments()">
              <div class="yt-shorts-act-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm0 14H4V4h16v12z"></path></svg>
              </div>
              <span class="yt-shorts-act-label">1.2 K</span>
            </button>

            <button class="yt-shorts-act-btn" onclick="shareCurrentShort()">
              <div class="yt-shorts-act-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M15 8v-4l7 7-7 7v-4c-5 0-9.27 3.11-11 7.5 1-6.5 5-13.5 11-13.5z"></path></svg>
              </div>
              <span class="yt-shorts-act-label">Compartir</span>
            </button>
          </div>

          <!-- Up / Down navigation arrows -->
          <div class="yt-shorts-nav-ctrls">
            <button class="yt-shorts-arrow" onclick="prevShort()" title="Short anterior (Flecha Arriba)">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>
            </button>
            <button class="yt-shorts-arrow" onclick="nextShort()" title="Short siguiente (Flecha Abajo)">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script>
    // Initial catalog of popular authentic videos
    let VIDEOS = [
      {
        id: "szby7ZHLnkA",
        title: "Sonic The Hedgehog (2020) - Official Trailer - Paramount Pictures",
        channel: "Paramount Pictures",
        channelAvatar: "P",
        views: "61 M vistas",
        time: "hace 4 años",
        duration: "2:52",
        thumb: "https://i.ytimg.com/vi/szby7ZHLnkA/hqdefault.jpg",
        category: "Sonic"
      },
      {
        id: "gg33XSAtdZM",
        title: "Sonic the Hedgehog: Memories And Beyond Trailer",
        channel: "Sonic the Hedgehog",
        channelAvatar: "S",
        views: "812 K vistas",
        time: "hace 2 semanas",
        duration: "1:07",
        thumb: "https://i.ytimg.com/vi/gg33XSAtdZM/hqdefault.jpg",
        category: "Sonic"
      },
      {
        id: "u31qwQUeGuM",
        title: "Sonic The Hedgehog 3 — Tráiler Oficial en Español (Película 2024)",
        channel: "Paramount Pictures Spain",
        channelAvatar: "P",
        views: "4.8 M vistas",
        time: "hace 2 meses",
        duration: "2:54",
        thumb: "https://i.ytimg.com/vi/u31qwQUeGuM/hqdefault.jpg",
        category: "Sonic"
      },
      {
        id: "4xDzrJKXOOY",
        title: "Sonic Frontiers — 'I'm Here' Official Theme Song (4K 60FPS)",
        channel: "SEGA",
        channelAvatar: "S",
        views: "3.4 M vistas",
        time: "hace 1 año",
        duration: "4:40",
        thumb: "https://i.ytimg.com/vi/4xDzrJKXOOY/hqdefault.jpg",
        category: "Sonic"
      },
      {
        id: "9bZkp7q19f0",
        title: "Bobicraft: Sobreviví 100 Días en un Mundo Infectado en Minecraft",
        channel: "Bobicraft",
        channelAvatar: "B",
        views: "1.9 M vistas",
        time: "hace 4 semanas",
        duration: "32:15",
        thumb: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
        category: "Minecraft"
      },
      {
        id: "kJQP7kiw5Fk",
        title: "AradirOff: Reaccionando a los peores errores en videojuegos",
        channel: "AradirOff",
        channelAvatar: "A",
        views: "640 K vistas",
        time: "hace 5 días",
        duration: "12:18",
        thumb: "https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg",
        category: "Videojuegos"
      },
      {
        id: "jfKfPfyJRdk",
        title: "Homero vas a recoltalte pero con IA (Doblaje y Animación)",
        channel: "JustP1xel",
        channelAvatar: "J",
        views: "220 K vistas",
        time: "hace 1 año",
        duration: "1:27",
        thumb: "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg",
        category: "Homero Simpson"
      },
      {
        id: "dQw4w9WgXcQ",
        title: "ODIO el CHOCOLATE 💔 (Animación Épica)",
        channel: "G4Tito7w7",
        channelAvatar: "G",
        views: "110 K vistas",
        time: "hace 1 día",
        duration: "5:06",
        thumb: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        category: "Animación"
      },
      {
        id: "hTWKbfoikeg",
        title: "Plants vs. Zombies 2: It's About Time — Todas las Plantas Desbloqueadas",
        channel: "PvZ Master",
        channelAvatar: "P",
        views: "920 K vistas",
        time: "hace 6 meses",
        duration: "18:42",
        thumb: "https://i.ytimg.com/vi/hTWKbfoikeg/hqdefault.jpg",
        category: "Plants vs. Zombies 2: It's About Time"
      },
      {
        id: "fJ9rUzIMcZQ",
        title: "Friday Night Funkin' — Full Game Week 1 to 7 All Songs",
        channel: "FNF Gaming Hub",
        channelAvatar: "F",
        views: "3.2 M vistas",
        time: "hace 2 años",
        duration: "45:10",
        thumb: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg",
        category: "Friday Night Funkin'"
      }
    ];

    // Real Vertical YouTube Shorts
    let SHORTS = [
      { id: "MxRKS0c4P5Q", title: "Ecuador 1900 historia rápida y curiosidades", channel: "@HistoriaViral", thumb: "https://i.ytimg.com/vi/MxRKS0c4P5Q/hqdefault.jpg" },
      { id: "1YxlQHCLxU8", title: "Yo: las canciones de Bad Bunny son malas... Yo después:", channel: "@HumorMusica", thumb: "https://i.ytimg.com/vi/1YxlQHCLxU8/hqdefault.jpg" },
      { id: "zyHx9qzjf8M", title: "Secretos ocultos en Sonic Heroes que nunca viste", channel: "@SonicMaster", thumb: "https://i.ytimg.com/vi/zyHx9qzjf8M/hqdefault.jpg" },
      { id: "m7fHuAcbD0A", title: "El mod imposible de FNF que nadie puede pasar", channel: "@FNFShorts", thumb: "https://i.ytimg.com/vi/m7fHuAcbD0A/hqdefault.jpg" },
      { id: "Q3T_3lr157w", title: "Minecraft pero la gravedad se invierte cada 10 segundos", channel: "@MineClips", thumb: "https://i.ytimg.com/vi/Q3T_3lr157w/hqdefault.jpg" },
      { id: "q_HIxZ__b68", title: "Truco secreto que los jugadores no conocen", channel: "@GamingLatino", thumb: "https://i.ytimg.com/vi/q_HIxZ__b68/hqdefault.jpg" }
    ];

    let currentShortIndex = 0;
    let isShortLiked = false;

    function renderFeed(filterText = '') {
      const grid = document.getElementById('yt-video-grid');
      const grid2 = document.getElementById('yt-video-grid-2');
      grid.innerHTML = '';
      grid2.innerHTML = '';

      // Sponsored Card
      const adCard = document.createElement('div');
      adCard.className = 'yt-ad-card';
      adCard.innerHTML = \`
        <div class="yt-ad-logo">AI</div>
        <div style="flex: 1;">
          <div style="font-size: 11px; color: var(--yt-text-secondary); text-transform: uppercase; font-weight: 700;">Patrocinado • Google AI Studio</div>
          <div style="font-size: 16px; font-weight: 700; margin-top: 2px;">Google AI Studio: Build websites, apps, games & tools with no coding</div>
          <div style="font-size: 13px; color: var(--yt-text-secondary); margin-top: 2px;">Crea aplicaciones completas con modelos Gemini en segundos.</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="yt-ad-btn" style="background: rgba(255,255,255,0.1); color: #fff;">Ver</button>
          <button class="yt-ad-btn" style="background: #3ea6ff; color: #000;">Más información</button>
        </div>
      \`;
      grid.appendChild(adCard);

      const filtered = filterText
        ? VIDEOS.filter(v => 
            v.title.toLowerCase().includes(filterText.toLowerCase()) || 
            (v.category && v.category.toLowerCase().includes(filterText.toLowerCase())) || 
            v.channel.toLowerCase().includes(filterText.toLowerCase())
          )
        : VIDEOS;

      const listToRender = filtered.length > 0 ? filtered : VIDEOS;

      listToRender.slice(0, 4).forEach(v => {
        grid.appendChild(createVideoCard(v));
      });

      listToRender.slice(4).forEach(v => {
        grid2.appendChild(createVideoCard(v));
      });
    }

    function createVideoCard(v) {
      const card = document.createElement('div');
      card.className = 'yt-card';
      card.onclick = () => playVideo(v);
      card.innerHTML = \`
        <div class="yt-card-thumb-wrap">
          <img class="yt-card-thumb" src="\${v.thumb}" alt="\${v.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'">
          <div class="yt-duration-badge">\${v.duration || '3:45'}</div>
        </div>
        <div class="yt-card-info">
          <div class="yt-card-avatar">\${v.channelAvatar || v.channel?.charAt(0) || 'Y'}</div>
          <div class="yt-card-meta">
            <div class="yt-card-title">\${v.title}</div>
            <div class="yt-card-channel">
              <span>\${v.channel}</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1 1.4-1.4 2.8 2.8 7.4-7.4 1.4 1.4-8.8 8.7z"></path></svg>
            </div>
            <div class="yt-card-stats">\${v.views} • \${v.time}</div>
          </div>
        </div>
      \`;
      return card;
    }

    function renderShorts() {
      const container = document.getElementById('yt-shorts-grid');
      container.innerHTML = '';
      SHORTS.forEach((s, idx) => {
        const item = document.createElement('div');
        item.className = 'yt-short-card';
        item.onclick = () => openShorts(idx);
        item.innerHTML = \`
          <img class="yt-short-thumb" src="\${s.thumb}" alt="\${s.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&auto=format&fit=crop&q=80'">
          <div class="yt-short-title">\${s.title}</div>
        \`;
        container.appendChild(item);
      });
    }

    // Dynamic Live YouTube Search
    async function liveSearch(query) {
      if (!query.trim()) return;
      document.title = query + " - YouTube";
      
      try {
        const res = await fetch('/api/youtube/search?q=' + encodeURIComponent(query));
        if (res.ok) {
          const data = await res.json();
          if (data.videos && data.videos.length > 0) {
            VIDEOS = data.videos;
          }
          if (data.shorts && data.shorts.length > 0) {
            SHORTS = data.shorts;
            renderShorts();
          }
        }
      } catch (err) {
        console.warn('Live YouTube search error:', err);
      }

      renderFeed(query);
    }

    function handleSearch(e) {
      e.preventDefault();
      const q = document.getElementById('yt-main-search').value.trim();
      if (!q) return;
      goHome();
      liveSearch(q);
    }

    function searchFor(term) {
      document.getElementById('yt-main-search').value = term;
      goHome();
      liveSearch(term);
    }

    function filterChip(name) {
      document.querySelectorAll('.yt-chip').forEach(c => {
        c.classList.toggle('active', c.innerText === name);
      });
      if (name === 'Todo') {
        goHome();
      } else {
        goHome();
        liveSearch(name);
      }
    }

    // Play video with active iframe
    function playVideo(v) {
      closeShorts();
      document.getElementById('yt-home-feed').style.display = 'none';
      document.getElementById('yt-chips').style.display = 'none';
      const watchView = document.getElementById('yt-watch-view');
      watchView.classList.add('active');

      document.getElementById('yt-active-iframe').src = 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0';
      document.getElementById('yt-watch-title').innerText = v.title;
      document.getElementById('yt-watch-channel-name').innerText = v.channel;
      document.getElementById('yt-watch-channel-avatar').innerText = v.channelAvatar || v.channel?.charAt(0) || 'Y';
      document.getElementById('yt-desc-views').innerText = v.views;
      document.getElementById('yt-desc-date').innerText = v.time;
      document.title = v.title + " - YouTube";

      // Populate right sidebar with other videos
      const list = document.getElementById('yt-related-list');
      list.innerHTML = '';
      VIDEOS.filter(other => other.id !== v.id).forEach(other => {
        const row = document.createElement('div');
        row.className = 'yt-related-card';
        row.onclick = () => playVideo(other);
        row.innerHTML = \`
          <img class="yt-related-thumb" src="\${other.thumb}" alt="\${other.title}" onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'">
          <div>
            <div class="yt-related-title">\${other.title}</div>
            <div class="yt-related-channel">\${other.channel}</div>
            <div style="font-size: 11px; color: var(--yt-text-secondary);">\${other.views}</div>
          </div>
        \`;
        list.appendChild(row);
      });
    }

    // Real Vertical YouTube Shorts Player
    function openShorts(index = 0) {
      if (index < 0) index = 0;
      if (index >= SHORTS.length) index = 0;
      currentShortIndex = index;

      document.getElementById('yt-home-feed').style.display = 'none';
      document.getElementById('yt-chips').style.display = 'none';
      document.getElementById('yt-watch-view').classList.remove('active');
      document.getElementById('yt-active-iframe').src = '';

      const shortsView = document.getElementById('yt-shorts-view');
      shortsView.classList.add('active');

      const s = SHORTS[currentShortIndex];
      loadShort(s);
    }

    function loadShort(s) {
      document.getElementById('yt-shorts-iframe').src = 'https://www.youtube-nocookie.com/embed/' + s.id + '?autoplay=1&loop=1&playlist=' + s.id + '&rel=0';
      document.getElementById('yt-shorts-title').innerText = s.title;
      document.getElementById('yt-shorts-channel').innerText = s.channel || '@ShortsCreator';
      document.getElementById('yt-shorts-avatar').innerText = (s.channel ? s.channel.charAt(1) : 'S').toUpperCase();
      document.title = s.title + " #Shorts - YouTube";
      isShortLiked = false;
      document.getElementById('yt-short-like-btn').classList.remove('liked');
    }

    function nextShort() {
      currentShortIndex = (currentShortIndex + 1) % SHORTS.length;
      loadShort(SHORTS[currentShortIndex]);
    }

    function prevShort() {
      currentShortIndex = (currentShortIndex - 1 + SHORTS.length) % SHORTS.length;
      loadShort(SHORTS[currentShortIndex]);
    }

    function closeShorts() {
      const shortsView = document.getElementById('yt-shorts-view');
      shortsView.classList.remove('active');
      document.getElementById('yt-shorts-iframe').src = '';
      document.getElementById('yt-home-feed').style.display = 'block';
      document.getElementById('yt-chips').style.display = 'flex';
      document.title = "YouTube";
    }

    function toggleShortLike() {
      isShortLiked = !isShortLiked;
      const btn = document.getElementById('yt-short-like-btn');
      const count = document.getElementById('yt-short-likes-count');
      btn.classList.toggle('liked', isShortLiked);
      count.innerText = isShortLiked ? '149 K' : '148 K';
    }

    function toggleShortDislike() {
      if (isShortLiked) toggleShortLike();
    }

    function toggleShortSub() {
      const btn = document.getElementById('yt-shorts-sub-btn');
      if (btn.innerText === 'Suscribirme') {
        btn.innerText = 'Suscrito ✓';
        btn.style.background = 'rgba(255,255,255,0.2)';
        btn.style.color = '#fff';
      } else {
        btn.innerText = 'Suscribirme';
        btn.style.background = '#fff';
        btn.style.color = '#0f0f0f';
      }
    }

    function openShortComments() {
      alert("Comentarios del Short: ¡Excelente contenido supersónico en SonkDash!");
    }

    function shareCurrentShort() {
      const s = SHORTS[currentShortIndex];
      const url = "https://www.youtube.com/shorts/" + s.id;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        alert("Enlace del Short copiado al portapapeles: " + url);
      }
    }

    // Keyboard navigation for Shorts (ArrowUp / ArrowDown)
    window.addEventListener('keydown', (e) => {
      const shortsView = document.getElementById('yt-shorts-view');
      if (shortsView && shortsView.classList.contains('active')) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          nextShort();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          prevShort();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeShorts();
        }
      }
    });

    function goHome() {
      closeShorts();
      document.getElementById('yt-active-iframe').src = '';
      document.getElementById('yt-watch-view').classList.remove('active');
      document.getElementById('yt-home-feed').style.display = 'block';
      document.getElementById('yt-chips').style.display = 'flex';
      document.title = "YouTube";
      renderFeed('');
    }

    function toggleSidebar() {
      const sb = document.getElementById('yt-sidebar');
      sb.style.display = (sb.style.display === 'none') ? 'block' : 'none';
    }

    // Initialize
    renderFeed('${initialSearch}');
    renderShorts();

    ${initialSearch ? `liveSearch('${initialSearch}');` : ''}

    ${initialVideoId ? `
      const target = VIDEOS.find(v => v.id === '${initialVideoId}') || {
        id: '${initialVideoId}',
        title: 'Video de YouTube en SonkDash',
        channel: 'YouTube Video',
        channelAvatar: 'Y',
        views: '1.2 M vistas',
        time: 'hace poco',
        duration: '10:00',
        thumb: 'https://i.ytimg.com/vi/${initialVideoId}/hqdefault.jpg'
      };
      playVideo(target);
    ` : ''}
  </script>
</body>
</html>`;
}
