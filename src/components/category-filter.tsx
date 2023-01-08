import React, { memo, useMemo } from 'react';

import { Link, GatsbyLinkProps } from 'gatsby';

import useScrollCenter from 'Hooks/use-scroll-center';
import { firstLetterUppercase, kebabCase } from 'Libs/string';

interface CategoryFilterProps {
  categories: Queries.HomeQuery['allMarkdownRemark']['group'];
}

type LinkPropsGetter = GatsbyLinkProps<unknown>['getProps'];

const ACTIVE_ID = 'active';
const LINK_BASE_CLASS =
  'block font-semibold transition-colors rounded-lg py-8pxr px-16pxr text-14pxr';

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const categoryListRef = React.useRef<HTMLUListElement>(null);
  const isActive: LinkPropsGetter = ({ isCurrent }) =>
    isCurrent
      ? {
          'data-ui': ACTIVE_ID,
          tabIndex: -1,
          className: `${LINK_BASE_CLASS} text-background bg-primary`,
        }
      : {
          className: `${LINK_BASE_CLASS} hover:text-background hover:bg-primary`,
        };

  useScrollCenter({ ref: categoryListRef, targetId: ACTIVE_ID });

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => b.totalCount - a.totalCount),
    [categories]
  );

  return (
    <nav className="flex items-center rounded-lg bg-secondary mb-48pxr py-12pxr px-24pxr">
      <Link to="/" getProps={isActive}>
        All
      </Link>
      <div className="w-1pxr h-32pxr mx-8pxr -translate-x-[50%] bg-divider" />
      <ul ref={categoryListRef} className="flex overflow-x-scroll gap-8pxr scrollbar-hide">
        {sortedCategories.map((category) => {
          const { fieldValue } = category;

          return (
            <li key={fieldValue} className="mb-0pxr">
              <Link getProps={isActive} to={`/category/${kebabCase(fieldValue!)}`}>
                {firstLetterUppercase(fieldValue!)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default memo(CategoryFilter);
