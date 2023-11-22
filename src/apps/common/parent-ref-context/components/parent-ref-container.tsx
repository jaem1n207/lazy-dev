import { useRef } from 'react';
import * as React from 'react';

import { ParentRefContext } from '../utils';

interface ParentRefContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const ParentRefContainer: React.FC<ParentRefContainerProps> = ({ children, ...rest }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={parentRef} {...rest}>
      <ParentRefContext.Provider value={parentRef}>{children}</ParentRefContext.Provider>
    </div>
  );
};

export default ParentRefContainer;
