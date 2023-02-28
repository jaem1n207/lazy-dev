import { useEffect, useState } from 'react';

import { window } from 'browser-monads-ts';

interface WindowSize {
  width?: number;
  height?: number;
}

const getSize = (): WindowSize => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
