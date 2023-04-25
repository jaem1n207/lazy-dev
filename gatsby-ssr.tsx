import React from 'react';

import type { GatsbySSR } from 'gatsby';

import { wrapPageElement as wrap } from './gatsby-browser';

/**
 * Gatsby의 서버 측 렌더링(SSR)은 window 또는 document 개체에 액세스할 수 없으므로
 * 클라이언트 측에서만 custom-cursor 로직을 조건부로 적용
 */
export const wrapPageElement: GatsbySSR['wrapPageElement'] = wrap;

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({
    lang: 'en',
  });
  setHeadComponents([
    <link
      key="preconnect-google-fonts"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="preload-notosanskr-regular"
      rel="preload"
      as="font"
      type="font/woff2"
      href="/fonts/NotoSansKr-Regular.woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="preload-notosanskr-bold"
      rel="preload"
      as="font"
      type="font/woff2"
      href="/fonts/NotoSansKr-Bold.woff2"
      crossOrigin="anonymous"
    />,
    <style key="local-fonts" type="text/css">
      {`
      @font-face {
        font-family: 'Noto Sans KR';
        font-weight: 400;
        src: url('/fonts/NotoSansKr-Regular.woff2') format('woff2');
        font-display: swap;
      }
      @font-face {
        font-family: 'Noto Sans KR';
        font-weight: 700;
        src: url('/fonts/NotoSansKr-Bold.woff2') format('woff2');
        font-display: swap;
      }
    `}
    </style>,
    <script
      key="darkmode"
      dangerouslySetInnerHTML={{
        /**
         * IIFE 내부에 논리를 추가하여 전역 범위를 오염시키지 않고
         * localStorage에 데이터 설정과 검색을 동일한
         * try-catch 블록 내에서 처리하여 오류 처리를 단순화
         */
        __html: `(function() {
          function setTheme(theme) {
            window.__theme = theme;
            if (theme === 'dark') {
              document.documentElement.className = 'dark';
            } else if (theme === 'light') {
              document.documentElement.className = '';
            } else {
              document.documentElement.className = darkQuery.matches ? 'dark' : '';
            }
          };
          window.__setPreferredTheme = function(theme) {
            try {
              localStorage.setItem('color-theme', theme);
              setTheme(theme);
            } catch (e) {}
          };
          let preferredTheme;
          try {
            preferredTheme = localStorage.getItem('color-theme');
            let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkQuery.addEventListener('change', function (e) {
              if (preferredTheme === 'auto') {
                setTheme(e.matches ? 'dark' : 'light');
              }
            });
            setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
          } catch (e) {}
        })();`,
      }}
    />,
  ]);
};
