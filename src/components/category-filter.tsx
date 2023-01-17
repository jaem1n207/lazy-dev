import React, { memo, useEffect, useMemo } from 'react';

import tw from 'twin.macro';

import { useCategory } from 'Hooks/use-category';
import useScrollCenter from 'Hooks/use-scroll-center';
import { firstLetterUppercase, kebabCase } from 'Libs/string';
import { CATEGORY_TYPE } from 'Types/enum';

interface CategoryFilterProps {
  categories: Queries.HomeQuery['allMarkdownRemark']['group'];
  selectCategory: (category: string) => void;
  resetCategory: () => void;
}

const ACTIVE_ID = 'active';

const Nav = tw.nav`z-20 sticky top-0pxr flex items-center rounded-lg bg-secondary mb-48pxr py-12pxr px-24pxr [button]:(block font-bold transition-colors rounded-lg py-8pxr px-16pxr text-14pxr hover:(text-background bg-primary)) [button[data-ui=${ACTIVE_ID}]]:(text-background bg-primary)`;

const CategoryFilter = ({ categories, selectCategory, resetCategory }: CategoryFilterProps) => {
  const categoryListRef = React.useRef<HTMLUListElement>(null);

  const { category } = useCategory();

  const isAll = category === CATEGORY_TYPE.ALL;

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => b.totalCount - a.totalCount),
    [categories]
  );

  useScrollCenter({ listRef: categoryListRef, targetId: ACTIVE_ID });

  useEffect(() => {
    const activeCategory = sortedCategories.find((categoryInfo) => {
      const { fieldValue } = categoryInfo;

      return fieldValue === category;
    });

    if (activeCategory?.fieldValue === category) {
      console.log('scroll center');
      // selectCategory(category);
    }
  }, [category, selectCategory, sortedCategories]);

  return (
    <Nav>
      <button
        onClick={resetCategory}
        data-ui={isAll ? ACTIVE_ID : undefined}
        tabIndex={isAll ? -1 : undefined}
      >
        {CATEGORY_TYPE.ALL}
      </button>
      <div className="w-1pxr h-32pxr mx-8pxr -translate-x-[50%] bg-divider" />
      <ul
        ref={categoryListRef}
        className="flex overflow-x-auto scroll-smooth gap-8pxr scrollbar-hide"
      >
        {sortedCategories.map((categoryInfo) => {
          const { fieldValue } = categoryInfo;

          return (
            <li key={fieldValue} className="mb-0pxr">
              <button
                onClick={selectCategory.bind(null, kebabCase(fieldValue!))}
                data-ui={category === fieldValue ? ACTIVE_ID : undefined}
                tabIndex={category === fieldValue ? -1 : undefined}
              >
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
