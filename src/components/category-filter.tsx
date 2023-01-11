import React, { memo, useMemo } from 'react';

import { Link, GatsbyLinkProps } from 'gatsby';
import tw from 'twin.macro';

import useScrollCenter from 'Hooks/use-scroll-center';
import { firstLetterUppercase, kebabCase } from 'Libs/string';

interface CategoryFilterProps {
  categories: Queries.HomeQuery['allMarkdownRemark']['group'];
}

type LinkPropsGetter = GatsbyLinkProps<unknown>['getProps'];

const ACTIVE_ID = 'active';

const Nav = tw.nav`z-20 sticky top-0pxr flex items-center rounded-lg bg-secondary mb-48pxr py-12pxr px-24pxr [a]:(block font-bold transition-colors rounded-lg py-8pxr px-16pxr text-14pxr hover:(text-background bg-primary)) [a[data-ui=${ACTIVE_ID}]]:(text-background bg-primary)`;

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const categoryListRef = React.useRef<HTMLUListElement>(null);
  const linkProps: LinkPropsGetter = ({ isCurrent }) => {
    return isCurrent
      ? {
          'data-ui': ACTIVE_ID,
          tabIndex: -1,
        }
      : {};
  };

  useScrollCenter({ ref: categoryListRef, targetId: ACTIVE_ID });

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => b.totalCount - a.totalCount),
    [categories]
  );

  return (
    <Nav>
      <Link to="/" getProps={linkProps}>
        All
      </Link>
      <div className="w-1pxr h-32pxr mx-8pxr -translate-x-[50%] bg-divider" />
      <ul
        ref={categoryListRef}
        className="flex overflow-x-scroll scroll-smooth gap-8pxr scrollbar-hide"
      >
        {sortedCategories.map((category) => {
          const { fieldValue } = category;

          return (
            <li key={fieldValue} className="mb-0pxr">
              <Link getProps={linkProps} to={`/category/${kebabCase(fieldValue!)}`}>
                {firstLetterUppercase(fieldValue!)}
              </Link>
            </li>
          );
        })}
      </ul>
    </Nav>
  );
};

export default memo(CategoryFilter);
