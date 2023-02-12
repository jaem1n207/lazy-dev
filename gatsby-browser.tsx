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

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` + `Reload to display the latest version?`
  );

  if (answer === true) {
    window.location.reload();
  }
};

export const onRouteUpdate = () => {
  const blogList = document.getElementById('post-list');

  if (blogList) {
    blogList.style.visibility = 'hidden';
    blogList.style.opacity = '0';
  }

  window.setTimeout(() => {
    if (blogList) {
      blogList.style.visibility = 'visible';
      blogList.style.opacity = '1';
      blogList.style.transition = 'opacity 0.2s ease-in-out';
    }
  }, 200);
};
