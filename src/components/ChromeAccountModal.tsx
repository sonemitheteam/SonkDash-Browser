import React, { useState } from 'react';
import {
  X,
  Mail,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  UserPlus,
  LogOut,
  PenLine,
  Sparkles,
  Check,
  Send,
} from 'lucide-react';
import { ChromeProfile } from '../types/browser';
import { User } from 'firebase/auth';

interface ChromeAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ChromeProfile;
  onUpdateProfile: (updated: Partial<ChromeProfile>) => void;
  currentUser: User | null;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
  onOpenGmailDrawer: () => void;
  gmailUnreadCount: number;
  effectiveTheme: 'calido' | 'claro' | 'oscuro';
}

const AVATARS = [
  { id: 'sonic', name: 'Sonic The Hedgehog', src: '/assets/aistudio/sonkdash_logo_clean.png' },
  { id: 'google', name: 'Google Profile', bg: 'bg-emerald-600', letter: 'E' },
  { id: 'knuckles', name: 'Knuckles', bg: 'bg-red-600', letter: 'K' },
  { id: 'tails', name: 'Tails', bg: 'bg-amber-500', letter: 'T' },
  { id: 'shadow', name: 'Shadow', bg: 'bg-slate-900', letter: 'S' },
];

export const ChromeAccountModal: React.FC<ChromeAccountModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  currentUser,
  onGoogleSignIn,
  onSignOut,
  onOpenGmailDrawer,
  gmailUnreadCount,
  effectiveTheme,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name || 'elsonemi8890');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  if (!isOpen) return null;

  const isCalido = effectiveTheme === 'calido';
  const isClaro = effectiveTheme === 'claro';

  const modalBg = isCalido
    ? 'bg-amber-50 text-amber-950 border-orange-200'
    : isClaro
    ? 'bg-white text-slate-800 border-slate-200'
    : 'bg-slate-900 text-slate-100 border-slate-800';

  const itemHover = isCalido
    ? 'hover:bg-orange-100/70'
    : isClaro
    ? 'hover:bg-slate-100'
    : 'hover:bg-slate-800';

  const userDisplayName = currentUser?.displayName || profile.name || 'elsonemi8890';
  const userEmail = currentUser?.email || profile.email || 'elsonemi8890@gmail.com';
  const userPhoto = currentUser?.photoURL || profile.avatarUrl;

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateProfile({ name: nameInput.trim() });
    }
    setIsEditingName(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`w-full max-w-sm rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${modalBg}`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-current/10">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-70">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Cuenta de Google en SonkDash</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 transition-colors"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card Center (like Google Chrome Account Flyout) */}
        <div className="p-5 flex flex-col items-center text-center border-b border-current/10 relative">
          {/* Avatar with animated active ring */}
          <div className="relative mb-3 group cursor-pointer" onClick={() => setShowAvatarPicker(!showAvatarPicker)}>
            <div className="w-20 h-20 rounded-full ring-4 ring-orange-500/30 overflow-hidden bg-slate-950 flex items-center justify-center shadow-lg group-hover:ring-orange-500 transition-all">
              {userPhoto ? (
                <img src={userPhoto} alt={userDisplayName} className="w-full h-full object-cover" />
              ) : profile.avatarType === 'sonic' ? (
                <img
                  src="/assets/aistudio/sonkdash_logo_clean.png"
                  alt="Sonic"
                  className="w-14 h-14 object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {userDisplayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-sm" title="Sincronización activa">
              <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          {/* User Name & Edit */}
          {isEditingName ? (
            <div className="flex items-center gap-1.5 mb-1">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="text-sm font-bold text-center px-2 py-0.5 rounded-lg border border-orange-500 bg-transparent focus:outline-none"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="p-1 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="text-base font-bold truncate max-w-[220px]">{userDisplayName}</h3>
              <button
                onClick={() => setIsEditingName(true)}
                className="opacity-60 hover:opacity-100 p-0.5 transition-opacity"
                title="Editar nombre"
              >
                <PenLine className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* User Email */}
          <div className="text-xs opacity-75 font-mono mb-2 flex items-center gap-1">
            <Mail className="w-3 h-3 text-red-500" />
            <span>{userEmail}</span>
          </div>

          {/* Sync status pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sincronización activada</span>
          </div>

          {/* Avatar selector popup */}
          {showAvatarPicker && (
            <div className="w-full bg-black/10 p-2.5 rounded-2xl mb-3 border border-current/10">
              <div className="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-70">
                Selecciona tu Avatar de Perfil:
              </div>
              <div className="flex items-center justify-center gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => {
                      onUpdateProfile({ avatarType: av.id as any, avatarUrl: av.src });
                      setShowAvatarPicker(false);
                    }}
                    className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/40 hover:scale-110 transition-transform flex items-center justify-center bg-slate-900 cursor-pointer shadow-sm"
                    title={av.name}
                  >
                    {av.src ? (
                      <img src={av.src} alt="" className="w-7 h-7 object-contain" />
                    ) : (
                      <span className="text-xs font-bold text-white">{av.letter}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Manage Google Account button */}
          <a
            href="https://myaccount.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[260px] py-1.5 px-3 rounded-full border border-current/20 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-black/5 transition-colors"
          >
            <span>Gestionar tu cuenta de Google</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Gmail Integrated Hub */}
        <div className="p-3 border-b border-current/10 bg-red-500/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold px-2 text-red-600 dark:text-red-400">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Bandeja de Gmail</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
              {gmailUnreadCount > 0 ? `${gmailUnreadCount} nuevos` : 'Al día'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                onClose();
                onOpenGmailDrawer();
              }}
              className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Ver correos</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenGmailDrawer();
              }}
              className="py-2 px-3 rounded-xl border border-red-500/40 text-red-600 dark:text-red-300 hover:bg-red-500/10 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Redactar</span>
            </button>
          </div>
        </div>

        {/* Account Controls and Multi-Account */}
        <div className="p-2 text-xs space-y-1">
          {!currentUser ? (
            <button
              onClick={() => {
                onClose();
                onGoogleSignIn();
              }}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer font-bold ${
                isCalido
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-sky-600 text-white hover:bg-sky-700'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Vincular cuenta con Google</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onSignOut();
              }}
              className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer text-red-500 ${itemHover}`}
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión en SonkDash</span>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onGoogleSignIn();
            }}
            className={`w-full p-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${itemHover}`}
          >
            <UserPlus className="w-4 h-4 opacity-70" />
            <span>Añadir otra cuenta de Google</span>
          </button>
        </div>

        {/* Chrome-Style Sync Footer */}
        <div className="px-5 py-3 border-t border-current/10 bg-black/5 text-[11px] opacity-70 flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
          <span>Marcadores, fondos y preferencias sincronizados con la nube.</span>
        </div>
      </div>
    </div>
  );
};
