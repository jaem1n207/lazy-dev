import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isElementInteractive = (el: Element | null): boolean => {
      const interactiveElements = [
        'A',
        'BUTTON',
        'INPUT',
        'TEXTAREA',
        'SELECT',
        'LABEL',
        'VIDEO',
        'AUDIO',
        'IMG',
      ];

      if (!el) return false;

      if (interactiveElements.includes(el.tagName)) return true;

      return false;
    };

    const updateCursor = (x: number, y: number, hoveredElement: Element | null) => {
      if (!cursorRef.current) return;

      if (isElementInteractive(hoveredElement)) {
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
    };

    document.body.addEventListener('mousemove', onMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor"></div>;
};

export default CustomCursor;
