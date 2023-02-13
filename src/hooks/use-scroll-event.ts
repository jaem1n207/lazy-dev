import { useEffect } from 'react';

export const useScrollEvent = (onScroll: () => void) => {
  useEffect(() => {
    // scroll event는 이미 스크롤이 발생한 뒤의 로직이기 때문에 { passive: true } 옵션은 무의미함.
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
