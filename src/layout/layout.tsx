import React, { ElementType, ReactNode, useEffect } from 'react';

import { Slice } from 'gatsby';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

import CustomCursor from 'Components/CustomCursor';
import { useHover } from 'Hooks/use-hover';

interface LayoutProps {
  children: ReactNode;
  location: Location;
  title: Queries.Maybe<string>;
  as?: ElementType;
}

const Layout = ({ children, location, title, as = 'div' }: LayoutProps) => {
  // @ts-ignore
  // eslint-disable-next-line no-undef
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const As = as;

  const { ref: cursorRef, isHovered: isCursorHovered } = useHover();

  useEffect(() => {
    const clickableElements = document.querySelectorAll('ul, a, button, input');
    clickableElements.forEach((element) => {
      console.log(element);
      element.classList.add('circle-active');
    });

    return () => {
      clickableElements.forEach((element) => {
        element.classList.remove('circle-active');
      });
    };
  });

  return (
    <>
      <As css={[tw`max-w-2xl mx-auto my-0pxr py-40pxr px-20pxr`, isRootPath && tw`mb-80pxr`]}>
        <CustomCursor active={isCursorHovered} />
        <div ref={cursorRef}>
          <BaseStyles />
          {/* <CursorFollower /> */}
          <Slice alias="header" size={isRootPath ? 'large' : 'medium'}>
            {title}
          </Slice>
          <main>{children}</main>
          <Slice alias="footer" />
        </div>
      </As>
    </>
  );
};

export default Layout;
