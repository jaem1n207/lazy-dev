import * as React from 'react';

import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import tw from 'twin.macro';

import Seo from 'Components/seo';
import Layout from 'Layout/layout';

const IndexPage: React.FC<PageProps<Queries.HomepageQuery>> = ({ data, location }) => {
  const title = data.site?.siteMetadata?.title || null;

  return (
    <Layout location={location} title={title}>
      <h1 css={tw`bg-amber-200 `}>Hello</h1>
      <h1 css={tw`font-bold`}>안녕하세요</h1>
      <p>안녕하세요, Hello Inter var!</p>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo title="All posts" pathname={location.pathname} />
);

export const pageQuery = graphql`
  query Homepage {
    site(siteMetadata: {}) {
      siteMetadata {
        title
      }
    }
  }
`;
