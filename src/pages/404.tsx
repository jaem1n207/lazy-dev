import * as React from 'react';

import { graphql, HeadFC, PageProps } from 'gatsby';

import Seo from 'Components/seo';
import Layout from 'Layout/layout';

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const NotFoundPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const { title } = data.site.siteMetadata;
  const siteTitle = title;

  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <Seo title="404: Not Found" />;

export const pageQuery = graphql`
  query SiteMetaData {
    site(siteMetadata: {}) {
      siteMetadata {
        title
      }
    }
  }
`;
