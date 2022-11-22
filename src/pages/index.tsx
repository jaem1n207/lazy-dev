import * as React from 'react';

import type { HeadFC, PageProps } from 'gatsby';
import tw from 'twin.macro';

const pageStyles = {
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <h1 css={tw`bg-amber-200`}>Hello</h1>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
