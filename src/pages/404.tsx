import * as React from 'react';

import { graphql, HeadFC, PageProps } from 'gatsby';

import Seo from 'Components/seo';
import Layout from 'Layout/layout';

const NotFoundPage: React.FC<PageProps<Queries.NotFoundQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title || null;

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
  query NotFound {
    site(siteMetadata: {}) {
      siteMetadata {
        title
      }
    }
  }
`;
