import * as React from 'react';

import { Global } from '@emotion/react';
import { Slice } from 'gatsby';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import customStyles from 'Styles/globalStyles';

interface LayoutProps {
  children: React.ReactNode;
  location: Location;
  title: Queries.Maybe<string>;
}

const Layout = ({ children, location, title }: LayoutProps) => {
  // @ts-ignore
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div css={[tw`max-w-2xl mx-auto my-0pxr py-40pxr px-20pxr`, isRootPath && tw`mb-80pxr`]}>
      <BaseStyles />
      <Global styles={customStyles} />
      <Slice alias="header" size={isRootPath ? 'large' : 'medium'}>
        {title}
      </Slice>
      <main>{children}</main>
      <Slice alias="footer" />
    </div>
  );
};

export default Layout;
