import '@fontsource/fira-mono';

import './src/styles/global.css';
import 'prismjs/themes/prism-tomorrow.css';

export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), 0);
  } else {
    const savedPosition = getSavedScrollPosition(location);
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), 0);
  }
  return false;
};
