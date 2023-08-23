import React, { FC } from 'react';

import { Link, SliceComponentProps } from 'gatsby';

import ContentSpacer from 'Apps/common/layout/components/content-spacer';
import { ROUTES } from 'Types/enum';

import ThemeToggle from '../theme-toggle';

const Nav: FC<SliceComponentProps<{}, { title: string }>> = ({ sliceContext }) => {
  return (
    <ContentSpacer as="nav" className="py-32pxr foldable:py-24pxr">
      <div className="flex items-center justify-between mx-auto font-bold max-w-7xl text-bg-inner">
        <Link
          to={ROUTES.HOME}
          className="rounded-sm focus-primary m-0pxr text-32pxr foldable:text-24pxr"
          aria-label="Blog Home"
        >
          {sliceContext.title}
        </Link>
        <div className="flex items-center gap-16pxr">
          <Link
            to={ROUTES.ABOUT}
            className="rounded-sm focus-primary m-0pxr text-28pxr foldable:text-20pxr"
            aria-label="About"
          >
            About
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </ContentSpacer>
  );
};

export default Nav;
