import * as React from 'react';

import type { HeadFC, PageProps } from 'gatsby';
import tw from 'twin.macro';

import Layout from 'Components/layout';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1 css={tw`bg-amber-200 `}>Hello</h1>
      <h1 css={tw`font-bold`}>안녕하세요</h1>
      <p>안녕하세요, Hello Inter var!</p>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
