import React, { memo, useCallback, useMemo } from 'react';

import tw from 'twin.macro';

import { ContentSpacer } from 'Components/common';
import { CATEGORY_TYPE } from 'Types/enum';

import CategoryItem from './category-item';

interface CategoryFilterProps {
  category: string;
  categories: Queries.HomeQuery['categoriesGroup']['group'];
  selectCategory: (category: string) => void;
  resetCategory: () => void;
}

const ACTIVE_ID = 'active';

const Nav = tw.nav`z-20 sticky top-0pxr mb-48pxr [button]:(block font-bold transition-colors rounded-lg py-8pxr px-16pxr text-16pxr hover:(text-text-secondary bg-primary) foldable:(!py-6pxr !px-12pxr !text-14pxr)) [button[data-ui=${ACTIVE_ID}]]:(text-text-secondary bg-primary)`;

const CategoryFilter = ({
  category,
  categories,
  selectCategory,
  resetCategory,
}: CategoryFilterProps) => {
  const categoryListRef = React.useRef<HTMLUListElement>(null);
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => b.totalCount - a.totalCount),
    [categories]
  );

  const scrollToCenter = useCallback(
    (tabRef: React.RefObject<HTMLButtonElement>) => {
      if (!tabRef.current) {
        return;
      }

      if (!categoryListRef.current) {
        return;
      }

      const { offsetWidth: tabWidth } = tabRef.current;
      const { scrollLeft, offsetWidth: containerWidth } = categoryListRef.current;
      const tabLeft = tabRef.current.getBoundingClientRect().left;
      const containerLeft = categoryListRef.current.getBoundingClientRect().left;
      const refineLeft = tabLeft - containerLeft;
      const targetScollX = scrollLeft + refineLeft - containerWidth / 2 + tabWidth / 2;

      categoryListRef.current.scroll({ left: targetScollX, top: 0, behavior: 'smooth' });
    },
    [categoryListRef]
  );

  return (
    <Nav>
      <ContentSpacer>
        <div className="flex items-center mx-auto rounded-lg border-border-primary border-1pxr bg-bg-secondary max-w-7xl px-24pxr py-12pxr foldable:py-8pxr foldable:px-16pxr">
          <CategoryItem
            title={CATEGORY_TYPE.ALL}
            selectedCategory={category}
            onClick={resetCategory}
            scrollToCenter={scrollToCenter}
            ACTIVE_ID={ACTIVE_ID}
          />
          <div className="w-1pxr h-32pxr mx-8pxr -translate-x-[50%] bg-bg-divider" />
          <ul
            ref={categoryListRef}
            className="flex w-full overflow-x-auto scroll-smooth gap-10pxr scrollbar-hide p-12pxr"
          >
            {sortedCategories.map((categoryInfo) => {
              const { fieldValue } = categoryInfo;

              return (
                <CategoryItem
                  key={fieldValue}
                  title={fieldValue || ''}
                  selectedCategory={category}
                  onClick={selectCategory}
                  scrollToCenter={scrollToCenter}
                  ACTIVE_ID={ACTIVE_ID}
                />
              );
            })}
          </ul>
        </div>
      </ContentSpacer>
    </Nav>
  );
};

export default memo(CategoryFilter);
