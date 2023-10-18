import React, { FC } from 'react';

import { Link, SliceComponentProps, graphql, useStaticQuery } from 'gatsby';

import { Modal } from 'Apps/common/dialog';
import ContentSpacer from 'Apps/common/layout/components/content-spacer';
import { ROUTES } from 'Types/enum';

import ThemeToggle from '../theme-toggle';

const Nav: FC<SliceComponentProps<{}, { title: string }>> = ({ sliceContext }) => {
  // tags: allMarkdownRemark(sort: { frontmatter: { tags: ASC } }) {
  //   group(field: { frontmatter: { tags: SELECT } }) {
  //     fieldValue
  //     totalCount
  //   }
  // }

  const tags = useStaticQuery<Queries.NavQuery>(graphql`
    query Nav {
      tags: allMarkdownRemark(sort: { fields: frontmatter___tags, order: ASC }) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `).tags.group;

  const handleSearchKeyword = (keyword: string) => {
    window.open(
      `https://www.google.com/search?q=site:lazydev.gatsbyjs.io+${encodeURIComponent(keyword)}`,
      '_blank',
      'noopener noreferrer',
    );
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ContentSpacer as="nav" className="py-32pxr foldable:py-24pxr">
      <div className="mx-auto flex max-w-7xl items-center justify-between font-bold text-bg-inner">
        {/* <button onClick={() => handleSearchKeyword('javascript 객체 복사')}>search!</button> */}
        <button onClick={() => setIsOpen(true)}>search!</button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        <Link
          to={ROUTES.HOME}
          className="focus-primary m-0pxr rounded-sm text-32pxr foldable:text-24pxr"
          aria-label="Blog Home"
        >
          {sliceContext.title}
        </Link>
        <div className="flex items-center gap-16pxr">
          <Link
            to={ROUTES.ABOUT}
            className="focus-primary m-0pxr rounded-sm text-28pxr foldable:text-20pxr"
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
