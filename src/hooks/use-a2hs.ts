import { useState, useEffect, useCallback } from 'react';

import { isBrowser } from 'Libs/environment';

export const useA2HS = () => {
  const [isA2HS, setIsA2HS] = useState(false);
  const [isInstall, setIsInstall] = useState(false);

  const handleBeforeInstall = useCallback(() => {
    setIsA2HS(true);
  }, []);

  const handleAfterInstall = useCallback(() => {
    setIsA2HS(false);
    setIsInstall(true);
  }, []);

  const install = useCallback(() => {
    if (!isBrowser) return;

    const event = new Event('beforeinstallprompt');
    window.dispatchEvent(event);
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAfterInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAfterInstall);
    };
  }, [handleBeforeInstall, handleAfterInstall]);

  return { isA2HS, isInstall, install };
};
