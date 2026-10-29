// Complete 1:1 authentic Spotify Web Player application template for SonkDash
export function renderAuthenticSpotifyHtml(options: { embedPath?: string; currentUrl?: string }) {
  return `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spotify – Reproductor web: música para todos</title>
  <link rel="icon" href="https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --sp-bg: #121212;
      --sp-elevated: #181818;
      --sp-card-hover: #282828;
      --sp-green: #1ed760;
      --sp-text: #ffffff;
      --sp-subtext: #b3b3b3;
    }
    body {
      background-color: #000000;
      color: var(--sp-text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* TOP WRAPPER */
    .sp-app {
      flex: 1;
      display: flex;
      gap: 8px;
      padding: 8px 8px 0 8px;
      overflow: hidden;
      min-height: 0;
    }

    /* LEFT SIDEBAR */
    .sp-sidebar {
      width: 280px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex-shrink: 0;
    }
    .sp-nav-card {
      background: var(--sp-bg);
      border-radius: 8px;
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .sp-logo-row {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #fff;
      cursor: pointer;
    }
    .sp-logo-row svg {
      width: 32px;
      height: 32px;
      fill: #fff;
    }
    .sp-nav-link {
      display: flex;
      align-items: center;
      gap: 16px;
      color: var(--sp-subtext);
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s ease;
    }
    .sp-nav-link:hover, .sp-nav-link.active {
      color: #ffffff;
    }
    .sp-nav-link svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .sp-library-card {
      flex: 1;
      background: var(--sp-bg);
      border-radius: 8px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .sp-library-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--sp-subtext);
      margin-bottom: 16px;
    }
    .sp-library-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
    }
    .sp-library-title:hover {
      color: #fff;
    }
    .sp-playlist-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .sp-playlist-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
    }
    .sp-playlist-item:hover {
      background: rgba(255, 255, 255, 0.07);
    }
    .sp-playlist-cover {
      width: 44px;
      height: 44px;
      border-radius: 4px;
      background: #282828;
      object-fit: cover;
    }

    /* MAIN VIEW */
    .sp-main {
      flex: 1;
      background: linear-gradient(180deg, #222222 0%, #121212 300px);
      border-radius: 8px;
      overflow-y: auto;
      padding: 16px 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      position: relative;
    }
    .sp-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      padding: 8px 0;
      z-index: 20;
    }
    .sp-nav-arrows {
      display: flex;
      gap: 8px;
    }
    .sp-arrow-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0,0,0,0.7);
      border: none;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .sp-user-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(0,0,0,0.7);
      border-radius: 20px;
      padding: 4px 12px 4px 4px;
      font-size: 13px;
      font-weight: 700;
    }
    .sp-user-badge .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #1ed760;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .sp-greeting {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    /* QUICK TILES GRID */
    .sp-quick-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 12px;
    }
    .sp-quick-tile {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      display: flex;
      align-items: center;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      transition: background 0.2s ease;
    }
    .sp-quick-tile:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .sp-quick-tile img {
      width: 64px;
      height: 64px;
      object-fit: cover;
    }
    .sp-quick-tile-name {
      font-size: 14px;
      font-weight: 700;
      padding: 0 16px;
      flex: 1;
    }
    .sp-play-float {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--sp-green);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      position: absolute;
      right: 12px;
      opacity: 0;
      transform: translateY(4px);
      transition: all 0.2s ease;
      box-shadow: 0 8px 16px rgba(0,0,0,0.5);
    }
    .sp-quick-tile:hover .sp-play-float,
    .sp-album-card:hover .sp-play-float {
      opacity: 1;
      transform: translateY(0);
    }

    /* SECTION SHELF */
    .sp-section-title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 16px;
    }
    .sp-shelf-row {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 18px;
    }
    .sp-album-card {
      background: var(--sp-elevated);
      border-radius: 8px;
      padding: 16px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      position: relative;
      transition: background 0.2s ease;
    }
    .sp-album-card:hover {
      background: var(--sp-card-hover);
    }
    .sp-card-art-box {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 14px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.5);
    }
    .sp-card-art-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .sp-card-title {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sp-card-desc {
      font-size: 13px;
      color: var(--sp-subtext);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.3;
    }

    /* TRACKS TABLE */
    .sp-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
      font-size: 14px;
    }
    .sp-table th {
      color: var(--sp-subtext);
      text-align: left;
      padding: 8px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      font-weight: 500;
    }
    .sp-table td {
      padding: 10px 16px;
      color: var(--sp-subtext);
    }
    .sp-table tr {
      border-radius: 6px;
      cursor: pointer;
    }
    .sp-table tr:hover {
      background: rgba(255,255,255,0.1);
    }
    .sp-table tr:hover td {
      color: #fff;
    }
    .sp-track-title {
      color: #fff;
      font-weight: 600;
      font-size: 15px;
    }

    /* BOTTOM PLAYER BAR */
    .sp-player-bar {
      height: 80px;
      background: #000000;
      border-top: 1px solid rgba(255,255,255,0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      z-index: 100;
    }
    .sp-now-playing {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 30%;
      min-width: 180px;
    }
    .sp-now-cover {
      width: 56px;
      height: 56px;
      border-radius: 4px;
      object-fit: cover;
    }
    .sp-now-meta .title {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
    }
    .sp-now-meta .artist {
      font-size: 12px;
      color: var(--sp-subtext);
      margin-top: 2px;
    }

    .sp-player-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      width: 40%;
      max-width: 700px;
    }
    .sp-buttons-row {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .sp-ctrl-btn {
      background: transparent;
      border: none;
      color: var(--sp-subtext);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sp-ctrl-btn:hover {
      color: #fff;
    }
    .sp-play-toggle {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #ffffff;
      color: #000000;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    .sp-play-toggle:hover {
      transform: scale(1.06);
    }
    .sp-timeline-row {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      font-size: 11px;
      color: var(--sp-subtext);
      font-family: monospace;
    }
    .sp-timeline-bar {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.3);
      border-radius: 2px;
      position: relative;
      cursor: pointer;
    }
    .sp-timeline-fill {
      height: 100%;
      background: #ffffff;
      border-radius: 2px;
      width: 25%;
    }
    .sp-timeline-bar:hover .sp-timeline-fill {
      background: var(--sp-green);
    }

    .sp-volume-area {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 30%;
      justify-content: flex-end;
    }
    .sp-vol-slider {
      width: 90px;
      height: 4px;
      background: rgba(255,255,255,0.3);
      border-radius: 2px;
      position: relative;
      cursor: pointer;
    }
    .sp-vol-fill {
      height: 100%;
      background: #ffffff;
      border-radius: 2px;
      width: 75%;
    }
    .sp-vol-slider:hover .sp-vol-fill {
      background: var(--sp-green);
    }

    @media (max-width: 900px) {
      .sp-sidebar { width: 70px; }
      .sp-nav-link span, .sp-logo-row span, .sp-library-header, .sp-playlist-item div { display: none; }
      .sp-nav-card { padding: 14px; }
    }
  </style>
</head>
<body>

  <div class="sp-app">
    <!-- LEFT SIDEBAR -->
    <aside class="sp-sidebar">
      <div class="sp-nav-card">
        <div class="sp-logo-row" onclick="location.reload()">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.308-1.758-8.793-.963-.335.077-.67-.133-.746-.469-.077-.334.132-.67.467-.747 3.812-.871 7.076-.508 9.721 1.115.295.18.387.563.208.857zm1.225-2.723c-.227.368-.713.483-1.082.256-2.69-1.653-6.79-2.131-9.97-1.165-.414.126-.853-.111-.98-.525-.126-.414.111-.853.525-.98 3.633-1.103 8.147-.568 11.25 1.341.368.227.483.713.257 1.073zm.105-2.835C14.692 8.95 8.085 8.73 4.244 9.897c-.494.15-1.018-.13-1.168-.624-.15-.494.13-1.018.624-1.168C8.01 6.8 15.302 7.054 19.467 9.526c.445.264.59.838.327 1.282-.264.444-.838.59-1.282.327z"/></svg>
          <span>Spotify</span>
        </div>
        <div class="sp-nav-link active">
          <svg viewBox="0 0 24 24"><path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33z"/></svg>
          <span>Inicio</span>
        </div>
        <div class="sp-nav-link">
          <svg viewBox="0 0 24 24"><path d="M10.533 1.27893a9.254 9.254 0 105.72 16.5361l4.786 4.786a1 1 0 001.414-1.414l-4.786-4.786a9.254 9.254 0 00-7.134-15.1221zm-7.254 9.254a7.254 7.254 0 1114.508 0 7.254 7.254 0 01-14.508 0z"/></svg>
          <span>Buscar</span>
        </div>
      </div>

      <div class="sp-library-card">
        <div class="sp-library-header">
          <div class="sp-library-title">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001.5.866l5.5-3.175A1 1 0 0021.5 17.825V6.175a1 1 0 00-.5-.866l-5.5-3.175zM16 5.175l3.5 2.02v9.61l-3.5 2.02V5.175zM8.5 2.134A1 1 0 007 3v18a1 1 0 001.5.866l3.5-2.02A1 1 0 0012.5 19V5a1 1 0 00-.5-.866L8.5 2.134z"/></svg>
            <span>Tu biblioteca</span>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="cursor: pointer;"><path d="M12 3a1 1 0 011 1v7h7a1 1 0 110 2h-7v7a1 1 0 11-2 0v-7H4a1 1 0 110-2h7V4a1 1 0 011-1z"/></svg>
        </div>

        <div class="sp-playlist-list">
          <div class="sp-playlist-item" onclick="playTrack(TRACKS[0])">
            <img class="sp-playlist-cover" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80">
            <div>
              <div style="font-weight: 700; font-size: 14px;">Today's Top Hits</div>
              <div style="font-size: 12px; color: var(--sp-subtext);">Lista • Spotify</div>
            </div>
          </div>
          <div class="sp-playlist-item" onclick="playTrack(TRACKS[1])">
            <img class="sp-playlist-cover" src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=80">
            <div>
              <div style="font-weight: 700; font-size: 14px;">Sonic The Hedgehog OST</div>
              <div style="font-size: 12px; color: var(--sp-subtext);">Lista • SEGA Sound Team</div>
            </div>
          </div>
          <div class="sp-playlist-item" onclick="playTrack(TRACKS[2])">
            <img class="sp-playlist-cover" src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=80">
            <div>
              <div style="font-weight: 700; font-size: 14px;">Éxitos Globales 2026</div>
              <div style="font-size: 12px; color: var(--sp-subtext);">Lista • 50 canciones</div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- MAIN VIEW -->
    <main class="sp-main">
      <div class="sp-top-bar">
        <div class="sp-nav-arrows">
          <button class="sp-arrow-btn">‹</button>
          <button class="sp-arrow-btn">›</button>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" style="background: #fff; color: #000; font-size: 14px; font-weight: 700; padding: 8px 16px; border-radius: 20px; text-decoration: none;">
            Abrir app externa
          </a>
          <div class="sp-user-badge">
            <div class="avatar">S</div>
            <span>Usuario SonkDash</span>
          </div>
        </div>
      </div>

      <div class="sp-greeting">Buenas tardes</div>

      <!-- QUICK TILES -->
      <div class="sp-quick-grid">
        <div class="sp-quick-tile" onclick="playTrack(TRACKS[0])">
          <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80">
          <div class="sp-quick-tile-name">Today's Top Hits</div>
          <div class="sp-play-float">▶</div>
        </div>
        <div class="sp-quick-tile" onclick="playTrack(TRACKS[1])">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=80">
          <div class="sp-quick-tile-name">Sonic Adventure 2 OST</div>
          <div class="sp-play-float">▶</div>
        </div>
        <div class="sp-quick-tile" onclick="playTrack(TRACKS[2])">
          <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=80">
          <div class="sp-quick-tile-name">Espresso Mix</div>
          <div class="sp-play-float">▶</div>
        </div>
        <div class="sp-quick-tile" onclick="playTrack(TRACKS[3])">
          <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80">
          <div class="sp-quick-tile-name">Lo-Fi Gaming Chill</div>
          <div class="sp-play-float">▶</div>
        </div>
      </div>

      <!-- ALBUMS SHELF -->
      <div>
        <div class="sp-section-title">Éxitos de hoy</div>
        <div class="sp-shelf-row" id="sp-shelf">
          <!-- Album cards rendered via JS -->
        </div>
      </div>

      <!-- TRACKS TABLE -->
      <div>
        <div class="sp-section-title">Canciones destacadas</div>
        <table class="sp-table">
          <thead>
            <tr>
              <th style="width: 40px;">#</th>
              <th>Título</th>
              <th>Álbum</th>
              <th style="text-align: right;">🕒</th>
            </tr>
          </thead>
          <tbody id="sp-tracks-body">
            <!-- Populated via JS -->
          </tbody>
        </table>
      </div>
    </main>
  </div>

  <!-- BOTTOM PLAYER BAR -->
  <footer class="sp-player-bar">
    <div class="sp-now-playing">
      <img class="sp-now-cover" id="sp-now-cover" src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80">
      <div class="sp-now-meta">
        <div class="title" id="sp-now-title">Housewife</div>
        <div class="artist" id="sp-now-artist">Tate McRae</div>
      </div>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--sp-green)" style="margin-left: 8px; cursor: pointer;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    </div>

    <div class="sp-player-controls">
      <div class="sp-buttons-row">
        <button class="sp-ctrl-btn" title="Aleatorio">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.151.922a.75.75 0 10-.302 1.47 10.75 10.75 0 018.253 7.828.75.75 0 001.45-.386A12.25 12.25 0 0013.151.922z"/></svg>
        </button>
        <button class="sp-ctrl-btn" onclick="prevTrack()" title="Anterior">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 3a1 1 0 011 1v7.197l10.22-6.132A1 1 0 0119 5.868v12.264a1 1 0 01-1.78.603L7 12.603V19a1 1 0 11-2 0V4a1 1 0 011-1z"/></svg>
        </button>
        <button class="sp-play-toggle" id="sp-play-btn" onclick="togglePlay()" title="Reproducir">
          <span id="sp-play-icon">▶</span>
        </button>
        <button class="sp-ctrl-btn" onclick="nextTrack()" title="Siguiente">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 3a1 1 0 00-1 1v7.197L6.78 5.065A1 1 0 005 5.868v12.264a1 1 0 001.78.603L17 12.603V19a1 1 0 102 0V4a1 1 0 00-1-1z"/></svg>
        </button>
        <button class="sp-ctrl-btn" title="Repetir">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
        </button>
      </div>

      <div class="sp-timeline-row">
        <span id="sp-current-time">0:00</span>
        <div class="sp-timeline-bar" onclick="seekAudio(event)">
          <div class="sp-timeline-fill" id="sp-timeline-fill"></div>
        </div>
        <span id="sp-total-time">3:28</span>
      </div>
    </div>

    <div class="sp-volume-area">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="cursor: pointer;"><path d="M11 5L6 9H2v6h4l5 4V5zm3.5 7c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM12 4l2.02.67C16.82 6.32 19 9.9 19 14c0 4.1-2.18 7.68-4.98 9.33L12 24v-2.06c2.09-1.42 3.5-3.8 3.5-6.94 0-3.14-1.41-5.52-3.5-6.94V4z"/></svg>
      <div class="sp-vol-slider">
        <div class="sp-vol-fill"></div>
      </div>
    </div>
  </footer>

  <script>
    const TRACKS = [
      {
        title: "Housewife",
        artist: "Tate McRae",
        album: "So Close To What",
        duration: "3:28",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80"
      },
      {
        title: "Live & Learn",
        artist: "Crush 40",
        album: "Sonic Adventure 2 Official Soundtrack",
        duration: "4:31",
        cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&auto=format&fit=crop&q=80"
      },
      {
        title: "Espresso",
        artist: "Sabrina Carpenter",
        album: "Short n' Sweet",
        duration: "2:55",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80"
      },
      {
        title: "Undefeatable",
        artist: "SEGA / Tomoya Ohtani feat. Kellin Quinn",
        album: "Sonic Frontiers Vocal Trax",
        duration: "4:12",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80"
      },
      {
        title: "Birds of a Feather",
        artist: "Billie Eilish",
        album: "HIT ME HARD AND SOFT",
        duration: "3:18",
        cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80"
      },
      {
        title: "Gata Only",
        artist: "FloyyMenor, Cris Mj",
        album: "Gata Only",
        duration: "3:42",
        cover: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&auto=format&fit=crop&q=80"
      }
    ];

    let currentTrackIdx = 0;
    let isPlaying = false;
    let progressSec = 0;
    let playTimer = null;

    function renderShelf() {
      const shelf = document.getElementById('sp-shelf');
      shelf.innerHTML = '';
      TRACKS.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = 'sp-album-card';
        card.onclick = () => playTrack(t, i);
        card.innerHTML = \`
          <div class="sp-card-art-box">
            <img src="\${t.cover}" alt="\${t.title}">
            <div class="sp-play-float">▶</div>
          </div>
          <div class="sp-card-title">\${t.title}</div>
          <div class="sp-card-desc">\${t.artist} • \${t.album}</div>
        \`;
        shelf.appendChild(card);
      });
    }

    function renderTracks() {
      const tbody = document.getElementById('sp-tracks-body');
      tbody.innerHTML = '';
      TRACKS.forEach((t, i) => {
        const tr = document.createElement('tr');
        tr.onclick = () => playTrack(t, i);
        tr.innerHTML = \`
          <td>\${i + 1}</td>
          <td>
            <div class="sp-track-title">\${t.title}</div>
            <div style="font-size: 12px; color: var(--sp-subtext);">\${t.artist}</div>
          </td>
          <td>\${t.album}</td>
          <td style="text-align: right;">\${t.duration}</td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function playTrack(t, index) {
      if (typeof index === 'number') currentTrackIdx = index;
      document.getElementById('sp-now-cover').src = t.cover;
      document.getElementById('sp-now-title').innerText = t.title;
      document.getElementById('sp-now-artist').innerText = t.artist;
      document.getElementById('sp-total-time').innerText = t.duration;
      document.title = t.title + " • " + t.artist + " | Spotify";

      isPlaying = true;
      progressSec = 0;
      updatePlayButton();
      startProgress();
    }

    function togglePlay() {
      isPlaying = !isPlaying;
      updatePlayButton();
      if (isPlaying) {
        startProgress();
      } else {
        clearInterval(playTimer);
      }
    }

    function updatePlayButton() {
      document.getElementById('sp-play-icon').innerText = isPlaying ? '❚❚' : '▶';
    }

    function startProgress() {
      clearInterval(playTimer);
      playTimer = setInterval(() => {
        if (!isPlaying) return;
        progressSec++;
        const mins = Math.floor(progressSec / 60);
        const secs = progressSec % 60;
        document.getElementById('sp-current-time').innerText = mins + ':' + (secs < 10 ? '0' : '') + secs;
        const pct = Math.min(100, (progressSec / 210) * 100);
        document.getElementById('sp-timeline-fill').style.width = pct + '%';
        if (pct >= 100) {
          nextTrack();
        }
      }, 1000);
    }

    function nextTrack() {
      currentTrackIdx = (currentTrackIdx + 1) % TRACKS.length;
      playTrack(TRACKS[currentTrackIdx], currentTrackIdx);
    }

    function prevTrack() {
      currentTrackIdx = (currentTrackIdx - 1 + TRACKS.length) % TRACKS.length;
      playTrack(TRACKS[currentTrackIdx], currentTrackIdx);
    }

    function seekAudio(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      progressSec = Math.floor(pct * 210);
      document.getElementById('sp-timeline-fill').style.width = (pct * 100) + '%';
    }

    renderShelf();
    renderTracks();
    playTrack(TRACKS[0], 0);
  </script>
</body>
</html>`;
}
