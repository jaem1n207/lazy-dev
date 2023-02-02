import '@fontsource/fira-mono';

import './src/styles/global.css';
import 'prismjs/themes/prism-tomorrow.css';

const UPDATE_SCROLL_TIME_OUT = 1;

// TODO: navigate 확인, 스크롤 초기화되는 문제 확인, Link Component로 동작 확인(ref type error)

export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), 0);
  } else {
    const savedPosition = getSavedScrollPosition(location);
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), UPDATE_SCROLL_TIME_OUT);
  }
  return false;
};

// export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
//   if (location.action === 'PUSH') {
//     window.setTimeout(() => window.scrollTo(0, 0), 0);
//   } else {
//     const savedPosition = getSavedScrollPosition(location);
//     window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), UPDATE_SCROLL_TIME_OUT);
//   }
//   return false;
// };
