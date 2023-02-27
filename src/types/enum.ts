export const CATEGORY_TYPE = {
  ALL: 'All',
};

export const ROUTES = {
  HOME: '/',
  BLOG_POST: {
    toUrl: (slug: string) => slug,
  },
  BLOG_CATEGORY: {
    toUrl: (category: string) => `${ROUTES.HOME}?category=${category}`,
  },
};
