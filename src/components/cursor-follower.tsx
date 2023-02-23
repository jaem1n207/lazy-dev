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
      <div ref={cursorInnerRef} style={styles.cursorInner} />
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
    </>
  );
};

export default CursorFollower;
