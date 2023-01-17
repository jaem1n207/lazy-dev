import { useEffect } from 'react';

import { isBrowser } from 'Libs/environment';

// https://github.com/cubiq/iscroll/blob/master/demos/demoUtils.js#L2-L12
const isPassive = () => {
  let supportsPassive = false;

  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: function () {
        supportsPassive = true;
      },
    });
    // @ts-ignore
    window.addEventListener('test', null, opts);
  } catch (e) {
    // do nothing
  }

  return supportsPassive;
};

export const useScrollEvent = (cb: () => void) => {
  useEffect(() => {
    if (!isBrowser) return;

    window.addEventListener('scroll', cb, isPassive() ? { passive: true } : false);

    return () => {
      window.removeEventListener('scroll', cb);
    };
  }, [cb]);
};
