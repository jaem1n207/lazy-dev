import * as React from 'react';

import { Global } from '@emotion/react';
import { Link } from 'gatsby';
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

  const renderHeader = () => {
    let header;

    if (isRootPath) {
      header = (
        <h1 css={tw`font-bold text-36pxr`}>
          <Link to="/">{title}</Link>
        </h1>
      );
    } else {
      header = (
        <h3 css={tw`text-24pxr`}>
          <Link to="/">{title}</Link>
        </h3>
      );
    }

    return <header css={tw`bg-amber-400`}>{header}</header>;
  };

  return (
    <div css={tw`max-w-2xl mx-auto py-40pxr px-20pxr`} data-is-root-path={isRootPath}>
      <BaseStyles />
      <Global styles={customStyles} />
      {renderHeader()}
      <main>{children}</main>
      <footer>
        @ {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://github.com/jaem1n207/lazy-dev">Lazy Dev</a>
      </footer>
    </div>
  );
};

export default Layout;
