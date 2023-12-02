// eslint-disable-next-line unused-imports/no-unused-imports
import React from 'react';

import type { GatsbyBrowser, GatsbySSR } from 'gatsby';

import Layout from './src/apps/layout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] | GatsbySSR['wrapPageElement'] = ({
  element,
}) => <Layout>{element}</Layout>;
