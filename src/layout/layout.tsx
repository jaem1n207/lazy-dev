import React, { ElementType, ReactNode, useEffect } from 'react';

import { Slice } from 'gatsby';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import CustomCursor from 'Components/custom-cursor';

interface LayoutProps {
  children: ReactNode;
  location: Location;
  title: Queries.Maybe<string>;
  as?: ElementType;
}

const Layout = ({ children, location, title, as = 'div' }: LayoutProps) => {
  const isRootPath = location.pathname === '/';

  const As = as;

  useEffect(() => {
    const body = document.body;
    const className =
      'min-h-screen antialiased tracking-tight transition duration-500 text-text bg-background font-noto-sans-kr';

    body.classList.add(...className.split(' '));

    return () => {
      body.classList.remove(...className.split(' '));
    };
  }, []);

  return (
    <As css={[isRootPath && tw`mb-80pxr`]}>
      <BaseStyles />
      <CustomCursor />
      <Slice alias="header" size={isRootPath ? 'large' : 'medium'}>
        {title}
      </Slice>
      <main>{children}</main>
      <Slice alias="footer" />
    </As>
  );
};

export default Layout;
