import React from 'react';

import useCursor from 'Hooks/use-cursor';

const CursorFollower = () => {
  const { styles, cursorInnerRef, cursorOuterRef } = useCursor();

  return (
    <>
      <div ref={cursorInnerRef} className="custom-cursor" style={styles.cursorInner} />
      <div ref={cursorOuterRef} className="custom-cursor-follower" style={styles.cursorOuter} />
    </>
  );
};

export default CursorFollower;
