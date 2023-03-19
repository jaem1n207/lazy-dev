import React from 'react';

import useCursor from 'Hooks/use-cursor';

const CustomCursor = () => {
  const { styles, cursorRef } = useCursor();

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={styles.cursor} />
    </>
  );
};

export default CustomCursor;
