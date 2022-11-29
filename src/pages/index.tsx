import * as React from 'react';

import { graphql, HeadFC, PageProps } from 'gatsby';
import tw from 'twin.macro';

import Seo from 'Components/seo';
import Layout from 'Layout/layout';

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const IndexPage: React.FC<PageProps<DataProps>> = ({ location, data }) => {
  const siteTitle = data?.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <h1 css={tw`bg-amber-200 `}>Hello</h1>
      <h1 css={tw`font-bold`}>안녕하세요</h1>
      <p>안녕하세요, Hello Inter var!</p>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  query SiteMetaData {
    site(siteMetadata: {}) {
      siteMetadata {
        title
      }
    }
  }
`;
