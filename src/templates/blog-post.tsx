import React, { useEffect } from 'react';

import { graphql, HeadProps, PageProps, Slice } from 'gatsby';
import tw from 'twin.macro';

import { ContentSpacer, Grid, H1 } from 'Components/common';
import TableOfContents from 'Components/post/table-of-contents';
import Seo from 'Components/seo';
import { FlowerCircleIcon } from 'Components/svg/svg-icon';
import * as ScrollManager from 'Libs/scroll';
import Markdown from 'Styles/markdown';
import { rhythm } from 'Styles/typography';

const BlogPost = ({ data }: PageProps<Queries.BlogPostBySlugQuery>) => {
  const { frontmatter, html, timeToRead, tableOfContents } = data.markdownRemark!;
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
            <div
              css={tw`flex items-center font-bold text-all-custom-gray text-16pxr gap-8pxr pb-4pxr`}
            >
              <time dateTime={date!}>{date}</time>
              <span css={tw`h-16pxr w-1pxr bg-all-custom-gray`} />
              <span>{category}</span>
              <span css={tw`h-16pxr w-1pxr bg-all-custom-gray`} />
              <span>{timeToRead} min read</span>
            </div>
            <H1 css={tw`font-bold leading-snug tablet:text-32pxr`}>{title}</H1>
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
          <Slice alias="bio" />
        </div>
      </Grid>
    </ContentSpacer>
  );
};

export const Head = ({
  data: { markdownRemark: post, site },
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
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        author {
          name
          summary
        }
        description
        lang
        favicon
        postTitle
        siteUrl
        social {
          github
        }
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      tableOfContents
      frontmatter {
        category
        title
        summary
        date(formatString: "MMMM Do, YY")
        thumbnail {
          childImageSharp {
            fixed(width: 800) {
              src
            }
          }
        }
      }
    }
  }
`;

export default BlogPost;
