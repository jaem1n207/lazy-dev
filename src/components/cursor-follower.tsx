import React from 'react';

import useCursor from 'Hooks/use-cursor';
import { isBrowser } from 'Libs/environment';

const CursorFollower = () => {
  const { styles, cursorInnerRef, cursorOuterRef } = useCursor();

  if (!isBrowser) {
    return null;
  }

  return (
    <>
      <div ref={cursorInnerRef} className="custom-cursor" style={styles.cursorInner} />
      <div ref={cursorOuterRef} className="custom-cursor-follower" style={styles.cursorOuter} />
    </>
  );
};

export default CursorFollower;
