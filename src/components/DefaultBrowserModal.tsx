import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Settings,
  Globe,
  Sparkles,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  ExternalLink,
  Laptop,
} from 'lucide-react';

interface DefaultBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstalled: boolean;
  isInstallable: boolean;
  onInstallPWA: () => Promise<boolean>;
  onRegisterProtocol: () => Promise<{ success: boolean; message: string }>;
  onAddSearchProvider: () => Promise<{ success: boolean; message: string }>;
  onDownloadShortcut: () => void;
  isDefault: boolean;
  onSetDefaultSuccess: () => void;
}

export const DefaultBrowserModal: React.FC<DefaultBrowserModalProps> = ({
  isOpen,
  onClose,
  isInstalled,
  isInstallable,
  onInstallPWA,
  onRegisterProtocol,
  onAddSearchProvider,
  onDownloadShortcut,
  isDefault,
  onSetDefaultSuccess,
}) => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedChromePath, setCopiedChromePath] = useState(false);

  if (!isOpen) return null;

  const searchUrlTemplate = `${window.location.origin}/?q=%s`;

  // 1. Open Windows Native Settings directly using ms-settings protocol
  const handleOpenWindowsSettings = () => {
    try {
      // ms-settings:defaultapps opens Windows Settings directly on Default Apps
      window.location.href = 'ms-settings:defaultapps';
      setStatusMessage('¡Abriendo Configuración de Windows en tu pantalla! Selecciona SonkDash como navegador.');
      onSetDefaultSuccess();
    } catch (err) {
      // Fallback: download batch launcher
      window.location.href = '/api/download-reg';
      setStatusMessage('Descargando archivo para abrir Configuración de Windows automáticamente.');
    }
  };

  // 2. Add as Search Provider in Chrome / Edge
  const handleAddSearchEngine = async () => {
    const res = await onAddSearchProvider();
    setStatusMessage(res.message);
    if (res.success) {
      onSetDefaultSuccess();
    }
  };

  // 3. Install PWA Desktop application
  const handleInstallApp = async () => {
    const success = await onInstallPWA();
    if (success) {
      setStatusMessage('¡SonkDash se instaló como aplicación de escritorio! Tu sistema te permitirá seleccionarlo como predeterminado.');
      onSetDefaultSuccess();
    } else {
      // Fallback
      handleOpenWindowsSettings();
    }
  };

  // 4. Download batch script that executes ms-settings:defaultapps
  const handleDownloadBatch = () => {
    window.location.href = '/api/download-reg';
    setStatusMessage('¡Descargado! Haz clic en el archivo descargado para abrir la Configuración de Windows al instante.');
    onSetDefaultSuccess();
  };

  const handleCopySearchUrl = async () => {
    try {
      await navigator.clipboard.writeText(searchUrlTemplate);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
      onSetDefaultSuccess();
    } catch {
      setStatusMessage(`Copia esta URL: ${searchUrlTemplate}`);
    }
  };

  const handleCopyChromeSettings = async () => {
    try {
      await navigator.clipboard.writeText('chrome://settings/defaultBrowser');
      setCopiedChromePath(true);
      setTimeout(() => setCopiedChromePath(false), 2500);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-slate-900 border border-sky-500/40 shadow-2xl p-5 sm:p-6 text-slate-100 overflow-hidden my-auto max-h-[90vh] overflow-y-auto">
        {/* Glow Header */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/sonkdash_logo_clean.png"
              alt="SonkDash Mascot"
              className="w-12 h-12 object-contain drop-shadow-[0_4px_16px_rgba(2,132,199,0.5)]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">Configurar Navegador Predeterminado</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                  {isDefault ? 'Configurado ✓' : 'Directo'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Abre la configuración del sistema para que SonkDash abra todos tus enlaces.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Message Notification */}
        {statusMessage && (
          <div className="my-3 p-3 rounded-xl bg-sky-950 border border-sky-500/50 text-sky-200 text-xs flex items-center gap-2.5 shadow-lg animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-medium">{statusMessage}</span>
          </div>
        )}

        {/* Direct Action Buttons */}
        <div className="space-y-2.5 my-4">
          {/* Action 1: Directly Launch Windows Settings */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-sky-500/30 hover:border-sky-500/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-0.5">
                <Settings className="w-4 h-4 text-sky-400" />
                <span>1. Abrir Configuración de Windows Ahora</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Abre directamente la ventana de Aplicaciones Predeterminadas en tu PC.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleOpenWindowsSettings}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-900/40 transition-transform active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Abrir Configuración</span>
              </button>
              <button
                onClick={handleDownloadBatch}
                className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                title="Descargar script .BAT que abre la configuración"
              >
                <Download className="w-3.5 h-3.5" />
                <span>.BAT</span>
              </button>
            </div>
          </div>

          {/* Action 2: Add Search Engine to Chrome / Edge / Firefox */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 hover:border-amber-500/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-0.5">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>2. Buscador Predeterminado en Chrome / Edge</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Registra a SonkDash en el menú de búsqueda oficial de tu navegador.
              </p>
            </div>
            <button
              onClick={handleAddSearchEngine}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-900/40 transition-transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Agregar a Chrome</span>
            </button>
          </div>

          {/* Action 3: Install PWA Desktop Application */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-0.5">
                <Laptop className="w-4 h-4 text-emerald-400" />
                <span>3. Instalar como App de Escritorio (PWA)</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Ancla SonkDash a tu barra de tareas como navegador del sistema.
              </p>
            </div>
            <button
              onClick={handleInstallApp}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/40 transition-transform active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isInstalled ? 'App Instalada ✓' : 'Instalar en PC'}</span>
            </button>
          </div>
        </div>

        {/* Copyable Search Engine URL Bar */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-3 text-xs">
          <div className="flex items-center justify-between mb-1.5 text-slate-400 font-semibold">
            <span>Plantilla de URL para Chrome / Edge:</span>
            <button
              onClick={handleCopyChromeSettings}
              className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
            >
              {copiedChromePath ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedChromePath ? '¡Ruta copiada!' : 'Copiar chrome://settings/defaultBrowser'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
            <code className="text-[11px] font-mono text-sky-300 flex-1 truncate px-1">
              {searchUrlTemplate}
            </code>
            <button
              onClick={handleCopySearchUrl}
              className="px-3 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
            >
              {copiedUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedUrl ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
          <button
            onClick={onDownloadShortcut}
            className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Acceso Directo (.URL)</span>
          </button>

          <button
            onClick={() => {
              onSetDefaultSuccess();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirmar SonkDash Predeterminado</span>
          </button>
        </div>
      </div>
    </div>
  );
};
