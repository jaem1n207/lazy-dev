import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

const THRESHOLD = 2;

export const useMousePosition = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const previousPosition = useRef<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY };

    const deltaX = Math.abs(newPosition.x - previousPosition.current.x);
    const deltaY = Math.abs(newPosition.y - previousPosition.current.y);

    if (deltaX >= THRESHOLD || deltaY >= THRESHOLD) {
      previousPosition.current = newPosition;
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    const updatePosition = () => {
      requestAnimationFrame(updatePosition);
    };

    updatePosition();

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};
