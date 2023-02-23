import React from 'react';

import type { GatsbySSR } from 'gatsby';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: 'ko' });
  setHeadComponents([
    <meta
      key="google-search-console-verification"
      name="google-site-verification"
      content="ohUVyTBdTm7pjIAXpNjQ9EppEzdrbFijShnU7Q0GEJI"
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
