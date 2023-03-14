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

export const ELEMENT_SELECTOR = {
  CLICKABLE:
    'details, summary, a, input[type="submit"], input[type="image"], label[for], select, button:not([disabled]), .link, input[type="text"], input[type="checkbox"]:not([disabled]), input[type="radio"]:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
};
