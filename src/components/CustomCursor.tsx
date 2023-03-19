import React from 'react';

import { useMousePosition } from 'Hooks/use-mouse-position';

interface CustomCursorProps {
  active: boolean;
}

const CustomCursor = ({ active }: CustomCursorProps) => {
  const { x, y } = useMousePosition();

  const cursorStyles: React.CSSProperties = {
    transform: active
      ? `translate(-50%, -50%) translate(${x}px, ${y}px)`
      : `translate(-50%, -50%) translate(${x}px, ${y}px) scale(0.23)`,
  };

  return <div id="header-cursor" style={cursorStyles} />;
};

export default CustomCursor;
