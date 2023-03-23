import React from 'react';

import useCursor from 'Hooks/use-cursor';

const CustomCursor = () => {
  const { styles, cursorRef, shouldRender } = useCursor();

  if (!shouldRender) return null;

  return <div ref={cursorRef} className="custom-cursor" style={styles.cursor} />;
};

export default CustomCursor;
