import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Shield,
  ShieldAlert,
  Star,
  Mail,
  MoreVertical,
  Lock,
  Search,
  Sparkles,
  Download,
  History,
  BookmarkCheck,
  Settings,
  HelpCircle,
  ExternalLink,
  Sun,
  Moon,
  Laptop,
  Flame,
  Check,
} from 'lucide-react';
import { AdBlockConfig, ThemeMode, ChromeProfile } from '../types/browser';

interface NavigationBarProps {
  currentUrl: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isLoading: boolean;
  onNavigate: (input: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onGoHome: () => void;
  adBlockConfig: AdBlockConfig;
  onToggleSonkShieldPopover: () => void;
  blockedCountCurrentPage: number;
  onToggleGmailDrawer: () => void;
  gmailUnreadCount: number;
  onOpenDefaultModal: () => void;
  isDefault: boolean;
  onOpenSettingsModal: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  themeMode: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  effectiveTheme: 'calido' | 'claro' | 'oscuro';
  profile?: ChromeProfile;
  onOpenAccountModal?: () => void;
  onOpenCustomization?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  currentUrl,
  canGoBack,
  canGoForward,
  isLoading,
  onNavigate,
  onGoBack,
  onGoForward,
  onReload,
  onGoHome,
  adBlockConfig,
  onToggleSonkShieldPopover,
  blockedCountCurrentPage,
  onToggleGmailDrawer,
  gmailUnreadCount,
  onOpenDefaultModal,
  isDefault,
  onOpenSettingsModal,
  isBookmarked,
  onToggleBookmark,
  themeMode,
  onSelectTheme,
  effectiveTheme,
  profile,
  onOpenAccountModal,
  onOpenCustomization,
}) => {
  const [inputValue, setInputValue] = useState(currentUrl);
  const [showMenu, setShowMenu] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isCalido = effectiveTheme === 'calido';
  const isClaro = effectiveTheme === 'claro';

  useEffect(() => {
    setInputValue(currentUrl === 'about:blank' || currentUrl === 'sonk:home' ? '' : currentUrl);
  }, [currentUrl]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onNavigate(inputValue.trim());
    }
  };

  const isHome = currentUrl === 'sonk:home' || currentUrl === '' || currentUrl === 'about:blank';

  const navBarBg = isCalido
    ? 'bg-amber-50 text-amber-950 border-orange-200'
    : isClaro
    ? 'bg-slate-100 text-slate-800 border-slate-200'
    : 'bg-slate-900 text-slate-100 border-slate-800';

  const omniboxBg = isCalido
    ? isFocused
      ? 'bg-white border-orange-500 shadow-md shadow-orange-500/20 text-orange-950'
      : 'bg-white/90 border-orange-300 text-orange-950'
    : isClaro
    ? isFocused
      ? 'bg-white border-sky-500 shadow-sm text-slate-900'
      : 'bg-white border-slate-300 text-slate-800'
    : isFocused
    ? 'bg-slate-950 border-sky-500 shadow-md shadow-sky-500/20 text-white'
    : 'bg-slate-950/70 border-slate-800 text-white';

  return (
    <div className={`border-b px-3 py-1.5 flex items-center gap-2 select-none relative z-30 transition-colors ${navBarBg}`}>
      {/* Navigation Controls */}
      <div className="flex items-center gap-1 shrink-0 opacity-80">
        <button
          onClick={onGoBack}
          disabled={!canGoBack}
          className="p-1.5 rounded-lg hover:bg-black/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Atrás"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          onClick={onGoForward}
          disabled={!canGoForward}
          className="p-1.5 rounded-lg hover:bg-black/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Adelante"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onReload}
          className="p-1.5 rounded-lg hover:bg-black/10 transition-colors"
          title="Recargar"
        >
          <RotateCw className={`w-4 h-4 ${isLoading ? (isCalido ? 'animate-spin text-orange-600' : 'animate-spin text-sky-400') : ''}`} />
        </button>

        <button
          onClick={onGoHome}
          className="p-1.5 rounded-lg hover:bg-black/10 transition-colors"
          title="Inicio"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      {/* Omnibox (Address & Search Bar) */}
      <form onSubmit={handleSubmit} className="flex-1 relative flex items-center">
        <div
          className={`w-full h-9 rounded-xl flex items-center px-3 gap-2 transition-all border ${omniboxBg}`}
        >
          {/* Left Icon (SSL Lock or Search) */}
          <div className="flex items-center text-slate-400 shrink-0">
            {isHome ? (
              <Search className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span className="hidden md:inline font-mono text-[10px]">Seguro</span>
              </div>
            )}
          </div>

          {/* Text Input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Escribe una URL o busca en la web a velocidad supersónica..."
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />

          {/* Right Tools in Omnibox */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Bookmark star */}
            {!isHome && (
              <button
                type="button"
                onClick={onToggleBookmark}
                className={`p-1 rounded-md transition-colors ${
                  isBookmarked
                    ? 'text-amber-400 hover:text-amber-300'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title={isBookmarked ? 'Eliminar de marcadores' : 'Añadir a marcadores'}
              >
                <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>
            )}

            {/* Quick Engine Indicator */}
            <span className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-800/60 text-[10px] text-sky-300 font-mono">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              Google Grounding
            </span>
          </div>
        </div>
      </form>

      {/* Action Extensions Bar */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* SonkShield AdBlocker Button */}
        <button
          onClick={onToggleSonkShieldPopover}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            adBlockConfig.enabled
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25 shadow-xs shadow-emerald-500/20'
              : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:bg-slate-800 hover:text-slate-200'
          }`}
          title="SonkShield AdBlocker (Opcional)"
        >
          {adBlockConfig.enabled ? (
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span className="hidden sm:inline">SonkShield</span>
          {adBlockConfig.enabled && (
            <span className="px-1.5 py-0.2 bg-emerald-500/30 rounded text-[10px] text-emerald-200 font-mono font-bold">
              {blockedCountCurrentPage}
            </span>
          )}
        </button>

        {/* Gmail Quick Connector */}
        <button
          onClick={onToggleGmailDrawer}
          className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-600/15 text-red-300 border border-red-500/30 hover:bg-red-600/25 transition-all text-xs font-semibold"
          title="Gmail para SonkDash"
        >
          <Mail className="w-3.5 h-3.5 text-red-400" />
          <span className="hidden md:inline">Gmail</span>
          {gmailUnreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-slate-900 shadow-sm animate-pulse">
              {gmailUnreadCount}
            </span>
          )}
        </button>

        {/* Default Browser Button */}
        <button
          onClick={onOpenDefaultModal}
          className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            isDefault
              ? 'bg-slate-800/80 text-emerald-400 border-slate-700/60'
              : 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
          }`}
          title="Configurar como navegador predeterminado del sistema"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden xl:inline">{isDefault ? 'Predeterminado ✓' : 'Hacer Predeterminado'}</span>
        </button>

        {/* Google Chrome-Style Profile Avatar Button */}
        {onOpenAccountModal && (
          <button
            onClick={onOpenAccountModal}
            className="relative flex items-center justify-center w-8 h-8 rounded-full border border-orange-500/40 bg-orange-500/15 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
            title={`Perfil de Google: ${profile?.email || 'elsonemi8890@gmail.com'}`}
          >
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
            ) : profile?.avatarType === 'sonic' ? (
              <img src="/assets/aistudio/sonkdash_logo_clean.png" alt="" className="w-5 h-5 object-contain" />
            ) : (
              <span className="font-bold text-xs text-orange-600 dark:text-orange-400">
                {(profile?.name || 'E').charAt(0).toUpperCase()}
              </span>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </button>
        )}

        {/* Main 3-dots Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Personaliza y controla SonkDash"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 text-xs text-slate-200 z-50">
              <div className="px-3 py-2 border-b border-slate-800 flex items-center gap-2">
                <img src="/assets/aistudio/sonkdash_logo_clean.png" alt="" className="w-6 h-6 object-contain" />
                <div>
                  <div className="font-bold text-white">SonkDash Browser</div>
                  <div className="text-[10px] text-slate-400">Versión 1.0 Supersónica</div>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onGoHome();
                  }}
                  className="w-full px-3 py-1.5 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-left"
                >
                  <Home className="w-3.5 h-3.5 text-sky-400" />
                  <span>Página de inicio rápida</span>
                </button>

                {onOpenCustomization && (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onOpenCustomization();
                    }}
                    className="w-full px-3 py-1.5 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-left text-orange-400 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    <span>Personalizar fondo y tema</span>
                  </button>
                )}

                {onOpenAccountModal && (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onOpenAccountModal();
                    }}
                    className="w-full px-3 py-1.5 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-left"
                  >
                    <Mail className="w-3.5 h-3.5 text-red-400" />
                    <span>Cuenta de Google ({profile?.email || 'elsonemi8890@gmail.com'})</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onToggleSonkShieldPopover();
                  }}
                  className="w-full px-3 py-1.5 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Configurar SonkShield (AdBlock)</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onToggleGmailDrawer();
                  }}
                  className="w-full px-3 py-1.5 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-left"
                >
                  <Mail className="w-3.5 h-3.5 text-red-400" />
                  <span>Abrir panel de Gmail ({gmailUnreadCount} correos)</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenDefaultModal();
                  }}
                  className="w-full px-3 py-1.5 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-left text-amber-300 font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Establecer como Predeterminado</span>
                </button>
              </div>

              {/* Theme Selector Section */}
              <div className="py-2 px-2 border-t border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1.5 flex items-center justify-between">
                  <span>Tema visual</span>
                  <span className="text-[9px] text-amber-400 font-normal">Cálido por defecto</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <button
                    onClick={() => onSelectTheme('calido')}
                    className={`px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                      themeMode === 'calido'
                        ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/40'
                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    title="Tema Cálido (Naranja blanqueado) - Predeterminado"
                  >
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>Cálido ★</span>
                    </span>
                    {themeMode === 'calido' && <Check className="w-3 h-3 text-amber-400" />}
                  </button>

                  <button
                    onClick={() => onSelectTheme('claro')}
                    className={`px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                      themeMode === 'claro'
                        ? 'bg-sky-500/25 text-sky-300 font-bold border border-sky-500/40'
                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    title="Modo Claro"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3 h-3 text-amber-300" />
                      <span>Claro</span>
                    </span>
                    {themeMode === 'claro' && <Check className="w-3 h-3 text-sky-400" />}
                  </button>

                  <button
                    onClick={() => onSelectTheme('oscuro')}
                    className={`px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                      themeMode === 'oscuro'
                        ? 'bg-sky-500/25 text-sky-300 font-bold border border-sky-500/40'
                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    title="Modo Oscuro"
                  >
                    <span className="flex items-center gap-1.5">
                      <Moon className="w-3 h-3 text-indigo-400" />
                      <span>Oscuro</span>
                    </span>
                    {themeMode === 'oscuro' && <Check className="w-3 h-3 text-sky-400" />}
                  </button>

                  <button
                    onClick={() => onSelectTheme('sistema')}
                    className={`px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                      themeMode === 'sistema'
                        ? 'bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-500/40'
                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                    title="Modo Sistema (Detecta si el sistema usa claro u oscuro automáticamente)"
                  >
                    <span className="flex items-center gap-1.5">
                      <Laptop className="w-3 h-3 text-emerald-400" />
                      <span>Sistema</span>
                    </span>
                    {themeMode === 'sistema' && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenSettingsModal();
                  }}
                  className="w-full px-3 py-1.5 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-left text-slate-300"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ajustes y Privacidad</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
