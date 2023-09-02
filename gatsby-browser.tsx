import '@fontsource/fira-mono';

import './src/styles/global.css';
import 'prismjs/themes/prism-tomorrow.css';

import React from 'react';

import type { GatsbyBrowser } from 'gatsby';

import Layout from './src/layout/layout';
import Root from './src/root';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return (
    <Root>
      <Layout>{element}</Layout>
    </Root>
  );
};

// export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
//   const isTouchDevice =
//     'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0;

//   const hasMouseCapabilities = 'MouseEvent' in window;

//   // 터치스크린 노트북과 같이 터치 입력과 비터치 입력을 모두 지원하는 장치에 대한 처리
//   if (isTouchDevice || !hasMouseCapabilities) {
//     document.documentElement.classList.remove('hide-cursor');
//   } else {
//     document.documentElement.classList.add('hide-cursor');
//   }
// };

export const onServiceWorkerUpdateReady: GatsbyBrowser['onServiceWorkerUpdateReady'] = () => {
  const answer = window.confirm(
    `새로운 버전이 있어요. ` + `다시 로드하여 새로워진 블로그를 만나보세요`,
  );

  if (answer === true) {
    window.location.reload();
  }
};
