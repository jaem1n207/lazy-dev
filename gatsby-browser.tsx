import '@fontsource/fira-mono';

import './src/styles/global.css';
import 'prismjs/themes/prism-tomorrow.css';

import type { GatsbyBrowser } from 'gatsby';

export { wrapPageElement } from './gatsby-shared';

export const onServiceWorkerUpdateReady: GatsbyBrowser['onServiceWorkerUpdateReady'] = () => {
  const answer = window.confirm(
    `새로운 버전이 있어요. ` + `다시 로드하여 새로워진 블로그를 만나보세요`,
  );

  if (answer === true) {
    window.location.reload();
  }
};
