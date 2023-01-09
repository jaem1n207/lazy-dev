import * as React from 'react';

import { isBrowser } from 'Libs/environment';

interface WindowSize {
  width?: number;
  height?: number;
}

const getSize = (): WindowSize => {
  return {
    width: isBrowser ? window.innerWidth : undefined,
    height: isBrowser ? window.innerHeight : undefined,
  };
};

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!isBrowser) return;

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
