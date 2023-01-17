import React, { useCallback, useEffect } from 'react';

import { firstLetterUppercase } from 'Libs/string';
import { CATEGORY_TYPE } from 'Types/enum';

interface CategoryItemProps {
  title: string;
  selectedCategory: string;
  onClick: (category: string) => void;
  scrollToCenter: (tabRef: React.RefObject<HTMLButtonElement>) => void;
  ACTIVE_ID: string;
}

const CategoryItem = ({
  title,
  selectedCategory,
  onClick,
  scrollToCenter,
  ACTIVE_ID,
}: CategoryItemProps) => {
  const tabRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    onClick(title);
    scrollToCenter(tabRef);
  }, [onClick, scrollToCenter, title]);

  useEffect(() => {
    if (selectedCategory === title) {
      scrollToCenter(tabRef);
    }
  }, [scrollToCenter, selectedCategory, title]);

  if (title === CATEGORY_TYPE.ALL) {
    return (
      <button
        onClick={handleClick}
        data-ui={selectedCategory === title ? ACTIVE_ID : undefined}
        tabIndex={selectedCategory === title ? -1 : undefined}
      >
        {firstLetterUppercase(title)}
      </button>
    );
  }

  return (
    <li className="mb-0pxr">
      <button
        ref={tabRef}
        data-ui={selectedCategory === title ? ACTIVE_ID : undefined}
        tabIndex={selectedCategory === title ? -1 : undefined}
        onClick={handleClick}
      >
        {firstLetterUppercase(title)}
      </button>
    </li>
  );
};

export default CategoryItem;
