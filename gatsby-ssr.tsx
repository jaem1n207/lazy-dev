import * as React from 'react';

import type { GatsbySSR } from 'gatsby';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: 'ko' });
  setHeadComponents([
    <link
      key="SpoqaHanSansNeo-Bold"
      rel="preload"
      href="/fonts/SpoqaHanSansNeo-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      // caching font
      // https://web.dev/preload-critical-assets/
      // https://web.dev/codelab-preload-web-fonts/
    />,
    <link
      key="SpoqaHanSansNeo-Regular"
      rel="preload"
      href="/fonts/SpoqaHanSansNeo-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
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
