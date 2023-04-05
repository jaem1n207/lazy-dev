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
    <meta
      key="google-search-console-verification"
      name="google-site-verification"
      content={process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION_CONTENT}
    />,
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
        __html: `(function() {
        function setTheme(theme) {
          window.__theme = theme;
          if (theme === 'dark') {
            document.documentElement.className = 'dark';
          } else {
            document.documentElement.className = '';
          }
        };
        window.__setPreferredTheme = function(theme) {
          setTheme(theme);
          try {
            localStorage.setItem('color-theme', theme);
          } catch (e) {}
        };
        let preferredTheme;
        try {
          preferredTheme = localStorage.getItem('color-theme');
        } catch (e) {}
        let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
      })();`,
      }}
    />,
  ]);
};
