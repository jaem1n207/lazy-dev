import React from 'react';

import type { GatsbySSR } from 'gatsby';

import Layout from './src/layout/layout';
import Root from './src/root';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return (
    <Root>
      <Layout>{element}</Layout>
    </Root>
  );
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
  setBodyAttributes,
  setPreBodyComponents,
}) => {
  setBodyAttributes({
    className: 'min-h-screen antialiased tracking-tight text-text-primary bg-bg-primary transition',
  });
  setHtmlAttributes({
    lang: 'en',
  });
  setPreBodyComponents([
    <script
      key="theme-hydration"
      dangerouslySetInnerHTML={{
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
          })();
        `,
      }}
    />,
  ]);
};
