import * as React from 'react';

import { graphql, HeadFC, HeadProps, PageProps, Link } from 'gatsby';
import tw from 'twin.macro';

// import Contents from 'Components/contents';

import Seo from 'Components/seo';
import Layout from 'Layout/layout';

const fakePosts = {
  allMarkdownRemark: {
    nodes: [
      {
        frontmatter: {
          category: 'javascript',
          description: 'Test',
          title: 'Category Test1',
          date: '12월 05, 2022',
        },
        fields: {
          slug: '/category-test1',
        },
        excerpt:
          "This is my first post on my new fake blog! How exciting! I'm sure I'll write a lot more interesting things in the future. Oh, and here's a…",
      },
      {
        frontmatter: {
          category: 'javascript',
          description: 'React Test Description',
          title: 'Category Test2',
          date: '12월 05, 2022',
        },
        fields: {
          slug: '/category-test2',
        },
        excerpt: 'React Test',
      },
    ],
  },
};

const IndexPage: React.FC<PageProps<Queries.HomepageQuery>> = ({ data, location }) => {
  const title = data.site?.siteMetadata?.title || null;
  const posts = fakePosts.allMarkdownRemark.nodes;

  // const posts = data.allMarkdownRemark;

  return (
    <Layout location={location} title={title}>
      {/* Category */}
      <ol css={tw`list-none`}>
        {posts.map((post) => {
          const title = post.frontmatter?.title || post.fields?.slug;

          return (
            <li key={post.fields?.slug}>
              <article css={tw`my-32pxr`}>
                <header css={tw`mb-16pxr`}>
                  <h2 css={tw`font-bold text-28pxr text-primary mb-8pxr mt-0pxr`}>
                    <Link to={post.fields?.slug || ''} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                  {/* min read 추가 */}
                </header>
                <section>
                  <p
                    css={tw`mb-0pxr`}
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
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
    #         date(formatString: "MMMM DD, YYYY", locale: "ko")
    #         title
    #         # category
    #       }
    #     }
    #   }
    # }
  }
`;
