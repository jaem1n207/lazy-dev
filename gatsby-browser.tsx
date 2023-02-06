import '@fontsource/fira-mono';

import './src/styles/global.css';
import 'prismjs/themes/prism-tomorrow.css';

const UPDATE_SCROLL_TIME_OUT = 1;

export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  const isRootPath = location.pathname === '/';

  if (!isRootPath && location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), 0);
  } else if (isRootPath && location.action == null) {
    const savedPosition = getSavedScrollPosition(location);
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), UPDATE_SCROLL_TIME_OUT);
  }
  return false;
};
