import { useCallback, useEffect, useState } from 'react';

import { navigate } from 'gatsby';

import { isBrowser } from 'Libs/environment';
import * as ScrollManager from 'Libs/scroll';
import { CATEGORY_TYPE } from 'Types/enum';

import { useQueryParams } from './use-query-params';

const DEST_TOP = 114;

export const useCategory = () => {
  const [category, setCategory] = useState(CATEGORY_TYPE.ALL);
  const categoryQueryParams = useQueryParams({ key: 'category', type: 'string' });

  const selectCategory = useCallback((category: string) => {
    if (!isBrowser) return null;

    setCategory(category);
    ScrollManager.go(DEST_TOP);
    navigate(`?category=${category}`);
  }, []);

  const resetCategory = useCallback(() => {
    if (!isBrowser) return null;

    setCategory(CATEGORY_TYPE.ALL);
    navigate('/');
  }, []);

  const changeCategory = useCallback(
    (withScroll = true) => {
      const target = !categoryQueryParams ? CATEGORY_TYPE.ALL : categoryQueryParams;

      setCategory(target);
      if (withScroll) {
        ScrollManager.go(DEST_TOP);
      } else {
        ScrollManager.go(0);
      }
    },
    [categoryQueryParams]
  );

  useEffect(() => {
    ScrollManager.init();

    return () => {
      ScrollManager.destroy();
    };
  }, []);

  useEffect(() => {
    changeCategory(false);
  }, [changeCategory]);

  useEffect(() => {
    if (!isBrowser) return;

    window.addEventListener('popstate', changeCategory.bind(null, false));

    return () => {
      window.removeEventListener('popstate', changeCategory.bind(null, false));
    };
  }, [changeCategory]);

  return { category, selectCategory, resetCategory };
};
