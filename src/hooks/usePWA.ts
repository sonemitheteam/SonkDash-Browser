import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [protocolRegistered, setProtocolRegistered] = useState(false);
  const [searchProviderAdded, setSearchProviderAdded] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (installed as native app)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async (): Promise<boolean> => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      }
    }
    return false;
  };

  // Add SonkDash as Search Provider to Chrome / Edge / Firefox
  const addSearchProvider = async (): Promise<{ success: boolean; message: string }> => {
    try {
      const ext = (window as any).external;
      if (ext && typeof ext.AddSearchProvider === 'function') {
        ext.AddSearchProvider('/opensearch.xml');
        setSearchProviderAdded(true);
        return {
          success: true,
          message: '¡Diálogo de navegador abierto! Haz clic en "Agregar" o "Elegir como predeterminado" en el aviso de tu navegador.',
        };
      }
    } catch (e: any) {
      console.warn('AddSearchProvider error:', e);
    }

    // Fallback: Copy search template url
    const origin = window.location.origin;
    const searchUrl = `${origin}/?q=%s`;
    try {
      await navigator.clipboard.writeText(searchUrl);
      return {
        success: true,
        message: `¡URL de búsqueda copiada al portapapeles! (${searchUrl}). Pégala en Configuración > Motores de búsqueda > Agregar como predeterminado.`,
      };
    } catch {
      return {
        success: true,
        message: `Usa la URL: ${searchUrl} para configurarlo como motor predeterminado en tu navegador.`,
      };
    }
  };

  const registerDefaultProtocol = async (): Promise<{ success: boolean; message: string }> => {
    try {
      if ('registerProtocolHandler' in navigator) {
        const appUrl = window.location.origin + '/?url=%s';
        navigator.registerProtocolHandler('web+sonk', appUrl);
        setProtocolRegistered(true);
        return {
          success: true,
          message: '¡Protocolo web+sonk registrado con éxito en tu sistema!',
        };
      }
      return {
        success: false,
        message: 'Tu navegador actual no admite registro automático de protocolos.',
      };
    } catch (err: any) {
      console.warn('Protocol handler error:', err);
      return {
        success: false,
        message: err.message || 'Permiso denegado por el navegador.',
      };
    }
  };

  const downloadDesktopShortcut = () => {
    window.location.href = '/api/download-shortcut';
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    installApp,
    protocolRegistered,
    searchProviderAdded,
    addSearchProvider,
    registerDefaultProtocol,
    downloadDesktopShortcut,
  };
}
