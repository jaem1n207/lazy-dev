import React, { useEffect } from 'react';

import { graphql, HeadProps, PageProps, Slice } from 'gatsby';
import tw from 'twin.macro';

import { ContentSpacer } from 'Components/common';
import TableOfContents from 'Components/post/table-of-contents';
import Seo from 'Components/seo';
import Summary from 'Components/summary';
import { useWindowSize } from 'Hooks/use-window-size';
import Layout from 'Layout/layout';
import * as ScrollManager from 'Libs/scroll';
import Markdown from 'Styles/markdown';
import { rhythm } from 'Styles/typography';

type DataProps = {
  site: {
    siteMetadata: {
      author: {
        name: string;
        summary: string;
      };
      description: string;
      lang: string;
      favicon: string;
      postTitle: string;
      siteUrl: {
        github: string;
      };
      title: string;
    };
  };
  markdownRemark: {
    id: string;
    html: string;
    timeToRead: number;
    tableOfContents: string;
    frontmatter: {
      title: string;
      date: string;
      summary: string;
    };
  };
};

const BlogPost = ({ data, location }: PageProps<Queries.BlogPostBySlugQuery>) => {
  const siteTitme = data.site?.siteMetadata?.title || 'Title';
  const { frontmatter, html, timeToRead, tableOfContents } = data.markdownRemark!;
  const { title, date, category, summary } = frontmatter!;

  const { width } = useWindowSize();

  // 가시성 대신 디스플레이를 사용하여 layout shift를 방지합니다.
  const isTableOfContentsVisible = width ? width > 768 : false;

  useEffect(() => {
    ScrollManager.init();

    return () => {
      ScrollManager.destroy();
    };
  }, []);

  return (
    <Layout location={location} title={siteTitme} as="article">
      {isTableOfContentsVisible && <TableOfContents toc={tableOfContents} />}
      <ContentSpacer>
        <header>
          <div css={tw`flex items-center font-bold text-custom-gray text-16pxr gap-8pxr pb-4pxr`}>
            <time dateTime={date!}>{date}</time>
            <span css={tw`h-16pxr w-1pxr bg-custom-gray`} />
            <span>{category}</span>
            <span css={tw`h-16pxr w-1pxr bg-custom-gray`} />
            <span>{timeToRead} min read</span>
          </div>
          <h1 css={tw`font-bold leading-snug text-36pxr tablet:text-32pxr`}>{title}</h1>
        </header>
        <Summary summary={summary} />
        <div css={tw`h-1pxr mb-20pxr tablet:mb-16pxr`} />
        <Markdown
          key="body"
          dangerouslySetInnerHTML={{ __html: html! }}
          itemProp="articleBody"
          rhythm={rhythm}
        />
        <div
          css={tw`w-full h-1pxr my-64pxr box-decoration-slice bg-gradient-to-r from-hyperlink to-primary tablet:my-48pxr`}
        />
        <Slice alias="bio" />
      </ContentSpacer>
    </Layout>
  );
};

export const Head = ({ data: { markdownRemark: post }, location }: HeadProps<DataProps>) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.summary}
      pathname={location.pathname}
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
        date(formatString: "MMMM DD, YY")
      }
    }
  }
`;

export default BlogPost;
