import React from 'react';

import { createPortal } from 'react-dom';
import { GlobalStyles as BaseStyles } from 'twin.macro';

import CustomCursor from 'Components/custom-cursor';

interface RootProps {
  children: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
  return (
    <div>
      <BaseStyles />;
      {typeof document !== 'undefined' ? createPortal(<CustomCursor />, document.body) : null}
      {children}
    </div>
  );
};

export default Root;
