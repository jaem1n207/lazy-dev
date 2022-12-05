import * as React from 'react';

import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import tw from 'twin.macro';

// import Contents from 'Components/contents';
import Seo from 'Components/seo';
import Layout from 'Layout/layout';

const IndexPage: React.FC<PageProps<Queries.HomepageQuery>> = ({ data, location }) => {
  const title = data.site?.siteMetadata?.title || null;

  // const posts = data.allMarkdownRemark;

  return (
    <Layout location={location} title={title}>
      <h1 css={tw`bg-amber-200 `}>Hello</h1>
      {/* <Contents posts={posts} /> */}
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo title="Home" pathname={location.pathname} />
);

export const pageQuery = graphql`
  query Homepage {
    site(siteMetadata: {}) {
      siteMetadata {
        title
      }
    }
    # allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
    #   edges {
    #     node {
    #       excerpt
    #       fields {
    #         slug
    #       }
    #       frontmatter {
    #         date(formatString: "MMMM DD, YYYY")
    #         title
    #         # category
    #       }
    #     }
    #   }
    # }
  }
`;
