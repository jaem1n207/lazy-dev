import React, { useEffect } from 'react';

interface UseAutoScrollerProps {
  containerRef: React.RefObject<HTMLElement>;
  selectedIndex: number;
  itemCount: number;
  separatorCount?: number;
}

const CLASS_SEPARATOR = 'separator';

export function useAutoScroller({
  containerRef,
  selectedIndex,
  itemCount,
  separatorCount = 0,
}: UseAutoScrollerProps) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let actualIndex = selectedIndex;
    for (let i = 0; i <= selectedIndex; i++) {
      if (container.children[i].classList.contains(CLASS_SEPARATOR)) {
        actualIndex++;
      }
    }

    const selectedItem = container.children[actualIndex] as HTMLElement;
    if (!selectedItem) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = selectedItem.getBoundingClientRect();

    if (itemRect.top < containerRect.top) {
      container.scrollTop -= containerRect.top - itemRect.top;
    } else if (itemRect.bottom > containerRect.bottom) {
      container.scrollTop += itemRect.bottom - containerRect.bottom;
    }
  }, [selectedIndex, itemCount, containerRef, separatorCount]);

  return CLASS_SEPARATOR;
}
