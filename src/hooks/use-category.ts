import { useCallback, useEffect, useState } from 'react';

import { window } from 'browser-monads-ts';
import { navigate } from 'gatsby';
import queryString from 'query-string';

import * as ScrollManager from 'Libs/scroll';
import { CATEGORY_TYPE, ROUTES } from 'Types/enum';

const DEST_TOP = 114;

export const useCategory = () => {
  const [category, setCategory] = useState(CATEGORY_TYPE.ALL);

  const selectCategory = useCallback((category: string) => {
    setCategory(category);
    ScrollManager.go(DEST_TOP);
    navigate(ROUTES.BLOG_CATEGORY.toUrl(category));
  }, []);

  const resetCategory = useCallback(() => {
    setCategory(CATEGORY_TYPE.ALL);
    ScrollManager.go(DEST_TOP);
    navigate(ROUTES.HOME);
  }, []);

  const changeCategory = useCallback((withScroll = true) => {
    const { category } = queryString.parse(location.search);
    const target = category == null ? CATEGORY_TYPE.ALL : category;
    if (target == null || Array.isArray(target)) return;

    setCategory(target);

    if (withScroll) {
      ScrollManager.go(DEST_TOP);
    }
  }, []);

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
    window.addEventListener('popstate', changeCategory.bind(null, false));

    return () => {
      window.removeEventListener('popstate', changeCategory.bind(null, false));
    };
  }, [changeCategory]);

  return { category, selectCategory, resetCategory };
};
