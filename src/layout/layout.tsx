import type { ReactNode } from 'react';

import { Slice } from 'gatsby';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Slice alias="nav" />
      {children}
      <Slice alias="footer" />
    </>
  );
};

export default Layout;
