import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import { graphql, HeadProps, Link, PageProps, Slice } from 'gatsby';
import tw from 'twin.macro';

import { FlowerCircleIcon, TagSvg } from 'Apps/common/icon/components/svg-icon';
import { ContentSpacer, Grid, Spacer } from 'Apps/common/layout';
import Seo from 'Apps/common/seo/seo';
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
            <div className="flex items-center font-bold text-all-custom-gray text-16pxr gap-8pxr mt-8pxr">
              <time dateTime={date!}>{date}</time>
              <span css={tw`h-16pxr w-1pxr bg-all-custom-gray`} />
              <span>{category}</span>
              <span css={tw`h-16pxr w-1pxr bg-all-custom-gray`} />
              <span>{timeToRead} min read</span>
            </div>
            <div className="flex items-center gap-8pxr mt-8pxr text-all-custom-gray">
              <TagSvg size={18} />
              {frontmatter?.tags?.map((tag) => (
                <Link
                  key={tag}
                  to={ROUTES.TAG.toUrl(tag!)}
                  className="font-bold rounded-full border-2pxr text-14pxr px-6pxr py-3pxr border-all-custom-gray"
                >
                  {tag}
                </Link>
              ))}
            </div>
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

          <Spacer size="xl" />

          <div className="flex flex-col mb-64pxr tablet:mb-48pxr">
            <H2 className="font-bold mb-32pxr tablet:mb-28pxr foldable:mb-24pxr">연관 콘텐츠</H2>
            <motion.div
              initial={animateVariant.hidden}
              whileInView={animateVariant.show}
              variants={textVariant()}
              viewport={{ once: true }}
            >
              {/* empty related posts */}
              {relatedPosts?.length === 0 ? (
                /* like callout ui */
                <div className="flex flex-col items-center justify-center w-full rounded-lg h-200pxr bg-bg-secondary">
                  <p className="font-bold text-20pxr foldable:text-18pxr text-text-primary">
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
