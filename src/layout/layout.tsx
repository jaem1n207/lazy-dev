import * as React from 'react';

import { Global } from '@emotion/react';
import { Link, withPrefix } from 'gatsby';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import customStyles from 'Styles/globalStyles';

interface LayoutProps {
  children: React.ReactNode;
  location: Location;
  title: string;
}

const Layout = ({ children, location, title }: LayoutProps) => {
  const renderHeader = () => {
    const isHomepage = location?.pathname === withPrefix('/');
    console.log('🚀 ~ file: layout.tsx ~ line 19 ~ renderHeader ~ isHomepage', isHomepage);
    let header;

    if (isHomepage) {
      header = (
        <h1 css={`text-3xl font-bold`}>
          <Link to="/">{title}</Link>
        </h1>
      );
    } else {
      header = (
        <h3 css={`text-3xl font-bold`}>
          <Link to="/">{title}</Link>
        </h3>
      );
    }

    return <header>{header}</header>;
  };

  return (
    <div css={tw`max-w-2xl mx-auto py-40pxr px-20pxr`}>
      <BaseStyles />
      <Global styles={customStyles} />
      {renderHeader()}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
