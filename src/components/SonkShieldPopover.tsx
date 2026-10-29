import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Zap, EyeOff, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { AdBlockConfig } from '../types/browser';

interface SonkShieldPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdBlockConfig;
  onToggleMaster: () => void;
  onToggleTrackers: () => void;
  onTogglePopups: () => void;
  currentHostname: string;
  isCurrentWhitelisted: boolean;
  onToggleWhitelist: () => void;
  currentPageBlocked: number;
  totalBlocked: number;
  totalBytesSavedMb: number;
}

export const SonkShieldPopover: React.FC<SonkShieldPopoverProps> = ({
  isOpen,
  onClose,
  config,
  onToggleMaster,
  onToggleTrackers,
  onTogglePopups,
  currentHostname,
  isCurrentWhitelisted,
  onToggleWhitelist,
  currentPageBlocked,
  totalBlocked,
  totalBytesSavedMb,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:justify-end sm:pr-24">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Popover Window */}
      <div className="relative z-10 w-80 rounded-2xl bg-slate-900 border border-sky-500/30 shadow-2xl shadow-sky-950/60 p-4 text-slate-100 overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header Title with Mascot mini */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${config.enabled ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'}`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                SonkShield AdBlocker
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold uppercase">Turbo</span>
              </h3>
              <p className="text-[11px] text-slate-400">Protección y aceleración de carga</p>
            </div>
          </div>

          {/* Master Toggle */}
          <button
            onClick={onToggleMaster}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              config.enabled ? 'bg-sky-500' : 'bg-slate-700'
            }`}
            title="Activar/Desactivar SonkShield"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                config.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Current Site Status */}
        <div className="py-3 border-b border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 truncate max-w-[170px]" title={currentHostname}>
              Sitio actual: <strong className="text-slate-200">{currentHostname || 'Nueva Pestaña'}</strong>
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                config.enabled && !isCurrentWhitelisted
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {config.enabled && !isCurrentWhitelisted ? 'Protegido' : 'Pausado'}
            </span>
          </div>

          <button
            onClick={onToggleWhitelist}
            className="w-full py-1.5 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] font-medium text-slate-300 flex items-center justify-center gap-1.5 border border-slate-700/60 transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-sky-400" />
            {isCurrentWhitelisted ? 'Habilitar SonkShield en este dominio' : 'Pausar protección en este dominio'}
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 my-3">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-sky-400" /> En esta página
            </div>
            <div className="text-lg font-bold text-sky-300 mt-0.5">
              {currentPageBlocked} <span className="text-[10px] font-normal text-slate-400">bloqueados</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Total histórico
            </div>
            <div className="text-lg font-bold text-emerald-300 mt-0.5">
              {totalBlocked} <span className="text-[10px] font-normal text-slate-400">anuncios</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Aceleración
            </div>
            <div className="text-lg font-bold text-amber-300 mt-0.5">
              +42% <span className="text-[10px] font-normal text-slate-400">velocidad</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Layers className="w-3 h-3 text-indigo-400" /> Datos ahorrados
            </div>
            <div className="text-lg font-bold text-indigo-300 mt-0.5">
              {totalBytesSavedMb.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">MB</span>
            </div>
          </div>
        </div>

        {/* Protection Filters */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
          <label className="flex items-center justify-between cursor-pointer py-1 hover:text-white">
            <span className="flex items-center gap-1.5 text-slate-300">
              <EyeOff className="w-3.5 h-3.5 text-slate-400" />
              Bloquear rastreadores y telemetría
            </span>
            <input
              type="checkbox"
              checked={config.blockTrackers}
              onChange={onToggleTrackers}
              className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-1 hover:text-white">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              Prevenir popups y publicidad intrusiva
            </span>
            <input
              type="checkbox"
              checked={config.blockPopups}
              onChange={onTogglePopups}
              className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
            />
          </label>
        </div>

        {/* Footer tip */}
        <div className="mt-3 pt-2 text-center text-[10px] text-slate-500 border-t border-slate-800">
          SonkShield Turbo Engine • Navegación sin distracciones
        </div>
      </div>
    </div>
  );
};
