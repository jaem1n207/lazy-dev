export const ROUTES = {
  HOME: "/",
  BLOG_POST: {
    toUrl: (slug: string) => slug,
  },
  TAG: {
    toUrl: (tag: string) => `${ROUTES.HOME}tags/${tag}`,
  },
  ABOUT: "/about",
};
