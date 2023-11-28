import type { GatsbyBrowser, GatsbySSR } from 'gatsby';

import Layout from './src/layout/layout';
import Root from './src/root';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] | GatsbySSR['wrapPageElement'] = ({
  element,
}) => (
  // @ts-ignore
  <Root>
    {/* @ts-ignore */}
    <Layout>{element}</Layout>
  </Root>
);
