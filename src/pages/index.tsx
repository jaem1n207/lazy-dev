import * as React from 'react';

import type { HeadFC, PageProps } from 'gatsby';
import tw from 'twin.macro';

import Layout from 'Components/layout';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1 css={tw`bg-amber-200`}>Hello</h1>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
