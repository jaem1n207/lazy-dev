import React, { ReactNode } from 'react';

import { Slice } from 'gatsby';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Slice alias="header" />
      <main>{children}</main>
      <Slice alias="footer" />
    </div>
  );
};

export default Layout;
