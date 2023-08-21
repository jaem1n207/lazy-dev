export const CATEGORY_TYPE = {
  ALL: 'All',
};

export const QUERY_PARAM = {
  KEYWORDS: 's',
};

export const ROUTES = {
  HOME: '/',
  BLOG_POST: {
    toUrl: (slug: string) => slug,
  },
  BLOG_CATEGORY: {
    toUrl: (category: string) => `${ROUTES.HOME}?category=${category}`,
  },
  PORTFOLIO: '/portfolio',
};

export const ELEMENT_CLASS = {
  NONE_ACTIVE: 'none-active',
  CLICKABLE_ELEMENT: 'clickable-element',
  MOVING_ELEMENT: 'moving-element',
};

const ELEMENT_PARTS = {
  details: 'details:not([disabled])',
  summary: 'summary:not([disabled])',
  anchor: 'a:not([disabled])',
  search: 'input[type="search"]:not([disabled])',
  submit: 'input[type="submit"]:not([disabled])',
  image: 'input[type="image"]:not([disabled])',
  select: 'select:not([disabled])',
  button: 'button:not([disabled])',
  link: '.link:not([disabled])',
  text: 'input[type="text"]:not([disabled])',
  checkbox: 'input[type="checkbox"]:not([disabled])',
  radio: 'input[type="radio"]:not([disabled])',
  textarea: 'textarea:not([disabled])',
  tabindex: '[tabindex]:not([tabindex="-1"]):not([disabled])',
  label: `label:not([data-state='unchecked']):not([disabled])`,
};

const MOVING_ELEMENT_PARTS = {
  details: `details:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  summary: `summary:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  anchor: `a:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  search: `input[type="search"]:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  submit: `input[type="submit"]:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  image: `input[type="image"]:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  select: `select:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  button: `button:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  link: `.link:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  text: `input[type="text"]:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  checkbox: `input[type="checkbox"]:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  radio: `input[type="radio"]:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  textarea: `textarea:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  tabindex: `[tabindex]:not([tabindex="-1"]):not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  label: `label:not([data-state='unchecked']):not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  heroSection: 'article.hero-section',
};

export const ELEMENT_SELECTOR = {
  CLICKABLE: Object.values(ELEMENT_PARTS).join(', '),
  MOVING: Object.values(MOVING_ELEMENT_PARTS).join(', '),
};
