import * as React from 'react';

interface UseScrollCenterProps {
  listRef: React.RefObject<HTMLUListElement>;
  targetId: string;
}

const useScrollCenter = ({ listRef, targetId }: UseScrollCenterProps) => {
  React.useLayoutEffect(() => {
    const containerEl = listRef.current;

    if (!containerEl) {
      return;
    }

    const activeItem = containerEl.querySelector<HTMLUListElement>('[data-ui="active"]');

    if (!activeItem) {
      return;
    }

    const { offsetWidth: tabWidth } = activeItem;
    const { scrollLeft, offsetWidth: containerWidth } = containerEl;
    const tabLeft = activeItem.getBoundingClientRect().left;
    const containerLeft = containerEl.getBoundingClientRect().left;
    const refineLeft = tabLeft - containerLeft;
    const targetScrollX = scrollLeft + refineLeft - containerWidth / 2 + tabWidth / 2;

    containerEl.scroll({
      left: targetScrollX,
      top: 0,
      behavior: 'smooth',
    });
  }, [listRef, targetId]);
};

export default useScrollCenter;
