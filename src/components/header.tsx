import React from 'react';

import { Link, graphql, useStaticQuery } from 'gatsby';

import { ROUTES } from 'Types/enum';

import { ContentSpacer } from './common';
import ThemeToggle from './theme-toggle';

const Header = () => {
  const data = useStaticQuery<Queries.HeaderQuery>(
    graphql`
      query Header {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  const title = data.site?.siteMetadata?.title || 'Title';

  return (
    <ContentSpacer as="header" className="py-48pxr foldable:py-24pxr">
      <div className="flex items-center justify-between mx-auto font-bold max-w-7xl text-bg-inner">
        <Link to={ROUTES.HOME} className="focus-primary m-0pxr text-40pxr foldable:text-32pxr">
          {title}
        </Link>
        <ThemeToggle />
      </div>
    </ContentSpacer>
  );
};

export default Header;
