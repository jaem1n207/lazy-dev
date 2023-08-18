import React, { FC } from 'react';

import { Link, SliceComponentProps } from 'gatsby';

import { ROUTES } from 'Types/enum';

import { ContentSpacer } from '../common';
import ThemeToggle from '../theme-toggle';

const Nav: FC<SliceComponentProps<{}, { title: string }>> = ({ sliceContext }) => {
  return (
    <ContentSpacer as="nav" className="py-32pxr foldable:py-24pxr">
      <div className="flex items-center justify-between mx-auto font-bold max-w-7xl text-bg-inner">
        <Link
          to={ROUTES.HOME}
          className="focus-primary m-0pxr text-40pxr foldable:text-32pxr"
          aria-label="Blog Home"
        >
          {sliceContext.title}
        </Link>
        <div className="flex items-center gap-16pxr">
          <ThemeToggle />
        </div>
      </div>
    </ContentSpacer>
  );
};

export default Nav;
