import React, { memo, useMemo } from 'react';

import { GatsbyLinkProps } from 'gatsby';
import tw from 'twin.macro';

import useScrollCenter from 'Hooks/use-scroll-center';
import { firstLetterUppercase, kebabCase } from 'Libs/string';
import { CATEGORY_TYPE } from 'Types/enum';

interface CategoryFilterProps {
  categories: Queries.HomeQuery['allMarkdownRemark']['group'];
  selectCategory: (category: string) => void;
  resetCategory: () => void;
}

type LinkPropsGetter = GatsbyLinkProps<unknown>['getProps'];

const ACTIVE_ID = 'active';

const Nav = tw.nav`z-20 sticky top-0pxr flex items-center rounded-lg bg-secondary mb-48pxr py-12pxr px-24pxr [button]:(block font-bold transition-colors rounded-lg py-8pxr px-16pxr text-14pxr hover:(text-background bg-primary)) [button[data-ui=${ACTIVE_ID}]]:(text-background bg-primary)`;

const CategoryFilter = ({ categories, selectCategory, resetCategory }: CategoryFilterProps) => {
  const categoryListRef = React.useRef<HTMLUListElement>(null);

  const linkProps: LinkPropsGetter = ({ location, href }) => {
    const category = new URLSearchParams(location.search).get('category');
    const activeCategory = href.split('?category=')[1];
    const isCategoryActive = category === activeCategory;
    const isAll = !category && !activeCategory;

    return (isCategoryActive || isAll ? ACTIVE_ID : undefined)
      ? {
          'data-ui': ACTIVE_ID,
          tabIndex: -1,
        }
      : {};
  };

  useScrollCenter({ listRef: categoryListRef, targetId: ACTIVE_ID });

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => b.totalCount - a.totalCount),
    [categories]
  );

  return (
    <Nav>
      <button onClick={resetCategory}>{CATEGORY_TYPE.ALL}</button>
      <div className="w-1pxr h-32pxr mx-8pxr -translate-x-[50%] bg-divider" />
      <ul
        ref={categoryListRef}
        className="flex overflow-x-auto scroll-smooth gap-8pxr scrollbar-hide"
      >
        {sortedCategories.map((category) => {
          const { fieldValue } = category;

          return (
            <li key={fieldValue} className="mb-0pxr">
              <button onClick={selectCategory.bind(null, kebabCase(fieldValue!))}>
                {firstLetterUppercase(fieldValue!)}
              </button>
            </li>
          );
        })}
      </ul>
    </Nav>
  );
};

export default memo(CategoryFilter);
