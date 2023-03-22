import React, { ElementType, ReactNode, useEffect, useState } from 'react';

import { Slice } from 'gatsby';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import CustomCursor from 'Components/custom-cursor';
import { isTouchDevice } from 'Libs/device';

interface LayoutProps {
  children: ReactNode;
  location: Location;
  title: Queries.Maybe<string>;
  as?: ElementType;
}

const Layout = ({ children, location, title, as = 'div' }: LayoutProps) => {
  const [shouldRenderCustomCursor, setShouldRenderCustomCursor] = useState(false);

  // @ts-ignore
  // eslint-disable-next-line no-undef
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const As = as;

  useEffect(() => {
    const isNonTouchDevice = !isTouchDevice();

    const body = document.body;
    const className =
      'min-h-screen antialiased tracking-tight transition duration-500 text-text bg-background font-noto-sans-kr cursor-none';

    if (isNonTouchDevice) {
      body.classList.add('hide-cursor');
    } else {
      body.classList.remove('hide-cursor');
    }

    body.classList.add(...className.split(' '));

    setShouldRenderCustomCursor(isNonTouchDevice);

    return () => {
      body.classList.remove(...className.split(' '));
    };
  }, []);

  return (
    <As css={[isRootPath && tw`mb-80pxr`]}>
      <BaseStyles />
      <CustomCursor shouldRender={shouldRenderCustomCursor} />
      <Slice alias="header" size={isRootPath ? 'large' : 'medium'}>
        {title}
      </Slice>
      <main>{children}</main>
      <Slice alias="footer" />
    </As>
  );
};

export default Layout;
