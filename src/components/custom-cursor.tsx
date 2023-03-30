import React from 'react';

import useCursor2 from 'Hooks/use-cursor2';

const CustomCursor = () => {
  const cursorRef = useCursor2();

  return <div ref={cursorRef} className="custom-cursor" />;

  // const { styles, cursorRef, shouldRender } = useCursor();

  // if (!shouldRender) return null;

  // return <div ref={cursorRef} className="custom-cursor" style={styles.cursor} />;
};

export default CustomCursor;
