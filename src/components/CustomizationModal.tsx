import React, { useState, useRef } from 'react';
import {
  X,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Palette,
  RotateCcw,
  Check,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { BrowserCustomization } from '../types/browser';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customization: BrowserCustomization;
  onSaveCustomization: (custom: BrowserCustomization) => void;
  effectiveTheme: 'calido' | 'claro' | 'oscuro';
}

export const WALLPAPER_PRESETS = [
  {
    id: 'sonic-emerald',
    name: 'Sonic Emerald Speed',
    category: 'Sonic & Dash',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'green-hill',
    name: 'Green Hill Zone Paradise',
    category: 'Sonic & Dash',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'cyberpunk-neon',
    name: 'Neo Tokyo Cyberpunk',
    category: 'Futurista',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'deep-space',
    name: 'Nebulosa Cósmica Profunda',
    category: 'Espacio',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'golden-sunset',
    name: 'Atardecer Dorado Cálido',
    category: 'Cálido',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'minimal-warm',
    name: 'Naranja Cálido Minimalista',
    category: 'Cálido',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'dark-obsidian',
    name: 'Obsidiana Carbón Oscuro',
    category: 'Oscuro',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'pixel-retro',
    name: 'Pixel Art Retro Sonic',
    category: 'Retro',
    url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&auto=format&fit=crop&q=80',
    thumb: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80',
  },
];

export const ACCENT_COLORS = [
  { id: 'calido', name: 'Cálido Sonk (Predeterminado)', bg: 'bg-orange-500', border: 'border-orange-500' },
  { id: 'sonic-cyan', name: 'Azul Supersónico', bg: 'bg-sky-500', border: 'border-sky-500' },
  { id: 'chaos-emerald', name: 'Verde Esmeralda', bg: 'bg-emerald-500', border: 'border-emerald-500' },
  { id: 'neon-purple', name: 'Púrpura Neón', bg: 'bg-purple-500', border: 'border-purple-500' },
  { id: 'dark-slate', name: 'Obsidiana Oscuro', bg: 'bg-slate-800', border: 'border-slate-500' },
  { id: 'amber-glow', name: 'Ámbar Brillante', bg: 'bg-amber-500', border: 'border-amber-500' },
];

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  customization,
  onSaveCustomization,
  effectiveTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'wallpapers' | 'adjust' | 'accents'>('wallpapers');
  const [customUrlInput, setCustomUrlInput] = useState(
    customization.wallpaperType === 'url' ? customization.wallpaperUrl || '' : ''
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isCalido = effectiveTheme === 'calido';
  const isClaro = effectiveTheme === 'claro';

  const modalBg = isCalido
    ? 'bg-amber-50 text-amber-950 border-orange-200 shadow-2xl'
    : isClaro
    ? 'bg-white text-slate-800 border-slate-200 shadow-2xl'
    : 'bg-slate-900 text-slate-100 border-slate-800 shadow-2xl';

  const cardBg = isCalido
    ? 'bg-white/80 border-orange-200 hover:border-orange-400'
    : isClaro
    ? 'bg-slate-50 border-slate-200 hover:border-slate-400'
    : 'bg-slate-950/70 border-slate-800 hover:border-sky-500/50';

  const handleSelectPreset = (preset: typeof WALLPAPER_PRESETS[0]) => {
    onSaveCustomization({
      ...customization,
      wallpaperType: 'preset',
      presetId: preset.id,
      wallpaperUrl: preset.url,
    });
  };

  const handleSetDefaultWallpaper = () => {
    onSaveCustomization({
      ...customization,
      wallpaperType: 'default',
      presetId: undefined,
      wallpaperUrl: undefined,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onSaveCustomization({
          ...customization,
          wallpaperType: 'upload',
          wallpaperUrl: dataUrl,
          presetId: undefined,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customUrlInput.trim();
    if (!trimmed) return;
    onSaveCustomization({
      ...customization,
      wallpaperType: 'url',
      wallpaperUrl: trimmed,
      presetId: undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-2xl border p-6 flex flex-col max-h-[90vh] overflow-hidden ${modalBg}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-current/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Personalizar SonkDash</h2>
              <p className="text-xs opacity-70">
                Personaliza fondos de pantalla, efectos y colores igual que en Google Chrome
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/10 transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-current/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('wallpapers')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'wallpapers'
                ? isCalido
                  ? 'bg-orange-500 text-white'
                  : 'bg-sky-600 text-white'
                : 'hover:bg-black/10 opacity-80'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Fondos de pantalla</span>
          </button>

          <button
            onClick={() => setActiveTab('adjust')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'adjust'
                ? isCalido
                  ? 'bg-orange-500 text-white'
                  : 'bg-sky-600 text-white'
                : 'hover:bg-black/10 opacity-80'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Ajustes de visibilidad</span>
          </button>

          <button
            onClick={() => setActiveTab('accents')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'accents'
                ? isCalido
                  ? 'bg-orange-500 text-white'
                  : 'bg-sky-600 text-white'
                : 'hover:bg-black/10 opacity-80'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Colores y tema</span>
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {activeTab === 'wallpapers' && (
            <div className="space-y-4">
              {/* Quick source actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Upload from device */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${cardBg} ${
                    customization.wallpaperType === 'upload' ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-600 flex items-center justify-center shrink-0">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs">Subir desde este dispositivo</div>
                    <div className="text-[11px] opacity-70">PNG, JPG, WEBP de tu galería</div>
                  </div>
                </div>

                {/* Reset to default SonkDash aura */}
                <div
                  onClick={handleSetDefaultWallpaper}
                  className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${cardBg} ${
                    customization.wallpaperType === 'default' ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-600 flex items-center justify-center shrink-0">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs">Fondo Predeterminado SonkDash</div>
                    <div className="text-[11px] opacity-70">Aura limpia con tema de navegador</div>
                  </div>
                  {customization.wallpaperType === 'default' && (
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                </div>
              </div>

              {/* Paste image URL */}
              <form onSubmit={handleApplyCustomUrl} className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="O pega aquí una URL de imagen web (https://...)"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-current/20 bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Aplicar URL
                </button>
              </form>

              {/* Preset Gallery */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Galería de Fondos Seleccionados para SonkDash</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {WALLPAPER_PRESETS.map((p) => {
                    const isSelected =
                      customization.wallpaperType === 'preset' && customization.presetId === p.id;

                    return (
                      <div
                        key={p.id}
                        onClick={() => handleSelectPreset(p)}
                        className={`group relative rounded-xl overflow-hidden border cursor-pointer aspect-video transition-all ${
                          isSelected
                            ? 'ring-2 ring-orange-500 scale-[1.02]'
                            : 'hover:scale-[1.02] border-transparent'
                        }`}
                      >
                        <img
                          src={p.thumb}
                          alt={p.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                          <span className="text-[11px] font-bold text-white line-clamp-1 drop-shadow">
                            {p.name}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'adjust' && (
            <div className="space-y-5 py-2">
              <div className="p-4 rounded-xl border border-current/15 bg-black/5 space-y-4">
                {/* Dim level */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-orange-500" />
                      <span>Oscurecimiento de fondo (Legibilidad)</span>
                    </span>
                    <span className="font-mono text-orange-600">{customization.dimLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={customization.dimLevel}
                    onChange={(e) =>
                      onSaveCustomization({
                        ...customization,
                        dimLevel: Number(e.target.value),
                      })
                    }
                    className="w-full accent-orange-500"
                  />
                  <p className="text-[11px] opacity-70 mt-1">
                    Aumenta el oscurecimiento para que la barra de búsqueda y el logo resalten perfectamente sobre la imagen.
                  </p>
                </div>

                {/* Blur level */}
                <div className="pt-3 border-t border-current/10">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-orange-500" />
                      <span>Desenfoque de fondo (Efecto cristal)</span>
                    </span>
                    <span className="font-mono text-orange-600">{customization.blurLevel} px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={customization.blurLevel}
                    onChange={(e) =>
                      onSaveCustomization({
                        ...customization,
                        blurLevel: Number(e.target.value),
                      })
                    }
                    className="w-full accent-orange-500"
                  />
                  <p className="text-[11px] opacity-70 mt-1">
                    Suaviza la imagen de fondo para un efecto estético moderno y relajante.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accents' && (
            <div className="space-y-4 py-2">
              <div className="text-xs font-semibold opacity-80">
                Selecciona la paleta de acentos visuales de SonkDash:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ACCENT_COLORS.map((accent) => {
                  const isSelected = customization.accentColor === accent.id;
                  return (
                    <div
                      key={accent.id}
                      onClick={() =>
                        onSaveCustomization({
                          ...customization,
                          accentColor: accent.id,
                        })
                      }
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${cardBg} ${
                        isSelected ? 'ring-2 ring-orange-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full ${accent.bg} shadow-sm`} />
                        <span className="text-xs font-medium">{accent.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-orange-500" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-current/10 flex items-center justify-between">
          <button
            onClick={() => {
              onSaveCustomization({
                wallpaperType: 'default',
                dimLevel: 25,
                blurLevel: 0,
                accentColor: 'calido',
              });
            }}
            className="text-xs opacity-70 hover:opacity-100 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer todo</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
