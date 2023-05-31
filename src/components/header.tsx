import React, { ReactNode } from 'react';

import { Link } from 'gatsby';
import tw from 'twin.macro';

import { ROUTES } from 'Types/enum';

import { ContentSpacer } from './common';
import ThemeToggle from './theme-toggle';

interface Props {
  children: ReactNode;
  size?: 'medium' | 'large';
}

const Header = ({ children, size = 'medium' }: Props) => {
  let header = (
    <Link css={tw`no-underline text-24pxr`} to={ROUTES.HOME} className="focus-primary">
      {children}
    </Link>
  );

  if (size === 'large') {
    header = (
      <Link to={ROUTES.HOME} className="focus-primary m-0pxr text-40pxr foldable:text-32pxr">
        {children}
      </Link>
    );
  }

  return (
    <ContentSpacer as="header" className="py-48pxr foldable:py-24pxr">
      <div className="flex items-center justify-between mx-auto font-bold max-w-7xl text-bg-inner">
        {header}
        <ThemeToggle />
      </div>
    </ContentSpacer>
  );
};

export default Header;
