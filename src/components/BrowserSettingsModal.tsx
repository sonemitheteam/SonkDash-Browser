import React, { useState } from 'react';
import { X, Shield, Mail, Sparkles, Trash2, Globe, Cpu, CheckCircle2, Lock, Palette, Sun, Moon, Laptop, Flame, Check } from 'lucide-react';
import { AdBlockConfig, ThemeMode } from '../types/browser';

interface BrowserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  adBlockConfig: AdBlockConfig;
  onUpdateAdBlockConfig: (newConfig: AdBlockConfig) => void;
  onOpenDefaultModal: () => void;
  isDefault: boolean;
  onClearHistory: () => void;
  userEmail: string;
  themeMode: ThemeMode;
  onSelectTheme: (t: ThemeMode) => void;
}

export const BrowserSettingsModal: React.FC<BrowserSettingsModalProps> = ({
  isOpen,
  onClose,
  adBlockConfig,
  onUpdateAdBlockConfig,
  onOpenDefaultModal,
  isDefault,
  onClearHistory,
  userEmail,
  themeMode,
  onSelectTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'shields' | 'gmail' | 'default' | 'privacy'>('theme');
  const [historyCleared, setHistoryCleared] = useState(false);

  if (!isOpen) return null;

  const handleClearHistory = () => {
    onClearHistory();
    setHistoryCleared(true);
    setTimeout(() => setHistoryCleared(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <img src="/assets/aistudio/sonkdash_logo_clean.png" alt="SonkDash" className="w-8 h-8 object-contain" />
            <div>
              <h2 className="text-base font-bold text-white">Ajustes de SonkDash</h2>
              <p className="text-xs text-slate-400">Preferencias, privacidad y sistema</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Setting Tabs */}
        <div className="flex border-b border-slate-800 gap-1 pt-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('theme')}
            className={`pb-2 px-3 font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'theme' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Tema Visual
          </button>

          <button
            onClick={() => setActiveTab('shields')}
            className={`pb-2 px-3 font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'shields' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            SonkShield (AdBlock)
          </button>

          <button
            onClick={() => setActiveTab('gmail')}
            className={`pb-2 px-3 font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'gmail' ? 'border-red-500 text-red-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Cuenta Gmail
          </button>

          <button
            onClick={() => setActiveTab('default')}
            className={`pb-2 px-3 font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'default' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Predeterminado
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2 px-3 font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'privacy' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Privacidad y Datos
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-4 min-h-[220px]">
          {activeTab === 'theme' && (
            <div className="space-y-3 text-xs">
              <div className="text-slate-400 text-xs mb-2">
                Selecciona la apariencia general de SonkDash. El modo <strong>Cálido</strong> es el tema predeterminado diseñado para cuidar tu vista con un tono naranja suave blanqueado.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. Calido */}
                <div
                  onClick={() => onSelectTheme('calido')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    themeMode === 'calido'
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-950/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-400">
                      <Flame className="w-4 h-4" /> Tema Cálido
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-300 font-bold uppercase">
                      Predeterminado
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Naranja blanqueado y tonos crema suaves. Reduce la fatiga visual.
                  </p>
                </div>

                {/* 2. Claro */}
                <div
                  onClick={() => onSelectTheme('claro')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    themeMode === 'claro'
                      ? 'bg-sky-500/20 border-sky-500 text-white shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold flex items-center gap-1.5 text-sky-300">
                      <Sun className="w-4 h-4 text-amber-300" /> Modo Claro
                    </span>
                    {themeMode === 'claro' && <Check className="w-4 h-4 text-sky-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Fondo blanco brillante clásico con alto contraste para el día.
                  </p>
                </div>

                {/* 3. Oscuro */}
                <div
                  onClick={() => onSelectTheme('oscuro')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    themeMode === 'oscuro'
                      ? 'bg-sky-500/20 border-sky-500 text-white shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold flex items-center gap-1.5 text-indigo-400">
                      <Moon className="w-4 h-4" /> Modo Oscuro
                    </span>
                    {themeMode === 'oscuro' && <Check className="w-4 h-4 text-sky-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Fondo azul marino oscuro y grafito ideal para la noche.
                  </p>
                </div>

                {/* 4. Por sistema */}
                <div
                  onClick={() => onSelectTheme('sistema')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    themeMode === 'sistema'
                      ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                      <Laptop className="w-4 h-4" /> Por Sistema
                    </span>
                    {themeMode === 'sistema' && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Detecta automáticamente si tu Windows, Mac o móvil está en modo oscuro o claro.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shields' && (
            <div className="space-y-3.5 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Activar SonkShield Global</div>
                  <div className="text-slate-400 text-[11px]">Bloquea anuncios publicitarios en todos los sitios</div>
                </div>
                <input
                  type="checkbox"
                  checked={adBlockConfig.enabled}
                  onChange={(e) => onUpdateAdBlockConfig({ ...adBlockConfig, enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-500 bg-slate-800 border-slate-700"
                />
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Bloqueo de Rastreadores (Anti-Tracking)</div>
                  <div className="text-slate-400 text-[11px]">Impide que redes analíticas sigan tus hábitos de navegación</div>
                </div>
                <input
                  type="checkbox"
                  checked={adBlockConfig.blockTrackers}
                  onChange={(e) => onUpdateAdBlockConfig({ ...adBlockConfig, blockTrackers: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-500 bg-slate-800 border-slate-700"
                />
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Supresión de Ventanas Emergentes (Popups)</div>
                  <div className="text-slate-400 text-[11px]">Neutraliza overlays molestos y redirecciones involuntarias</div>
                </div>
                <input
                  type="checkbox"
                  checked={adBlockConfig.blockPopups}
                  onChange={(e) => onUpdateAdBlockConfig({ ...adBlockConfig, blockPopups: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-500 bg-slate-800 border-slate-700"
                />
              </div>
            </div>
          )}

          {activeTab === 'gmail' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
                    G
                  </div>
                  <div>
                    <div className="font-bold text-white">{userEmail}</div>
                    <div className="text-emerald-400 text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Conectado con SonkDash
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px] mt-3">
                  Esta cuenta se sincroniza con el dock rápido para mostrar notificaciones de correos nuevos y redactar mensajes instantáneos.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'default' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-amber-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Navegador Predeterminado del Sistema</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${isDefault ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {isDefault ? 'CONFIGURADO' : 'PENDIENTE'}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
                  Configura SonkDash para que sea el navegador que abra enlaces desde correos, documentos, chats y aplicaciones de escritorio.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenDefaultModal();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Abrir Asistente de Navegador Predeterminado</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Borrar historial y caché de navegación</div>
                  <div className="text-slate-400 text-[11px]">Elimina registros locales de páginas visitadas</div>
                </div>
                <button
                  onClick={handleClearHistory}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{historyCleared ? '¡Borrado!' : 'Borrar ahora'}</span>
                </button>
              </div>

              <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                🔒 SonkDash no recopila telemetría de usuario ni almacena búsquedas privadas fuera de tu sesión local.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
