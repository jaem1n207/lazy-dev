import { useState, useEffect } from 'react';

import { Local_STORAGE_KEY } from 'Types/enum';

import { useLocalStorage } from './use-local-storage';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
};

export const useA2HS = () => {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [a2hsBannerStorage, setA2hsBannerStorge] = useLocalStorage(
    Local_STORAGE_KEY.A2HS_BANNER,
    true
  );

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    clearPrompt();
    if (prompt) {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        clearPrompt();
      }
    }
  };

  const clearPrompt = () => {
    setPrompt(null);
    setA2hsBannerStorge(false);
  };

  return { a2hsBannerStorage, prompt, handleInstall, clearPrompt };
};
