import React from 'react';

import useCursor from 'Hooks/use-cursor';

const CursorFollower = () => {
  const { styles, cursorInnerRef, cursorOuterRef } = useCursor();
  return (
    <>
      <div ref={cursorInnerRef} style={styles.cursorInner} />
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
    </>
  );
};

export default CursorFollower;
