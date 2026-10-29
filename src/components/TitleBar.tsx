import React from 'react';
import { Plus, X, Globe, Sparkles } from 'lucide-react';
import { Tab } from '../types/browser';

interface TitleBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string, e: React.MouseEvent) => void;
  onNewTab: () => void;
  onOpenDefaultModal: () => void;
  isDefault: boolean;
  effectiveTheme: 'calido' | 'claro' | 'oscuro';
}

export const TitleBar: React.FC<TitleBarProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onOpenDefaultModal,
  isDefault,
  effectiveTheme,
}) => {
  const isCalido = effectiveTheme === 'calido';
  const isClaro = effectiveTheme === 'claro';

  const barBg = isCalido
    ? 'bg-amber-100/90 text-amber-950 border-orange-200'
    : isClaro
    ? 'bg-slate-200/90 text-slate-800 border-slate-300'
    : 'bg-slate-950 text-slate-200 border-slate-800/80';

  return (
    <div className={`select-none flex items-center border-b px-2 pt-1.5 h-11 gap-1 transition-colors ${barBg}`}>
      {/* Brand Icon Mini */}
      <div className="flex items-center gap-1.5 pr-2 pl-1 shrink-0">
        <div className="relative group cursor-pointer" onClick={onOpenDefaultModal} title="SonkDash Speed Engine">
          <img
            src="/assets/aistudio/sonkdash_logo_clean.png"
            alt="SonkDash Logo"
            className="w-7 h-7 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;

          let tabClasses = '';
          if (isCalido) {
            tabClasses = isActive
              ? 'bg-orange-50 text-orange-950 border-orange-300 shadow-xs relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-orange-500 font-semibold'
              : 'bg-orange-200/50 text-orange-800/80 border-transparent hover:bg-orange-200 hover:text-orange-950';
          } else if (isClaro) {
            tabClasses = isActive
              ? 'bg-white text-slate-900 border-slate-300 shadow-xs relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-500 font-semibold'
              : 'bg-slate-300/50 text-slate-600 border-transparent hover:bg-slate-300 hover:text-slate-900';
          } else {
            tabClasses = isActive
              ? 'bg-slate-900 text-sky-300 border-sky-500/40 shadow-sm relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-400 font-semibold'
              : 'bg-slate-950/60 text-slate-400 border-transparent hover:bg-slate-900/60 hover:text-slate-200';
          }

          return (
            <div
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`group flex items-center gap-2 max-w-[210px] min-w-[120px] h-8 px-3 rounded-t-lg text-xs font-medium cursor-pointer transition-all border-t border-x ${tabClasses}`}
            >
              {tab.isLoading ? (
                <div className={`w-3.5 h-3.5 border-2 ${isCalido ? 'border-orange-500' : 'border-sky-400'} border-t-transparent rounded-full animate-spin shrink-0`} />
              ) : tab.favicon ? (
                <img src={tab.favicon} alt="" className="w-3.5 h-3.5 rounded-sm shrink-0 object-contain" />
              ) : (
                <Globe className={`w-3.5 h-3.5 shrink-0 ${isActive ? (isCalido ? 'text-orange-600' : 'text-sky-500') : 'opacity-60'}`} />
              )}

              <span className="truncate flex-1 text-left">{tab.title || 'Nueva pestaña'}</span>

              {tabs.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => onCloseTab(tab.id, e)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-black/10 p-0.5 rounded transition-opacity"
                  title="Cerrar pestaña"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* New Tab Button */}
        <button
          type="button"
          onClick={onNewTab}
          className={`p-1.5 rounded-md transition-colors ${
            isCalido
              ? 'hover:bg-orange-200/80 text-orange-900'
              : isClaro
              ? 'hover:bg-slate-300 text-slate-700'
              : 'hover:bg-slate-800 text-slate-400 hover:text-sky-300'
          }`}
          title="Nueva pestaña"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top right: Default browser button */}
      <div className="flex items-center gap-2 shrink-0 pr-1">
        {!isDefault && (
          <button
            onClick={onOpenDefaultModal}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
              isCalido
                ? 'text-orange-950 bg-orange-300/60 hover:bg-orange-300 border border-orange-400'
                : 'text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Navegador Predeterminado</span>
          </button>
        )}

        {/* Decorative buttons */}
        <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-current/20">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 cursor-pointer" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 cursor-pointer" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
