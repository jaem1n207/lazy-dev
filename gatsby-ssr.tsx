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
  ]);
};
