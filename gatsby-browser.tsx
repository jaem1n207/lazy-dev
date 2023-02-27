import '@fontsource/fira-mono';

import './src/styles/global.css';
import 'prismjs/themes/prism-tomorrow.css';

const UPDATE_SCROLL_TIME_OUT = 1;

export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  const isRootPath = location.pathname === '/';

  if (!isRootPath && location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), 0);
  } else if (isRootPath && location.action == null) {
    // 브라우저의 앞/뒤 버튼을 사용한 경우
    const savedPosition = getSavedScrollPosition(location) || [0, 0];
    window.setTimeout(() => window.scrollTo(...savedPosition), UPDATE_SCROLL_TIME_OUT);
  }
  return false;
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `새로운 버전이 있어요. ` + `다시 로드하여 새로워진 블로그를 만나보세요`
  );

  if (answer === true) {
    window.location.reload();
  }
};
