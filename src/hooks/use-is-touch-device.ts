import { useState, useEffect } from 'react';

import { isBrowser } from 'Libs/environment';

export const useIsTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (isBrowser) {
      setIsTouchDevice('ontouchstart' in window);
    }
  }, []);

  return isTouchDevice;
};
