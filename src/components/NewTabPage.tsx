import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  TrendingUp,
  PenLine,
  Mail,
  RefreshCw,
  Globe,
  Youtube,
  Radio,
  Gamepad2,
  ExternalLink,
} from 'lucide-react';
import { BrowserCustomization, ChromeProfile } from '../types/browser';

interface NewTabPageProps {
  onSearch: (query: string) => void;
  onOpenGmailDrawer?: () => void;
  gmailUnreadCount?: number;
  onOpenDefaultModal?: () => void;
  isDefault?: boolean;
  onOpenSonkShield?: () => void;
  adBlockEnabled?: boolean;
  totalBlocked?: number;
  effectiveTheme: 'calido' | 'claro' | 'oscuro';
  customization?: BrowserCustomization;
  onOpenCustomization?: () => void;
  profile?: ChromeProfile;
  onOpenAccountModal?: () => void;
}

export const NewTabPage: React.FC<NewTabPageProps> = ({
  onSearch,
  effectiveTheme,
  customization,
  onOpenCustomization,
  profile,
  onOpenAccountModal,
  gmailUnreadCount = 0,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const clean = query.trim();
    if (clean) {
      onSearch(clean);
    }
  };

  const isCalido = effectiveTheme === 'calido';
  const isClaro = effectiveTheme === 'claro';

  const hasCustomWallpaper =
    customization &&
    customization.wallpaperType !== 'default' &&
    Boolean(customization.wallpaperUrl);

  const dimLevel = customization?.dimLevel ?? 25;
  const blurLevel = customization?.blurLevel ?? 0;

  const quickShortcuts = [
    { title: 'YouTube', url: 'https://www.youtube.com', icon: Youtube, color: 'text-red-500 bg-red-500/10' },
    { title: 'Spotify', url: 'https://open.spotify.com', icon: Radio, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Reddit', url: 'https://www.reddit.com', icon: Globe, color: 'text-orange-500 bg-orange-500/10' },
    { title: 'Sonic Channel', url: 'https://www.sonicthehedgehog.com', icon: Gamepad2, color: 'text-sky-500 bg-sky-500/10' },
    { title: 'Gmail', action: onOpenAccountModal, icon: Mail, color: 'text-rose-500 bg-rose-500/10', badge: gmailUnreadCount },
  ];

  const trendingTopics = [
    'Reddit',
    'YouTube',
    'Spotify',
    'Sonic The Hedgehog',
    'Noticias de hoy',
    'Minecraft',
    'Inteligencia Artificial',
  ];

  const textColor = hasCustomWallpaper
    ? 'text-white'
    : isCalido
    ? 'text-orange-950'
    : isClaro
    ? 'text-slate-900'
    : 'text-slate-100';

  const subtextColor = hasCustomWallpaper
    ? 'text-white/80'
    : isCalido
    ? 'text-orange-900/70'
    : isClaro
    ? 'text-slate-600'
    : 'text-slate-400';

  const inputContainerBg = hasCustomWallpaper
    ? 'bg-slate-950/80 backdrop-blur-md border-white/20 shadow-2xl'
    : isCalido
    ? 'bg-white border-orange-300 shadow-xl shadow-orange-900/10'
    : isClaro
    ? 'bg-white border-slate-300 shadow-xl shadow-slate-400/20'
    : 'bg-slate-950 border-sky-500/50 shadow-2xl';

  const inputTextColor = hasCustomWallpaper
    ? 'text-white'
    : isCalido || isClaro
    ? 'text-slate-900'
    : 'text-white';

  const inputPlaceholder = hasCustomWallpaper
    ? 'placeholder-white/50'
    : isCalido
    ? 'placeholder-orange-900/40'
    : 'placeholder-slate-400';

  return (
    <div className={`w-full flex-1 flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none transition-colors ${textColor}`}>
      {/* Dynamic Custom Wallpaper Background Layer */}
      {hasCustomWallpaper && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 scale-105"
            style={{
              backgroundImage: `url(${customization.wallpaperUrl})`,
              filter: `blur(${blurLevel}px)`,
            }}
          />
          {/* Dimmer Overlay for legibility */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{ backgroundColor: `rgba(0, 0, 0, ${dimLevel / 100})` }}
          />
        </>
      )}

      {/* Default Ambient Glow if no custom wallpaper */}
      {!hasCustomWallpaper && (
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] rounded-full blur-[100px] pointer-events-none ${
            isCalido ? 'bg-orange-300/25' : isClaro ? 'bg-sky-200/40' : 'bg-sky-500/15'
          }`}
        />
      )}

      {/* Top-Right: Chrome-Style Gmail & Profile Avatar Header */}
      <div className="absolute top-4 right-5 z-20 flex items-center gap-2">
        {onOpenAccountModal && (
          <button
            onClick={onOpenAccountModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-md backdrop-blur-md transition-all cursor-pointer ${
              hasCustomWallpaper
                ? 'bg-black/40 border-white/20 text-white hover:bg-black/60'
                : isCalido
                ? 'bg-white/80 border-orange-200 text-orange-950 hover:bg-white shadow-orange-900/5'
                : 'bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800'
            }`}
            title="Cuenta de Google vinculada a SonkDash"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center font-bold text-xs text-white">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : profile?.avatarType === 'sonic' ? (
                <img src="/assets/aistudio/sonkdash_logo_clean.png" alt="" className="w-5 h-5 object-contain" />
              ) : (
                <span>{(profile?.name || 'E').charAt(0).toUpperCase()}</span>
              )}
            </div>
            <span className="text-xs font-semibold hidden sm:inline truncate max-w-[120px]">
              {profile?.name || 'elsonemi8890'}
            </span>
            {gmailUnreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>
        )}
      </div>

      {/* Hero Mascot: cropped clean without white edges */}
      <div className="flex flex-col items-center text-center mb-6 relative z-10">
        <div className="relative mb-3 group">
          <div
            className={`absolute inset-0 rounded-full blur-2xl transition-all ${
              isCalido ? 'bg-orange-400/30 group-hover:bg-orange-400/50' : 'bg-sky-500/25 group-hover:bg-sky-400/40'
            }`}
          />
          <img
            src="/assets/aistudio/sonkdash_logo_clean.png"
            alt="SonkDash Mascot"
            className="relative w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-[0_12px_32px_rgba(234,88,12,0.4)] transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Clean trimmed typographic logo */}
        <div className="my-2 flex justify-center">
          <img
            src="/assets/aistudio/sonkdash_name_perfect.png"
            alt="SonkDash"
            className="h-10 sm:h-12 object-contain drop-shadow-[0_4px_16px_rgba(2,132,199,0.4)]"
          />
        </div>

        <p className={`text-xs sm:text-sm max-w-md mt-1 font-medium drop-shadow-xs ${subtextColor}`}>
          Navegador Web Ultra Rápido • Conexión Gmail • SonkShield AdBlock
        </p>
      </div>

      {/* Main Omnibox Search Bar */}
      <div className="w-full max-w-2xl relative z-10">
        <form onSubmit={handleSubmit} className="relative group">
          <div
            className={`absolute -inset-1 rounded-2xl blur-xs opacity-50 group-hover:opacity-85 transition duration-300 ${
              isCalido
                ? 'bg-gradient-to-r from-orange-400 via-amber-500 to-rose-400'
                : 'bg-gradient-to-r from-sky-500 via-blue-600 to-amber-500'
            }`}
          />
          <div className={`relative flex items-center border rounded-2xl px-4 py-3.5 ${inputContainerBg}`}>
            <Search className={`w-5 h-5 mr-3 shrink-0 ${isCalido ? 'text-orange-500' : 'text-sky-500'}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              placeholder="Escribe una URL o busca en la web a velocidad supersónica..."
              className={`w-full bg-transparent text-sm sm:text-base focus:outline-none ${inputTextColor} ${inputPlaceholder}`}
              autoFocus
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className={`ml-2 px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md transition-transform active:scale-95 shrink-0 cursor-pointer ${
                isCalido
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 shadow-orange-900/30'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-sky-900/50'
              }`}
            >
              <span>Buscar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick App Shortcuts Row */}
        <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
          {quickShortcuts.map((sc, i) => {
            const Icon = sc.icon;
            return (
              <button
                key={i}
                onClick={() => {
                  if (sc.action) sc.action();
                  else if (sc.url) onSearch(sc.url);
                }}
                className={`relative flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all cursor-pointer group hover:scale-105 ${
                  hasCustomWallpaper
                    ? 'bg-black/40 border-white/15 text-white hover:bg-black/60 shadow-lg'
                    : isCalido
                    ? 'bg-white/90 border-orange-200 text-orange-950 hover:bg-white shadow-xs'
                    : isClaro
                    ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-xs'
                    : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-800 shadow-md'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${sc.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold tracking-wide">{sc.title}</span>
                {typeof sc.badge === 'number' && sc.badge > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[9px] font-bold border-2 border-white shadow-sm">
                    {sc.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Minimal Trending Suggestions */}
        <div className="flex items-center justify-center gap-2 mt-5 px-1 flex-wrap text-xs">
          <span className={`flex items-center gap-1 text-[11px] font-semibold shrink-0 ${subtextColor}`}>
            <TrendingUp className={`w-3.5 h-3.5 ${isCalido ? 'text-orange-500' : 'text-sky-400'}`} /> Tendencias:
          </span>
          {trendingTopics.map((topic, i) => (
            <button
              key={i}
              onClick={() => onSearch(topic)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                hasCustomWallpaper
                  ? 'bg-black/40 hover:bg-black/60 text-white border-white/20'
                  : isCalido
                  ? 'bg-white hover:bg-orange-100 text-orange-950 border-orange-200 shadow-2xs hover:border-orange-300'
                  : isClaro
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200 shadow-2xs'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border-slate-800'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Chrome's Signature "Personalizar Chrome" (Personalizar SonkDash) Bottom-Right Button */}
      {onOpenCustomization && (
        <button
          onClick={onOpenCustomization}
          className={`fixed bottom-5 right-5 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-xl backdrop-blur-md font-semibold text-xs transition-all cursor-pointer hover:scale-105 active:scale-95 ${
            hasCustomWallpaper
              ? 'bg-black/60 border-white/25 text-white hover:bg-black/80'
              : isCalido
              ? 'bg-white/95 border-orange-300 text-orange-950 hover:bg-white shadow-orange-900/10'
              : 'bg-slate-900/90 border-slate-700 text-white hover:bg-slate-800'
          }`}
          title="Personaliza el fondo de pantalla y colores de SonkDash"
        >
          <PenLine className="w-3.5 h-3.5 text-orange-500" />
          <span>Personalizar SonkDash</span>
        </button>
      )}
    </div>
  );
};
