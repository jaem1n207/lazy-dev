import React from 'react';

import { GlobalStyles as BaseStyles } from 'twin.macro';

interface RootProps {
  children: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
  return (
    <>
      <BaseStyles />
      {/* {typeof document !== 'undefined' ? createPortal(<CustomCursor />, document.body) : null} */}
      {children}
    </>
  );
};

export default Root;
