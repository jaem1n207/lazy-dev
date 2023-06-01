import React, { ElementType, ReactNode } from 'react';

import { Slice } from 'gatsby';
import tw from 'twin.macro';

interface LayoutProps {
  children: ReactNode;
  location: Location;
  as?: ElementType;
}

const Layout = ({ children, location }: LayoutProps) => {
  const isRootPath = location.pathname === '/';

  return (
    <div css={[isRootPath && tw`pb-80pxr`]}>
      <Slice alias="header" />
      <main>{children}</main>
      <Slice alias="footer" />
    </div>
  );
};

export default Layout;
