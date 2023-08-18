import React from 'react';

import { GlobalStyles as BaseStyles } from 'twin.macro';

interface RootProps {
  children: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
  return (
    <div>
      <BaseStyles />
      {/* {typeof document !== 'undefined' ? createPortal(<CustomCursor />, document.body) : null} */}
      {children}
    </div>
  );
};

export default Root;
