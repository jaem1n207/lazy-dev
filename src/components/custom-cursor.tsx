import React from 'react';

import useCursor from 'Hooks/use-cursor';

interface CustomCursorProps {
  shouldRender: boolean;
}

const CustomCursor = ({ shouldRender }: CustomCursorProps) => {
  const { styles, cursorRef } = useCursor();

  if (!shouldRender) return null;
  return <div ref={cursorRef} className="custom-cursor" style={styles.cursor} />;
};

export default CustomCursor;
