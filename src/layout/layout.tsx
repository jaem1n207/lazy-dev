import React, { ElementType, ReactNode, useEffect } from 'react';

import { Slice } from 'gatsby';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

interface LayoutProps {
  children: ReactNode;
  location: Location;
  title: Queries.Maybe<string>;
  as?: ElementType;
}

const Layout = ({ children, location, title, as = 'div' }: LayoutProps) => {
  const As = as;

  const isRootPath = location.pathname === '/';

  useEffect(() => {
    const body = document.body;

    const classes = [
      'min-h-screen',
      'antialiased',
      'tracking-tight',
      'transition',
      'duration-500',
      'text-text-primary',
      'bg-bg-primary',
      'font-noto-sans-kr',
    ];

    body.classList.add(...classes);

    return () => {
      body.classList.remove(...classes);
    };
  }, []);

  return (
    <As css={[isRootPath && tw`pb-80pxr`]}>
      <BaseStyles />
      <Slice alias="header" size={isRootPath ? 'large' : 'medium'}>
        {title}
      </Slice>
      <main>{children}</main>
      <Slice alias="footer" />
    </As>
  );
};

export default Layout;
