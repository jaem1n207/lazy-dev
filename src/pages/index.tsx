import * as React from 'react';

import { graphql, HeadFC, HeadProps, PageProps, Link } from 'gatsby';
import tw from 'twin.macro';

// import Contents from 'Components/contents';

import Seo from 'Components/seo';
import Layout from 'Layout/layout';

const IndexPage: React.FC<PageProps<Queries.HomeQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title || null;

  // const [posts, setPosts] = React.useState<Post[]>([]);
  // const posts = fakePosts.allMarkdownRemark.nodes;
  const posts = data.allMarkdownRemark.edges;

  // const posts = data.allMarkdownRemark;

  return (
    <Layout location={location} title={siteTitle}>
      {/* Category */}
      <ol css={tw`list-none`} className="font-spoqa">
        {posts.map(({ node: post }) => {
          const title = post!.frontmatter!.title || post.fields?.slug;

          return (
            <li key={post.fields?.slug}>
              <article css={tw`my-32pxr`}>
                <header css={tw`mb-16pxr`}>
                  <h2
                    css={tw`font-bold text-28pxr text-primary mb-8pxr mt-0pxr`}
                    className="font-spoqa"
                  >
                    <Link to={post.fields?.slug || ''} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <time dateTime={post!.frontmatter!.date!}>{post!.frontmatter!.date}</time>
                  {/* min read 추가 */}
                </header>
                <section>
                  <p
                    css={tw`mb-0pxr`}
                    dangerouslySetInnerHTML={{
                      __html: post?.frontmatter?.description || post.excerpt!,
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
  query Home {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY년 MM월 DD일 (dd)", locale: "ko")
            title
            category
            draft
            description
          }
        }
      }
    }
  }
`;
