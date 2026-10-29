import React from 'react';
import { SearchResultData } from '../types/browser';
import { ExternalLink, ShieldCheck, Clock, Globe, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface SearchResultsViewProps {
  data: SearchResultData;
  onNavigateToUrl: (url: string) => void;
  adBlockEnabled: boolean;
  effectiveTheme?: 'calido' | 'claro' | 'oscuro';
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  data,
  onNavigateToUrl,
  adBlockEnabled,
  effectiveTheme = 'calido',
}) => {
  const isCalido = effectiveTheme === 'calido';
  const isClaro = effectiveTheme === 'claro';

  // Styling based on active theme
  const rootClasses = isCalido
    ? 'bg-[#fffaf3] text-orange-950'
    : isClaro
    ? 'bg-slate-50 text-slate-900'
    : 'bg-slate-950 text-slate-100';

  const headerBorder = isCalido
    ? 'border-orange-200/80 text-orange-900/70'
    : isClaro
    ? 'border-slate-200 text-slate-500'
    : 'border-slate-800 text-slate-400';

  const queryBadge = isCalido
    ? 'bg-white text-orange-950 border-orange-300/80 shadow-xs'
    : isClaro
    ? 'bg-white text-slate-900 border-slate-300 shadow-xs'
    : 'bg-slate-900 text-white border-slate-800';

  const aiBoxClasses = isCalido
    ? 'bg-gradient-to-b from-[#fff7ed] to-white border-orange-300/80 shadow-xl shadow-orange-900/5'
    : isClaro
    ? 'bg-gradient-to-b from-sky-50 to-white border-sky-200 shadow-xl shadow-slate-300/30'
    : 'bg-gradient-to-b from-slate-900 to-slate-900/80 border-sky-500/30 shadow-xl';

  const aiTextClasses = isCalido
    ? 'text-orange-950 font-normal leading-relaxed'
    : isClaro
    ? 'text-slate-800 font-normal leading-relaxed'
    : 'text-slate-200 font-normal leading-relaxed';

  const cardClasses = isCalido
    ? 'bg-white border-orange-200/90 hover:border-orange-400 text-orange-950 shadow-xs hover:shadow-md'
    : isClaro
    ? 'bg-white border-slate-200 hover:border-sky-400 text-slate-900 shadow-xs hover:shadow-md'
    : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700 text-slate-100';

  const cardLinkClasses = isCalido
    ? 'text-orange-600 hover:text-orange-700'
    : isClaro
    ? 'text-sky-600 hover:text-sky-700'
    : 'text-sky-400 hover:text-sky-300';

  const cardDomainClasses = isCalido
    ? 'text-orange-900/70'
    : isClaro
    ? 'text-slate-500'
    : 'text-slate-400';

  const chipClasses = isCalido
    ? 'bg-orange-100/80 hover:bg-orange-200/80 border-orange-200/90 text-orange-900'
    : isClaro
    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
    : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white';

  const sidebarBoxClasses = isCalido
    ? 'bg-white border-orange-200/80 text-orange-950 shadow-xs'
    : isClaro
    ? 'bg-white border-slate-200 text-slate-900 shadow-xs'
    : 'bg-slate-900/60 border-slate-800/80 text-slate-100';

  // Check if query is related to Reddit or other key site to offer direct navigation
  const isRedditQuery = /reddit|redit/i.test(data.query);

  return (
    <div className={`min-h-full p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto overflow-y-auto transition-colors ${rootClasses}`}>
      {/* Search Header Info */}
      <div className={`flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b text-xs ${headerBorder}`}>
        <div className="flex items-center gap-2">
          <span>Resultados para:</span>
          <span className={`font-bold text-sm px-3 py-1 rounded-lg border ${queryBadge}`}>
            "{data.query}"
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 font-mono">
            <Clock className={`w-3 h-3 ${isCalido ? 'text-orange-500' : 'text-sky-400'}`} />
            {data.executionTimeMs} ms
          </span>

          <span className="flex items-center gap-1 font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            {adBlockEnabled ? 'SonkShield Activo: Sin Anuncios' : 'SonkShield Pausado'}
          </span>
        </div>
      </div>

      {/* Direct Brand Fast Action (e.g. for "redit" / "reddit") */}
      {isRedditQuery && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">
              r/
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">¿Deseas entrar directamente a Reddit?</h4>
              <p className="text-xs text-orange-100">Explora comunidades, preguntas, memes y debates en reddit.com</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToUrl('https://www.reddit.com')}
            className="px-4 py-2 rounded-xl bg-white text-orange-600 font-bold text-xs sm:text-sm hover:bg-orange-50 shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <span>Ir a reddit.com</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sonk Bot IA Overview & Organic Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Overview Box with Sonk Bot Rebranding & Mascot */}
          <div className={`rounded-2xl border p-5 relative overflow-hidden transition-all ${aiBoxClasses}`}>
            {/* Ambient subtle glow */}
            <div
              className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
                isCalido ? 'bg-orange-400/15' : isClaro ? 'bg-sky-400/15' : 'bg-sky-500/10'
              }`}
            />

            {/* Sonk Bot IA Header with official Robot Mascot */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-orange-200/50 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-500/10 dark:bg-sky-950/60 border border-sky-400/30 flex items-center justify-center shrink-0 shadow-sm">
                  <img
                    src="/assets/aistudio/sonkbot_clean.png"
                    alt="Sonk Bot IA"
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
                      <span>Sonk Bot IA</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                      ⚡ Resumen IA
                    </span>
                  </div>
                  <p className="text-[11px] opacity-75">
                    Resumen inteligente de Sonk Bot IA • Google Search Grounding
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/20">
                <Sparkles className="w-3 h-3 text-sky-500" />
                <span>Tiempo Real</span>
              </div>
            </div>

            {/* Answer Content */}
            <div className={`text-xs sm:text-sm space-y-3 whitespace-pre-line ${aiTextClasses}`}>
              {data.answer}
            </div>

            {/* Grounding Source Citations */}
            {data.sources && data.sources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-orange-200/60 dark:border-slate-800">
                <div className="text-[11px] font-semibold mb-2 flex items-center gap-1.5 opacity-80">
                  <Globe className={`w-3.5 h-3.5 ${isCalido ? 'text-orange-500' : 'text-sky-400'}`} />
                  Fuentes y accesos directos recomendados por Sonk Bot IA:
                </div>

                <div className="flex flex-wrap gap-2">
                  {data.sources.slice(0, 5).map((src, i) => {
                    let hostname = '';
                    try {
                      hostname = new URL(src.url).hostname.replace('www.', '');
                    } catch {
                      hostname = 'web';
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => onNavigateToUrl(src.url)}
                        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-medium transition-all ${chipClasses}`}
                        title={src.title}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCalido ? 'bg-orange-500' : 'bg-sky-400'}`} />
                        <span className="font-bold opacity-90">{hostname}</span>
                        <span className="max-w-[130px] truncate opacity-70">{src.title}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Organic Web Results Section */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider opacity-70">
              Páginas Web y Enlaces Directos
            </h4>

            {data.sources && data.sources.length > 0 ? (
              data.sources.map((src, idx) => {
                let domain = '';
                try {
                  domain = new URL(src.url).hostname;
                } catch {
                  domain = src.url;
                }

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all group ${cardClasses}`}
                  >
                    <div className="flex items-center gap-2 text-[11px] mb-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCalido ? 'bg-orange-100 text-orange-800' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {domain.charAt(0).toUpperCase()}
                      </div>
                      <span className={`font-semibold ${cardDomainClasses}`}>{domain}</span>
                      <span className="opacity-40">•</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verificado por SonkShield
                      </span>
                    </div>

                    <h5
                      onClick={() => onNavigateToUrl(src.url)}
                      className={`text-sm sm:text-base font-bold cursor-pointer mb-1.5 flex items-center gap-1.5 ${cardLinkClasses}`}
                    >
                      <span className="hover:underline">{src.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </h5>

                    <p className="text-xs opacity-75 line-clamp-2 leading-relaxed mb-3">
                      Accede al contenido oficial, artículos destacados y recursos de {domain}. Navegación rápida y segura con SonkDash.
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateToUrl(src.url)}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                          isCalido
                            ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500 shadow-sm shadow-orange-900/20'
                            : isClaro
                            ? 'bg-sky-600 hover:bg-sky-700 text-white border-sky-600 shadow-sm'
                            : 'bg-sky-600/30 hover:bg-sky-600/50 text-sky-300 border-sky-500/40'
                        }`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Abrir en SonkDash</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={`p-6 text-center text-xs rounded-2xl border ${sidebarBoxClasses}`}>
                No se encontraron enlaces adicionales para esta búsqueda.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Speed Engine Factcard & AdBlock Impact */}
        <div className="space-y-4">
          {/* AdBlock Saved Notice */}
          <div className={`p-4 rounded-2xl border shadow-sm ${
            isCalido
              ? 'bg-gradient-to-br from-emerald-50 to-orange-50 border-emerald-300/80 text-emerald-950'
              : isClaro
              ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200 text-emerald-950'
              : 'bg-gradient-to-br from-emerald-950/40 to-slate-900 border-emerald-500/30 text-slate-100'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Navegación Limpia SonkShield</span>
            </div>
            <p className="text-xs opacity-85 leading-relaxed mb-3">
              En esta búsqueda se filtraron automáticamente anuncios invasivos y rastreadores de cookies.
            </p>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className={`p-2.5 rounded-xl border ${
                isCalido
                  ? 'bg-white border-emerald-200'
                  : isClaro
                  ? 'bg-white border-emerald-200'
                  : 'bg-slate-950/60 border-emerald-500/20'
              }`}>
                <div className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">0 Ads</div>
                <div className="text-[10px] opacity-70">Publicidad mostrada</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${
                isCalido
                  ? 'bg-white border-orange-200'
                  : isClaro
                  ? 'bg-white border-sky-200'
                  : 'bg-slate-950/60 border-emerald-500/20'
              }`}>
                <div className={`font-extrabold text-sm ${isCalido ? 'text-orange-600' : 'text-sky-500'}`}>~95 KB</div>
                <div className="text-[10px] opacity-70">Datos ahorrados</div>
              </div>
            </div>
          </div>

          {/* Quick Search Queries */}
          {data.searchQueries && data.searchQueries.length > 0 && (
            <div className={`p-4 rounded-2xl border ${sidebarBoxClasses}`}>
              <h4 className="text-xs font-bold mb-2 opacity-80">
                Búsquedas relacionadas
              </h4>
              <div className="space-y-1">
                {data.searchQueries.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => onNavigateToUrl(q)}
                    className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      isCalido
                        ? 'hover:bg-orange-100/70 text-orange-950'
                        : isClaro
                        ? 'hover:bg-slate-100 text-slate-900'
                        : 'hover:bg-slate-800 text-slate-300 hover:text-sky-300'
                    }`}
                  >
                    <span className="truncate">{q}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sonk Bot IA Mascot Card */}
          <div className={`p-5 rounded-2xl border text-center flex flex-col items-center ${sidebarBoxClasses}`}>
            <div className="relative mb-2">
              <img
                src="/assets/aistudio/sonkbot_clean.png"
                alt="Sonk Bot IA"
                className="w-24 h-24 object-contain drop-shadow-md"
              />
            </div>
            <div className="font-extrabold text-sm">Sonk Bot IA</div>
            <p className="text-[11px] opacity-75 mt-1 leading-relaxed">
              Motor de búsqueda inteligente impulsado por Gemini y Google Search Grounding en tiempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
