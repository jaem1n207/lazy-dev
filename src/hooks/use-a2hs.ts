import { useState, useEffect } from 'react';

export const useA2HS = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event>();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const installApp = async () => {
    // @ts-ignore
    deferredPrompt?.prompt();
    // @ts-ignore
    const { outcome } = (await deferredPrompt?.userChoice) || {};
    if (outcome === 'accepted') {
      clearPrompt();
    }

    return outcome;
  };

  const clearPrompt = () => {
    setDeferredPrompt(undefined);
  };

  return { deferredPrompt, install: installApp, clearPrompt };
};
