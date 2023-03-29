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

export const ELEMENT_CLASS = {
  NONE_ACTIVE: 'none-active',
};

const ELEMENT_PARTS = {
  details: 'details:not([disabled])',
  summary: 'summary:not([disabled])',
  anchor: 'a:not([disabled])',
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
  label: 'label:not([disabled])',
};

const ANIMATE_ELEMENT_PARTS = {
  details: `details:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  summary: `summary:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
  anchor: `a:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
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
  label: `label:not(.${ELEMENT_CLASS.NONE_ACTIVE}):not([disabled])`,
};

export const ELEMENT_SELECTOR = {
  CLICKABLE: Object.values(ELEMENT_PARTS).join(', '),
  ANIMATE: Object.values(ANIMATE_ELEMENT_PARTS).join(', '),
};
