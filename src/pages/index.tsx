import * as React from 'react';

import { graphql, HeadFC, HeadProps, PageProps, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import tw from 'twin.macro';

// import Contents from 'Components/contents';

import Seo from 'Components/seo';
import Layout from 'Layout/layout';

const IndexPage: React.FC<PageProps<Queries.HomeQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title || null;

  // const [posts, setPosts] = React.useState<Post[]>([]);
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      {/* Category */}
      <ol css={tw`flex flex-col list-none gap-40pxr`}>
        {posts.map(({ node: post }) => {
          const title = post!.frontmatter!.title || post.fields?.slug;
          const thumbnail = getImage(post!.frontmatter!.thumbnail?.childImageSharp!);

          return (
            <li key={post.fields?.slug}>
              <article
                css={tw`relative flex flex-col justify-between rounded-lg border-article-border bg-article-background aspect-video p-48pxr border-1pxr tablet:p-36pxr foldable:p-24pxr`}
              >
                <span
                  css={tw`box-border absolute block overflow-hidden border-none pointer-events-none opacity-10 bg-none p-0pxr m-0pxr inset-0pxr`}
                >
                  <GatsbyImage
                    image={thumbnail!}
                    alt="thumbnail"
                    css={tw`box-border absolute block object-cover max-w-full max-h-full min-w-full min-h-full m-auto select-none brightness-150 blur-sm inset-0pxr p-0pxr w-0pxr h-0pxr`}
                  />
                </span>
                <header css={tw`z-10`}>
                  <h2
                    css={tw`font-bold leading-snug text-32pxr text-primary tablet:text-28pxr foldable:text-24pxr`}
                  >
                    <Link
                      to={post.fields?.slug || ''}
                      itemProp="url"
                      css={tw`transition-shadow hover:shadow-text-underline`}
                    >
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <p
                    css={tw`max-w-lg pt-12pxr text-16pxr foldable:text-14pxr`}
                    dangerouslySetInnerHTML={{
                      __html: post?.frontmatter?.summary || post.excerpt!,
                    }}
                    itemProp="description"
                  />
                </header>
                <section
                  css={tw`flex items-center flex-row  relative z-10 w-full justify-between foldable:(flex-col items-start pt-24pxr)`}
                >
                  <div
                    css={tw`text-gray-900 text-16pxr leading-6 opacity-90 flex items-center gap-32pxr foldable:(text-14pxr leading-5 mb-12pxr) dark:text-white`}
                  >
                    <div>
                      <div css={tw`block font-bold mb-4pxr`}>Date</div>
                      <time dateTime={post!.frontmatter!.date!}>{post!.frontmatter!.date}</time>
                    </div>
                    <div>
                      <div css={tw`block font-bold mb-4pxr`}>Time to read</div>~9 miniutes
                    </div>
                  </div>
                  <Link
                    to={post.fields?.slug || ''}
                    itemProp="url"
                    css={tw`font-bold transition-colors rounded-md py-12pxr px-16pxr bg-primary text-button-text foldable:(py-8pxr px-12pxr text-12pxr)`}
                  >
                    포스팅 보러가기
                    <span aria-hidden="true"> →</span>
                  </Link>
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
            date(formatString: "YYYY. MM. DD.", locale: "ko")
            title
            category
            draft
            summary
            thumbnail {
              childImageSharp {
                gatsbyImageData(formats: WEBP, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`;
