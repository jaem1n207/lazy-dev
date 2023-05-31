import React, { ElementType, ReactNode } from 'react';

import { Slice } from 'gatsby';
import { createPortal } from 'react-dom';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import CustomCursor from 'Components/custom-cursor';

interface LayoutProps {
  children: ReactNode;
  location: Location;
  title: Queries.Maybe<string>;
  as?: ElementType;
}

const Layout = ({ children, location, title, as = 'div' }: LayoutProps) => {
  const As = as;

  const isRootPath = location.pathname === '/';

  return (
    <As css={[isRootPath && tw`pb-80pxr`]}>
      <BaseStyles />
      {typeof document !== 'undefined' ? createPortal(<CustomCursor />, document.body) : null}
      <Slice alias="header" size={isRootPath ? 'large' : 'medium'}>
        {title}
      </Slice>
      <main>{children}</main>
      <Slice alias="footer" />
    </As>
  );
};

export default Layout;
