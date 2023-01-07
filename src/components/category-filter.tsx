import React, { memo, useMemo } from 'react';

import { Link, GatsbyLinkProps } from 'gatsby';

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
          className: `${LINK_BASE_CLASS} text-white bg-primary`,
        }
      : {
          className: `${LINK_BASE_CLASS} hover:text-white hover:bg-primary`,
        };

  React.useLayoutEffect(() => {
    const categoryList = categoryListRef.current;

    if (categoryList) {
      const categoryListWidth = categoryList.scrollWidth;
      const categoryListParentWidth = categoryList.parentElement!.clientWidth;

      if (categoryListWidth > categoryListParentWidth) {
        categoryList.style.width = `${categoryListWidth}px`;
      }
    }
  }, [categoryListRef]);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => b.totalCount - a.totalCount),
    [categories]
  );

  return (
    <nav className="flex items-center rounded-lg bg-code-block mb-48pxr py-12pxr px-24pxr">
      <Link to="/" getProps={isActive}>
        All
      </Link>
      <div className="w-1pxr h-32pxr mx-8pxr -translate-x-[50%] bg-divider" />
      <ul ref={categoryListRef} className="flex overflow-x-scroll gap-8pxr">
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