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
  const tabRef = React.useRef<HTMLButtonElement | null>(null);

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
        data-ui={selectedCategory === title ? ACTIVE_ID : undefined}
        tabIndex={selectedCategory === title ? -1 : undefined}
        onClick={handleClick}
      >
        {firstLetterUppercase(title)}
      </button>
      // <Link
      //   to={`?category=${title}`}
      //   data-ui={selectedCategory === title ? ACTIVE_ID : undefined}
      //   tabIndex={selectedCategory === title ? -1 : undefined}
      //   className="text-gray-500 hover:text-gray-900"
      //   onClick={handleClick}
      // >
      //   {firstLetterUppercase(title)}
      // </Link>
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
      {/* <Link
        ref={tabRef}
        to={`?category=${title}`}
        data-ui={selectedCategory === title ? ACTIVE_ID : undefined}
        tabIndex={selectedCategory === title ? -1 : undefined}
        className="text-gray-500 hover:text-gray-900"
        onClick={handleClick}
      >
        {firstLetterUppercase(title)}
      </Link> */}
    </li>
  );
};

export default CategoryItem;
