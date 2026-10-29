import React, { useState, useEffect } from 'react';
import { BrowsePageData } from '../types/browser';
import {
  Shield,
  ShieldAlert,
  ExternalLink,
  RotateCw,
  Lock,
  BookOpen,
  Monitor,
  AlertTriangle,
} from 'lucide-react';

interface WebPageViewProps {
  data: BrowsePageData;
  onReloadWithAdBlock: (enable: boolean) => void;
  onNavigateInside: (url: string) => void;
  effectiveTheme?: 'calido' | 'claro' | 'oscuro';
}

export const WebPageView: React.FC<WebPageViewProps> = ({
  data,
  onReloadWithAdBlock,
  onNavigateInside,
  effectiveTheme = 'calido',
}) => {
  const [viewMode, setViewMode] = useState<'live' | 'reader'>('live');
  const [iframeError, setIframeError] = useState(false);
  const [isLoadingFrame, setIsLoadingFrame] = useState(true);

  const isCalido = effectiveTheme === 'calido';
  const isClaro = effectiveTheme === 'claro';

  // Listen for navigation postMessages from the proxied iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'SONK_NAVIGATE' && e.data.url) {
        onNavigateInside(e.data.url);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onNavigateInside]);

  // Construct iframe source using our live proxy so CORS/X-Frame-Options headers are bypassed
  const iframeSrc = data.proxyUrl || `/api/proxy?url=${encodeURIComponent(data.url)}&adblock=${data.sonkShieldActive}`;

  // Theme styling
  const barBg = isCalido
    ? 'bg-[#fff2e2] border-orange-200/90 text-orange-950'
    : isClaro
    ? 'bg-slate-100 border-slate-200 text-slate-800'
    : 'bg-slate-900 border-slate-800 text-slate-100';

  const hostPillBg = isCalido
    ? 'bg-white border-orange-200 text-orange-950'
    : isClaro
    ? 'bg-white border-slate-200 text-slate-800'
    : 'bg-slate-950 border-slate-800 text-slate-200';

  const actionBtnBg = isCalido
    ? 'bg-orange-100/80 hover:bg-orange-200 border-orange-200 text-orange-900'
    : isClaro
    ? 'bg-slate-200/80 hover:bg-slate-300 border-slate-300 text-slate-800'
    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white';

  const primaryBtnBg = isCalido
    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs'
    : isClaro
    ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
    : 'bg-sky-600/30 hover:bg-sky-600/40 text-sky-300 border border-sky-500/30';

  return (
    <div className={`w-full h-full flex flex-col overflow-hidden transition-colors ${
      isCalido ? 'bg-[#fffaf3] text-orange-950' : isClaro ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Top Browser Tab Status & SonkShield Bar */}
      <div className={`border-b px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0 select-none ${barBg}`}>
        {/* Left: Domain & Security info */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border text-[11px] font-mono shadow-2xs ${hostPillBg}`}>
            <Lock className="w-3 h-3 text-emerald-500" />
            <span className="font-bold">{data.hostname}</span>
          </div>

          {/* SonkShield AdBlock pill */}
          <button
            onClick={() => onReloadWithAdBlock(!data.sonkShieldActive)}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold border transition-all ${
              data.sonkShieldActive
                ? isCalido
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                : isCalido
                  ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
            }`}
            title="Alternar SonkShield para esta página"
          >
            {data.sonkShieldActive ? (
              <>
                <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>SonkShield: {data.adsBlocked} bloqueados</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>SonkShield Pausado</span>
              </>
            )}
          </button>

          <span className="text-[11px] opacity-75 hidden md:inline">
            Ahorro: <strong>{data.bytesSavedKb} KB</strong>
          </span>
        </div>

        {/* Right: View Toggles & Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode(viewMode === 'live' ? 'reader' : 'live')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border flex items-center gap-1.5 transition-colors ${
              viewMode === 'reader'
                ? isCalido
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-sky-500 text-white border-sky-500'
                : actionBtnBg
            }`}
          >
            {viewMode === 'reader' ? (
              <>
                <Monitor className="w-3 h-3" />
                <span>Vista Web Completa</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3 h-3" />
                <span>Modo Lectura</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsLoadingFrame(true);
              setIframeError(false);
              const frame = document.getElementById('sonk-live-frame') as HTMLIFrameElement;
              if (frame) frame.src = iframeSrc;
            }}
            className={`p-1.5 rounded-lg border transition-colors ${actionBtnBg}`}
            title="Recargar página"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors ${primaryBtnBg}`}
            title="Abrir en ventana externa"
          >
            <span>Abrir en ventana</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Content Area: Live Interactive Web Frame */}
      <div className="flex-1 w-full h-full relative bg-white overflow-hidden">
        {viewMode === 'live' && (
          <>
            {/* Loading indicator over frame */}
            {isLoadingFrame && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 ${
                isCalido ? 'bg-[#fffaf3] text-orange-950' : isClaro ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-300'
              }`}>
                <div className="relative mb-3">
                  <div className={`w-9 h-9 border-3 border-t-transparent rounded-full animate-spin ${
                    isCalido ? 'border-orange-500' : 'border-sky-500'
                  }`} />
                </div>
                <p className={`text-xs font-bold ${isCalido ? 'text-orange-600' : 'text-sky-500'}`}>
                  Cargando {data.hostname} en SonkDash...
                </p>
                <p className="text-[11px] opacity-75 mt-1">Filtrando anuncios y acelerando conexión</p>
              </div>
            )}

            {/* Live Interactive Iframe */}
            <iframe
              id="sonk-live-frame"
              src={iframeSrc}
              title={data.title || data.hostname}
              onLoad={() => setIsLoadingFrame(false)}
              onError={() => {
                setIsLoadingFrame(false);
                setIframeError(true);
              }}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              className="w-full h-full border-0 bg-white"
            />

            {iframeError && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 ${
                isCalido ? 'bg-[#fffaf3]/95 text-orange-950' : isClaro ? 'bg-slate-50/95 text-slate-900' : 'bg-slate-900/95 text-white'
              }`}>
                <AlertTriangle className="w-12 h-12 text-amber-500 mb-3" />
                <h3 className="text-base font-bold mb-1">
                  Protección de contenido en {data.hostname}
                </h3>
                <p className="text-xs opacity-80 max-w-md mb-4 leading-relaxed">
                  Este sitio web bloquea la incrustación mediante políticas CORS estrictas. Puedes abrir la página directamente sin restricciones:
                </p>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-lg ${
                    isCalido ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-900/20' : 'bg-sky-600 hover:bg-sky-500'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir {data.hostname} en pestaña nueva</span>
                </a>
              </div>
            )}
          </>
        )}

        {/* Reader Mode Alternative */}
        {viewMode === 'reader' && (
          <div className={`w-full h-full overflow-y-auto p-6 sm:p-10 flex justify-center ${
            isCalido ? 'bg-[#fffaf3] text-orange-950' : isClaro ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-200'
          }`}>
            <div className={`max-w-3xl w-full p-8 rounded-2xl shadow-xl leading-relaxed font-serif text-sm border ${
              isCalido ? 'bg-white border-orange-200 text-orange-950' : isClaro ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}>
              <div className="pb-4 mb-4 border-b border-orange-200/60 dark:border-slate-800 flex items-center justify-between font-sans">
                <div>
                  <span className={`text-[11px] font-mono font-bold uppercase ${isCalido ? 'text-orange-600' : 'text-sky-500'}`}>
                    {data.hostname}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold mt-1">{data.title}</h1>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                  Lectura Limpia
                </span>
              </div>

              <div
                className="max-w-none leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: data.html || `<p>Contenido disponible en <a href="${data.url}" target="_blank" style="color: #ea580c; font-weight: bold;">${data.url}</a>.</p>`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
