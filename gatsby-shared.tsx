
import type { GatsbyBrowser, GatsbySSR } from 'gatsby';

import Layout from './src/layout/layout';
import Root from './src/root';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] | GatsbySSR['wrapPageElement'] = ({
  element,
}) => (
  <Root>
    <Layout>{element}</Layout>
  </Root>
);
