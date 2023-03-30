import { useState, useRef, useLayoutEffect, useCallback } from 'react';

const useCursor2 = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const animate = useCallback(
    (time: number) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(-50%, -50%) translate(${cursorPosition.x}px, ${cursorPosition.y}px) scale(0.23)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    },
    [cursorPosition.x, cursorPosition.y]
  );

  useLayoutEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener('mousemove', onMouseMove);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current!);
    };
  }, [animate]);

  return cursorRef;
};

export default useCursor2;
