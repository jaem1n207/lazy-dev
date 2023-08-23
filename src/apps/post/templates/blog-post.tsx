import React, { useEffect } from 'react';

import { graphql, HeadProps, Link, PageProps, Slice } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import tw from 'twin.macro';

import { FlowerCircleIcon } from 'Apps/common/icon/components/svg-icon';
import { ContentSpacer, Grid } from 'Apps/common/layout';
import Seo from 'Apps/common/seo/seo';
import { H1 } from 'Apps/common/typography';
import { ROUTES } from 'Types/enum';
import * as ScrollManager from 'Utils/scroll';

import TableOfContents from '../components/table-of-contents';
import Markdown from '../styles/markdown';
import { rhythm } from '../styles/typography';

const BlogPost = ({ data }: PageProps<Queries.BlogPostBySlugQuery>) => {
  console.log('🚀 ~ file: blog-post.tsx:17 ~ BlogPost ~ data:', data);
  const { frontmatter, html, timeToRead, tableOfContents } = data.post!;
  const relatedPosts = data.relatedPosts.edges;
  const { title, date, category, summary } = frontmatter!;

  useEffect(() => {
    ScrollManager.init();

    return () => {
      ScrollManager.destroy();
    };
  }, []);

  return (
    <ContentSpacer>
      ghello
      <Grid>
        <div css={tw`col-span-4 col-start-12 desktop:visually-hide`}>
          <TableOfContents toc={tableOfContents} />
        </div>

        <div css={tw`col-span-8 col-start-3 desktop:(col-span-full col-start-1)`}>
          <header>
            <div
              css={tw`flex items-center font-bold text-all-custom-gray text-16pxr gap-8pxr pb-4pxr`}
            >
              <time dateTime={date!}>{date}</time>
              <span css={tw`h-16pxr w-1pxr bg-all-custom-gray`} />
              <span>{category}</span>
              <span css={tw`h-16pxr w-1pxr bg-all-custom-gray`} />
              <span>{timeToRead} min read</span>
            </div>
            <H1 className="font-bold">{title}</H1>
          </header>

          <section>
            <div className="relative w-full h-1pxr mt-56pxr mb-32pxr box-decoration-slice bg-gradient-to-r from-primary to-gradient-cyan">
              <div className="absolute -top-24pxr left-[calc(50%-2.25rem)] flex justify-center bg-bg-primary px-12pxr">
                <FlowerCircleIcon className="fill-primary bg-bg-primary" size={48} />
              </div>
            </div>
            <p className="font-semibold text-16pxr tablet:text-14pxr">{summary}</p>
            <div className="w-full h-1pxr box-decoration-slice bg-gradient-to-r from-primary to-gradient-cyan my-24pxr tablet:my-16pxr" />
          </section>

          <div css={tw`h-1pxr mb-20pxr tablet:mb-16pxr`} />

          <Markdown
            key="body"
            dangerouslySetInnerHTML={{ __html: html! }}
            itemProp="articleBody"
            rhythm={rhythm}
          />

          <div
            css={tw`w-full h-1pxr my-64pxr box-decoration-slice bg-gradient-to-r from-primary to-gradient-cyan tablet:my-48pxr`}
          />

          <div className="flex flex-col items-center mb-64pxr tablet:mb-48pxr">
            <h2 className="font-bold text-24pxr tablet:text-20pxr mb-16pxr">Related Posts</h2>
            <div className="grid grid-cols-2 gap-24pxr tablet:grid-cols-1">
              {relatedPosts?.map((post) => (
                <article key={post.node.fields?.slug} className="rounded-lg focus-primary mb-24pxr">
                  <Link to={ROUTES.BLOG_POST.toUrl(post.node.fields?.slug!)}>
                    <div className="w-full overflow-hidden h-300pxr mb-16pxr desktop:h-200pxr tablet:h-180pxr foldable:h-200pxr">
                      <GatsbyImage
                        image={post.node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
                        alt={post.node.frontmatter?.title!}
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                    <h3 className="font-bold text-24pxr foldable:text-20pxr mb-8pxr">
                      {post.node.frontmatter?.title}
                    </h3>
                    <time
                      dateTime={post.node.frontmatter?.date!}
                      className="text-18pxr foldable:text-16pxr"
                    >
                      {post.node.frontmatter?.date}
                    </time>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <Slice alias="bio" />
        </div>
      </Grid>
    </ContentSpacer>
  );
};

export const Head = ({
  data: { post, site },
  location,
}: HeadProps<Queries.BlogPostBySlugQuery>) => {
  const siteUrl = site?.siteMetadata?.siteUrl;

  return (
    <Seo
      title={post?.frontmatter?.title ?? 'Blog Post'}
      description={post?.frontmatter?.summary ?? 'Post Summary'}
      pathname={location.pathname}
      thumbnail={`${siteUrl}${post?.frontmatter?.thumbnail?.childImageSharp?.fixed?.src}`}
    />
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!, $tags: [String]!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      tableOfContents
      frontmatter {
        category
        title
        summary
        date(formatString: "YYYY.MM.DD")
        tags
        thumbnail {
          childImageSharp {
            fixed(width: 800) {
              src
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(content|blog)/" }
        frontmatter: { tags: { in: $tags } }
        fields: { slug: { ne: $slug } }
      }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            tags
            date(formatString: "YYYY.MM.DD")
            summary
            thumbnail {
              childImageSharp {
                gatsbyImageData(height: 300, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`;

export default BlogPost;
