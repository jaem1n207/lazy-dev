import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useEventListener } from 'Hooks/use-event-listener';
import { getElements } from 'Libs/dom';
import { movingElementsTransform } from 'Libs/transform';
import { ELEMENT_CLASS, ELEMENT_SELECTOR } from 'Types/enum';

const LAST_CURSOR_POSITION_KEY = 'lastCursorPosition';

interface LastCursorPosition {
  x: number;
  y: number;
}

const useLastCursorPosition = () => {
  const storedCursorPosition = sessionStorage.getItem(LAST_CURSOR_POSITION_KEY);
  const initialPosition: LastCursorPosition = storedCursorPosition
    ? JSON.parse(storedCursorPosition)
    : { x: 0, y: 0 };
  const lastCursorPosition = useRef<LastCursorPosition>(initialPosition);

  const saveCursorPosition = useCallback(({ x, y }: { x: number; y: number }) => {
    const newPosition = { x, y };
    lastCursorPosition.current = newPosition;
    sessionStorage.setItem(LAST_CURSOR_POSITION_KEY, JSON.stringify(newPosition));
  }, []);

  return {
    lastCursorPosition: lastCursorPosition.current,
    saveCursorPosition,
  };
};

const CustomCursor = () => {
  const [isRenderAllComplete, setIsRenderAllComplete] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  const { handleMouseMove, handleMouseOut } = movingElementsTransform();
  const { lastCursorPosition, saveCursorPosition } = useLastCursorPosition();

  // DOM 트리가 변경되는지 감지하고 자식 노드가 변경되면 isRenderAllComplete를 true로 변경
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (isRenderAllComplete) return;
      setIsRenderAllComplete(true);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [isRenderAllComplete]);

  const isElementInteractive = (el: Element | null): boolean => {
    return Boolean(el?.classList.contains(ELEMENT_CLASS.CLICKABLE_ELEMENT));
  };

  const isElementInteractiveParent = (el?: Element | null): boolean => {
    return Boolean(el?.parentElement?.classList.contains(ELEMENT_CLASS.CLICKABLE_ELEMENT));
  };

  const updateCursor = (x: number, y: number, hoveredElement: Element | null) => {
    if (!cursorRef.current) return;

    saveCursorPosition({ x, y });

    if (
      isElementInteractive(hoveredElement) ||
      isElementInteractiveParent(hoveredElement) ||
      getElements(ELEMENT_SELECTOR.CLICKABLE).some((el) => el.contains(hoveredElement))
    ) {
      cursorRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    } else {
      cursorRef.current.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(0.23, 0.23)`;
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const hoveredElement = document.elementFromPoint(x, y);

    requestAnimationFrame(() => {
      updateCursor(x, y, hoveredElement);
    });

    handleMouseMove(e);
  };

  useEventListener('mousemove', onMouseMove, document.body);
  useEventListener('mouseout', handleMouseOut, document.body);

  useEffect(() => {
    const clickable = getElements(ELEMENT_SELECTOR.CLICKABLE);
    const movingElements = getElements(ELEMENT_SELECTOR.MOVING);

    clickable.forEach((el) => {
      el.classList.add(ELEMENT_CLASS.CLICKABLE_ELEMENT);
    });

    // 'moving-element' 요소에 이벤트 리스너를 추가하는 대신 위에서 body에 두 개의 이벤트 리스너만 추가하기 때문에 성능 확보하기 위함.
    movingElements.forEach((el) => {
      el.classList.add(ELEMENT_CLASS.MOVING_ELEMENT);
    });

    return () => {
      movingElements.forEach((el) => {
        el.classList.remove(ELEMENT_CLASS.MOVING_ELEMENT);
      });
    };
  }, [isRenderAllComplete]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        transform: `translate(-50%, -50%) translate(${lastCursorPosition.x}px, ${lastCursorPosition.y}px)`,
      }}
    />
  );
};

export default CustomCursor;
