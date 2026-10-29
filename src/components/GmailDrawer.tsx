import React, { useState } from 'react';
import {
  Mail,
  Send,
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Inbox,
  Tag,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';
import { GmailMessage } from '../types/browser';
import { User } from 'firebase/auth';

interface GmailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  effectiveTheme?: 'calido' | 'claro' | 'oscuro';
  currentUser: User | null;
  accessToken: string | null;
  isAuthenticating: boolean;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  messages: GmailMessage[];
  unreadCount: number;
  isLoadingMessages: boolean;
  onRefreshMessages: () => Promise<void>;
  onToggleRead: (id: string) => void;
  onSendMessage: (to: string, subject: string, body: string) => Promise<boolean>;
  onOpenGmailWebTab: () => void;
}

export const GmailDrawer: React.FC<GmailDrawerProps> = ({
  isOpen,
  onClose,
  effectiveTheme = 'calido',
  currentUser,
  accessToken,
  isAuthenticating,
  onSignIn,
  onSignOut,
  messages,
  unreadCount,
  isLoadingMessages,
  onRefreshMessages,
  onToggleRead,
  onSendMessage,
  onOpenGmailWebTab,
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose'>('inbox');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedMessage, setSelectedMessage] = useState<GmailMessage | null>(null);

  // Mandatory Workspace Security: Confirmation modal before sending
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);

  if (!isOpen) return null;

  const isCalido = effectiveTheme === 'calido';
  const isOscuro = effectiveTheme === 'oscuro';

  // Styling tokens based on theme
  const drawerBg = isCalido
    ? 'bg-[#fffaf3] text-[#3e2513] border-[#f3ddc9]'
    : isOscuro
    ? 'bg-slate-900 text-slate-100 border-slate-800'
    : 'bg-white text-slate-900 border-slate-200';

  const headerBg = isCalido
    ? 'bg-[#f8ede1] border-[#eed5be]'
    : isOscuro
    ? 'bg-slate-950 border-slate-800'
    : 'bg-slate-100 border-slate-200';

  const subHeaderBg = isCalido
    ? 'bg-[#faefe3]/80 border-[#eed5be]'
    : isOscuro
    ? 'bg-slate-950/50 border-slate-800'
    : 'bg-slate-50 border-slate-200';

  const cardBg = isCalido
    ? 'bg-white border-[#f0dac5] hover:border-amber-400'
    : isOscuro
    ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
    : 'bg-slate-50 border-slate-200 hover:border-slate-300';

  const cardUnreadBg = isCalido
    ? 'bg-[#fff4e8] border-orange-300 shadow-xs'
    : isOscuro
    ? 'bg-slate-800/80 border-sky-500/40 shadow-xs'
    : 'bg-sky-50/70 border-sky-300 shadow-xs';

  const inputBg = isCalido
    ? 'bg-white border-[#ebd4bf] text-[#3e2513] focus:border-orange-500 placeholder-stone-400'
    : isOscuro
    ? 'bg-slate-950 border-slate-800 text-white focus:border-red-500 placeholder-slate-500'
    : 'bg-white border-slate-300 text-slate-900 focus:border-red-500 placeholder-slate-400';

  const handlePreSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject) return;
    setSendError(null);
    setShowSendConfirmation(true);
  };

  const handleConfirmSend = async () => {
    setShowSendConfirmation(false);
    setIsSending(true);
    setSendError(null);

    try {
      const success = await onSendMessage(to, subject, body);
      if (success) {
        setSendSuccess(true);
        setTimeout(() => {
          setSendSuccess(false);
          setTo('');
          setSubject('');
          setBody('');
          setActiveTab('inbox');
        }, 1200);
      } else {
        setSendError('No se pudo enviar el correo. Verifica tu conexión.');
      }
    } catch (err: any) {
      setSendError(err?.message || 'Error al enviar el correo.');
    } finally {
      setIsSending(false);
    }
  };

  const filteredMessages = selectedCategory === 'Todas'
    ? messages
    : messages.filter((m) => m.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Drawer */}
      <div className={`relative z-10 w-full max-w-md h-full border-l shadow-2xl flex flex-col transition-colors ${drawerBg}`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between transition-colors ${headerBg}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/15 text-red-500 border border-red-500/30 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm">Gmail para SonkDash</h3>
                {currentUser && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 font-semibold">
                    {unreadCount} sin leer
                  </span>
                )}
              </div>
              <p className="text-xs opacity-70 truncate max-w-[210px]">
                {currentUser?.email || 'Cuenta no sincronizada'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {currentUser && (
              <button
                onClick={() => onRefreshMessages()}
                disabled={isLoadingMessages}
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-colors"
                title="Actualizar correos"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingMessages ? 'animate-spin text-orange-500' : ''}`} />
              </button>
            )}
            <button
              onClick={onOpenGmailWebTab}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-colors"
              title="Abrir Gmail en pestaña de SonkDash"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Account / Connection Bar */}
        <div className={`px-4 py-2.5 border-b flex items-center justify-between text-xs transition-colors ${subHeaderBg}`}>
          {currentUser ? (
            <>
              <div className="flex items-center gap-2 truncate">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Avatar"
                    className="w-5 h-5 rounded-full border border-emerald-500 shrink-0"
                  />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                )}
                <span className="truncate font-medium text-[11px]">
                  {currentUser.displayName || currentUser.email}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold">
                  EN VIVO
                </span>
              </div>
              <button
                onClick={onSignOut}
                className="flex items-center gap-1 text-[11px] text-red-500 hover:underline shrink-0"
                title="Cerrar sesión de Google"
              >
                <LogOut className="w-3 h-3" />
                Salir
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="opacity-80 text-[11px]">Requiere inicio de sesión de Google</span>
              </div>
              <span className="text-[10px] opacity-60">OAuth 2.0</span>
            </>
          )}
        </div>

        {/* Content Area */}
        {!currentUser ? (
          /* Unauthenticated State: Official Google Sign-In prompt */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-500 shadow-inner">
              <Mail className="w-8 h-8" />
            </div>

            <h4 className="font-bold text-base mb-1">Conecta tu Gmail real</h4>
            <p className="text-xs opacity-75 max-w-xs leading-relaxed mb-6">
              Sincroniza tus correos verídicos, recibe notificaciones sin bots y redacta mensajes de alta velocidad directamente en SonkDash.
            </p>

            {/* Official Google Sign In Button */}
            <button
              onClick={onSignIn}
              disabled={isAuthenticating}
              className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-md font-medium text-xs flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isAuthenticating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-orange-500" />
                  <span>Conectando con Google...</span>
                </>
              ) : (
                <>
                  {/* Google Multicolor Logo */}
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span>Iniciar sesión con Google</span>
                </>
              )}
            </button>

            <div className="mt-8 p-3 rounded-xl border border-dashed border-orange-400/40 bg-orange-500/5 text-left text-[11px] opacity-80 space-y-1.5">
              <div className="flex items-center gap-1.5 font-medium text-orange-600 dark:text-orange-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Privacidad Garantizada</span>
              </div>
              <p className="text-[10px] leading-tight">
                Tus tokens se gestionan en memoria y nunca se almacenan en almacenamiento local. Compatible con sonemi8890@gmail.com.
              </p>
            </div>
          </div>
        ) : (
          /* Authenticated State */
          <>
            {/* Navigation Tabs (Bandeja / Redactar) */}
            <div className={`flex border-b px-4 gap-2 pt-2 transition-colors ${drawerBg}`}>
              <button
                onClick={() => {
                  setActiveTab('inbox');
                  setSelectedMessage(null);
                }}
                className={`pb-2.5 text-xs font-semibold px-2 border-b-2 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'inbox'
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                Bandeja Real ({unreadCount})
              </button>
              <button
                onClick={() => {
                  setActiveTab('compose');
                  setSelectedMessage(null);
                }}
                className={`pb-2.5 text-xs font-semibold px-2 border-b-2 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'compose'
                    ? 'border-red-500 text-red-600 dark:text-red-400'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                Redactar Rápido
              </button>
            </div>

            {/* Category Pills when in Inbox */}
            {activeTab === 'inbox' && !selectedMessage && (
              <div className="flex gap-1.5 px-4 py-2 border-b border-black/5 dark:border-white/5 overflow-x-auto text-[11px] scrollbar-none">
                {['Todas', 'Principal', 'Social', 'Promociones', 'Actualizaciones'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-red-500/20 text-red-600 dark:text-red-300 border border-red-500/40 font-medium'
                        : 'bg-black/5 dark:bg-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'inbox' ? (
                selectedMessage ? (
                  /* Single Message View */
                  <div className="space-y-4">
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-xs text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 mb-2"
                    >
                      ← Volver a la lista
                    </button>

                    <div className={`p-4 rounded-xl border ${cardBg}`}>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-sm">{selectedMessage.subject}</span>
                        <span className="text-[10px] opacity-60 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedMessage.date}
                        </span>
                      </div>

                      <div className="text-xs opacity-80 mb-4 pb-3 border-b border-black/10 dark:border-white/10">
                        <div>
                          <strong className="opacity-60 font-medium">De: </strong>
                          {selectedMessage.from || selectedMessage.sender}
                        </div>
                        <div>
                          <strong className="opacity-60 font-medium">Para: </strong>
                          {currentUser.email}
                        </div>
                      </div>

                      <div className="text-xs leading-relaxed whitespace-pre-wrap opacity-90">
                        {selectedMessage.snippet}
                      </div>

                      <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 opacity-70">
                          {selectedMessage.category}
                        </span>
                        <button
                          onClick={() => {
                            setTo(selectedMessage.from || selectedMessage.sender);
                            setSubject('Re: ' + selectedMessage.subject);
                            setSelectedMessage(null);
                            setActiveTab('compose');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                        >
                          <Send className="w-3 h-3" />
                          Responder
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Message List */
                  <div className="space-y-2.5">
                    {isLoadingMessages ? (
                      <div className="text-center py-12">
                        <RefreshCw className="w-7 h-7 mx-auto mb-2 animate-spin text-orange-500 opacity-80" />
                        <p className="text-xs opacity-70">Sincronizando tus correos de Gmail...</p>
                      </div>
                    ) : filteredMessages.length === 0 ? (
                      <div className="text-center py-12 opacity-60">
                        <Mail className="w-8 h-8 mx-auto mb-2 opacity-40 text-red-500" />
                        <p className="text-xs font-medium">Bandeja al día</p>
                        <p className="text-[11px] opacity-70 mt-1">No hay correos en la categoría seleccionada.</p>
                      </div>
                    ) : (
                      filteredMessages.map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => {
                            if (!msg.read) onToggleRead(msg.id);
                            setSelectedMessage(msg);
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            msg.read ? cardBg : cardUnreadBg
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-1.5 truncate pr-2">
                              {!msg.read && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
                              <span className={`truncate font-semibold ${msg.read ? 'opacity-85' : 'text-orange-950 dark:text-white font-bold'}`}>
                                {msg.sender}
                              </span>
                            </div>
                            <span className="text-[10px] opacity-60 shrink-0">{msg.date}</span>
                          </div>

                          <h4 className={`text-xs truncate ${msg.read ? 'opacity-85' : 'font-semibold text-orange-800 dark:text-sky-300'}`}>
                            {msg.subject}
                          </h4>

                          <p className="text-[11px] opacity-70 mt-1 line-clamp-2 leading-relaxed">
                            {msg.snippet}
                          </p>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5 dark:border-white/5 text-[10px] opacity-70">
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">
                              <Tag className="w-2.5 h-2.5" /> {msg.category}
                            </span>
                            <span className="text-orange-600 dark:text-sky-400 hover:underline flex items-center gap-0.5">
                              Leer completo <ArrowRight className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )
              ) : (
                /* Compose Tab */
                <form onSubmit={handlePreSend} className="space-y-3.5">
                  {sendSuccess && (
                    <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>¡Mensaje enviado con éxito a través de Gmail!</span>
                    </div>
                  )}

                  {sendError && (
                    <div className="p-3 bg-red-500/15 border border-red-500/40 text-red-700 dark:text-red-300 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{sendError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-medium opacity-75 mb-1">De:</label>
                    <div className={`px-3 py-2 rounded-lg border text-xs flex items-center gap-2 ${cardBg}`}>
                      <UserIcon className="w-3.5 h-3.5 opacity-60" />
                      <span className="font-semibold">{currentUser.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium opacity-75 mb-1">Para:</label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@destino.com"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg text-xs outline-none transition-all ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium opacity-75 mb-1">Asunto:</label>
                    <input
                      type="text"
                      required
                      placeholder="Asunto del correo"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg text-xs outline-none transition-all ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium opacity-75 mb-1">Mensaje:</label>
                    <textarea
                      rows={6}
                      placeholder="Escribe tu mensaje aquí..."
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg text-xs outline-none resize-none transition-all ${inputBg}`}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] opacity-60 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      Envío verificado por Gmail API
                    </span>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all disabled:opacity-50"
                    >
                      {isSending ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Enviar Correo
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className={`p-3 border-t flex items-center justify-between text-xs transition-colors ${subHeaderBg}`}>
          <button
            onClick={onOpenGmailWebTab}
            className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Abrir versión web en SonkDash</span>
          </button>

          <span className="text-[10px] opacity-60">SonkDash Gmail Sync</span>
        </div>
      </div>

      {/* Mandatory Explicit Confirmation Dialog before sending emails (Google Workspace Guideline) */}
      {showSendConfirmation && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`w-full max-w-sm p-5 rounded-2xl border shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 ${drawerBg}`}>
            <div className="flex items-center gap-2.5 text-orange-600 dark:text-orange-400">
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">¿Confirmar envío de correo?</h4>
                <p className="text-[11px] opacity-70">Operación saliente de Gmail</p>
              </div>
            </div>

            <p className="text-xs opacity-90 leading-relaxed">
              ¿Estás seguro de enviar este correo desde tu cuenta{' '}
              <strong className="font-semibold text-orange-700 dark:text-orange-300">
                {currentUser?.email}
              </strong>{' '}
              a <strong className="font-semibold">{to}</strong> con el asunto{' '}
              <em>"{subject}"</em>?
            </p>

            <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 text-[11px] opacity-80 truncate">
              <strong>Vista previa:</strong> {body ? body.slice(0, 90) : '(Sin texto)'}...
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowSendConfirmation(false)}
                className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSend}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-red-900/30 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirmar y Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
