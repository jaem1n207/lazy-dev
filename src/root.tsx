import type { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

const Root = ({ children }: RootProps) => {
  return <>{children}</>;
};

export default Root;
