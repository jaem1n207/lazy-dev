import * as React from 'react';

import { Slice } from 'gatsby';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

interface LayoutProps {
  children: React.ReactNode;
  location: Location;
  title: Queries.Maybe<string>;
  as?: React.ElementType;
}

const Layout = ({ children, location, title, as = 'div' }: LayoutProps) => {
  // @ts-ignore
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const As = as;

  return (
    <As css={[tw`max-w-2xl mx-auto my-0pxr py-40pxr px-20pxr`, isRootPath && tw`mb-80pxr`]}>
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
