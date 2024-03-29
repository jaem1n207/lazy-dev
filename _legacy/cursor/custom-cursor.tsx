import React, { useEffect, useRef, useState } from 'react';

import { useEventListener } from 'Hooks/use-event-listener';
import { ELEMENT_CLASS, ELEMENT_SELECTOR } from 'Types/enum';
import { addClass, getElements, removeClass } from 'Utils/dom';
import { movingElementsTransform } from 'src/legacy/cursor/transform';

const CustomCursor = () => {
  const [isRenderAllComplete, setIsRenderAllComplete] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  const { handleMouseMove, handleMouseOut } = movingElementsTransform();

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

    clickable.forEach((el) => {
      addClass(el, ELEMENT_CLASS.CLICKABLE_ELEMENT);
    });

    return () => {
      clickable.forEach((el) => {
        removeClass(el, ELEMENT_CLASS.CLICKABLE_ELEMENT);
      });
    };
  }, []);

  useEffect(() => {
    const movingElements = getElements(ELEMENT_SELECTOR.MOVING);

    // 'moving-element' 요소에 이벤트 리스너를 추가하는 대신 위에서 body에 두 개의 이벤트 리스너만 추가하기 때문에 성능 확보하기 위함
    movingElements.forEach((el) => {
      // medium-zoom-image 이미지는 확대하기 위한 이미지이기 때문에 커서가 올라가도 moving-element 클래스를 추가하지 않음
      if (el.classList.contains('medium-zoom-image')) return;
      addClass(el, ELEMENT_CLASS.MOVING_ELEMENT);
    });

    return () => {
      movingElements.forEach((el) => {
        removeClass(el, ELEMENT_CLASS.MOVING_ELEMENT);
      });
    };
  }, [isRenderAllComplete]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        transform: `translate(-50%, -50%) translate(0px, 0px) scale(0.23, 0.23)`,
      }}
    />
  );
};

export default CustomCursor;
