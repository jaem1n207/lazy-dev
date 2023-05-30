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
  setBodyAttributes,
  setPreBodyComponents,
}) => {
  setBodyAttributes({
    className: 'min-h-screen antialiased tracking-tight text-text-primary bg-bg-primary transition',
  });
  setHtmlAttributes({
    lang: 'en',
  });
  setHeadComponents([
    <style key="local-fonts" type="text/css">
      {`
        body {
          font-family: Noto Sans KR, -apple-system, ui-sans-serif, system-ui;
        }
      `}
    </style>,
  ]);
  setPreBodyComponents([
    <script
      key="code-to-run-on-client"
      dangerouslySetInnerHTML={{
        /**
         * IIFE를 사용해 전역 범위를 오염시키지 않고
         * 혹시 모를 브라우저 지원을 위해 let, const, 화살표 함수를 사용하지 않음
         */
        __html: `
          (function () {
            function setTheme(newTheme) {
              window.__theme = newTheme;
              if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
              } else if (newTheme === 'light') {
                document.documentElement.classList.remove('dark');
              }
            }
          
            var preferredTheme;
            try {
              preferredTheme = localStorage.getItem('theme');
            } catch (e) {}
          
            window.__setPreferredTheme = function (newTheme) {
              preferredTheme = newTheme;
              setTheme(newTheme);
              try {
                localStorage.setItem('theme', newTheme);
                setTheme(newTheme);
              } catch (e) {}
            };
          
            var initialTheme = preferredTheme || 'system';
            var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
          
            if (initialTheme === 'system') {
              initialTheme = darkQuery.matches ? 'dark' : 'light';
            }
            setTheme(initialTheme);
          
            darkQuery.addEventListener('change', function (e) {
              if (preferredTheme === 'system') {
                setTheme(e.matches ? 'dark' : 'light');
              }
              setTheme(darkQuery.matches ? 'dark' : 'light');
            });
          
            var isTouchDevice =
              'ontouchstart' in window || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints > 0;
            if (isTouchDevice) {
              document.documentElement.classList.remove('hide-cursor');
            } else {
              document.documentElement.classList.add('hide-cursor');
            }
          })();
        `,
      }}
    />,
  ]);
};
