import * as React from 'react';

interface UseScrollCenterProps {
  ref: React.RefObject<HTMLUListElement>;
  targetId: string;
}

const useScrollCenter = ({ ref, targetId }: UseScrollCenterProps) => {
  React.useLayoutEffect(() => {
    const categoryWrapEl = ref.current;

    if (!categoryWrapEl) {
      return;
    }

    const isScrollActivated = categoryWrapEl.scrollWidth >= categoryWrapEl.offsetWidth;

    if (!isScrollActivated) {
      return;
    }

    const activeCategoryEl = categoryWrapEl.querySelector<HTMLUListElement>('[data-ui="active"]');

    if (!activeCategoryEl) {
      return;
    }

    const offsetX = activeCategoryEl.offsetLeft - categoryWrapEl.offsetLeft;
    categoryWrapEl.scrollTo({
      left: offsetX - categoryWrapEl.offsetWidth / 2 + activeCategoryEl.offsetWidth / 2,
      top: 0,
    });
  }, [ref, targetId]);
};

export default useScrollCenter;
