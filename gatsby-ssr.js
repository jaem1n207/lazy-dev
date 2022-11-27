/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: 'ko' });
  setHeadComponents([
    <link
      key="SpoqaHanSansNeo-Bold"
      rel="preload"
      href="/fonts/SpoqaHanSansNeo-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      key="SpoqaHanSansNeo-Regular"
      rel="preload"
      href="/fonts/SpoqaHanSansNeo-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    /**
     * @see https://caniuse.com/?search=woff
     */
    <link
      key="SpoqaHanSansNeo-Bold"
      rel="preload"
      href="/fonts/SpoqaHanSansNeo-Bold.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
    />,
    <link
      key="SpoqaHanSansNeo-Regular"
      rel="preload"
      href="/fonts/SpoqaHanSansNeo-Regular.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
    />,
  ]);
};
