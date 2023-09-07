import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import { graphql, HeadProps, Link, PageProps, Slice } from 'gatsby';
import tw from 'twin.macro';

import { FlowerCircleIcon, TagSvg } from 'Apps/common/icon/components/svg-icon';
import { ContentSpacer, Grid, Spacer } from 'Apps/common/layout';
// import Seo from 'Apps/common/seo/seo';
import SEOWrapper from 'Apps/common/seo/test-seo';
import { H1, H2 } from 'Apps/common/typography';
import { ROUTES } from 'Types/enum';
import { animateVariant, textVariant } from 'Utils/motion';
import * as ScrollManager from 'Utils/scroll';

import PostCard from '../components/post-card';
import TableOfContents from '../components/table-of-contents';
import Markdown from '../styles/markdown';
import { rhythm } from '../styles/typography';

const BlogPost = ({ data }: PageProps<Queries.BlogPostBySlugQuery>) => {
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
      <Grid>
        <div css={tw`col-span-4 col-start-12 desktop:visually-hide`}>
          <TableOfContents toc={tableOfContents} />
        </div>

        <div css={tw`col-span-8 col-start-3 desktop:(col-span-full col-start-1)`}>
          <header>
            <H1 className="font-bold">{title}</H1>
            <div className="mt-8pxr flex items-center gap-8pxr text-16pxr font-bold text-all-custom-gray">
              <time dateTime={date!}>{date}</time>
              <span css={tw`h-16pxr w-1pxr bg-all-custom-gray`} />
              <span>{category}</span>
              <span css={tw`h-16pxr w-1pxr bg-all-custom-gray`} />
              <span>{timeToRead} min read</span>
            </div>
            <div className="mt-8pxr flex items-center gap-8pxr text-all-custom-gray">
              <TagSvg size={18} />
              {frontmatter?.tags?.map((tag) => (
                <Link
                  key={tag}
                  to={ROUTES.TAG.toUrl(tag!)}
                  className="rounded-full border-2pxr border-all-custom-gray px-6pxr py-3pxr text-14pxr font-bold"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </header>

          <section>
            <div className="relative mt-56pxr mb-32pxr h-1pxr w-full bg-gradient-to-r from-primary to-gradient-cyan box-decoration-slice">
              <div className="absolute -top-24pxr left-[calc(50%-2.25rem)] flex justify-center bg-bg-primary px-12pxr">
                <FlowerCircleIcon className="bg-bg-primary fill-primary" size={48} />
              </div>
            </div>
            <p className="text-16pxr font-semibold tablet:text-14pxr">{summary}</p>
            <div className="my-24pxr h-1pxr w-full bg-gradient-to-r from-primary to-gradient-cyan box-decoration-slice tablet:my-16pxr" />
          </section>

          <div css={tw`h-1pxr mb-20pxr tablet:mb-16pxr`} />

          <Markdown
            key="body"
            dangerouslySetInnerHTML={{ __html: html! }}
            itemProp="articleBody"
            rhythm={rhythm}
          />

          <Spacer size="xl" />

          <div className="mb-64pxr flex flex-col tablet:mb-48pxr">
            <H2 className="mb-32pxr font-bold tablet:mb-28pxr foldable:mb-24pxr">연관 콘텐츠</H2>
            <motion.div
              initial={animateVariant.hidden}
              whileInView={animateVariant.show}
              variants={textVariant()}
              viewport={{ once: true }}
            >
              {/* empty related posts */}
              {relatedPosts?.length === 0 ? (
                /* like callout ui */
                <div className="flex h-200pxr w-full flex-col items-center justify-center rounded-lg bg-bg-secondary">
                  <p className="text-20pxr font-bold text-text-primary foldable:text-18pxr">
                    연관된 콘텐츠가 없어요.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-24pxr tablet:grid-cols-1">
                  {relatedPosts?.map((post) => (
                    <PostCard key={post.node.fields?.slug} post={post} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <Spacer size="sm" />

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
    <SEOWrapper
      metadata={{
        title: post?.frontmatter?.title,
        description: post?.frontmatter?.summary,
        openGraph: {
          url: `${siteUrl}${location.pathname}`,
        },
      }}
      // title={post?.frontmatter?.title ?? 'Blog Post'}
      // description={post?.frontmatter?.summary ?? 'Post Summary'}
      // pathname={location.pathname}
      // thumbnail={`${siteUrl}${post?.frontmatter?.thumbnail?.childImageSharp?.fixed?.src}`}
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
      sort: { frontmatter: { date: DESC } }
      limit: 4
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
