import React from 'react';

import { graphql, HeadProps, PageProps, Slice } from 'gatsby';
import tw from 'twin.macro';

import Seo from 'Components/seo';
import Summary from 'Components/summary';
import Layout from 'Layout/layout';
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
    excerpt: string;
    html: string;
    frontmatter: {
      title: string;
      date: string;
      summary: string;
    };
  };
};

const BlogPost = ({ data, location }: PageProps<Queries.BlogPostBySlugQuery>) => {
  const siteTitme = data.site?.siteMetadata?.title || 'Title';

  const { frontmatter, html } = data.markdownRemark!;
  const { title, date, category, summary } = frontmatter!;

  return (
    <Layout location={location} title={siteTitme}>
      <article>
        <div>
          <header>
            <div css={tw`flex items-center font-bold text-custom-gray text-16pxr gap-8pxr pb-4pxr`}>
              <time dateTime={date!}>{date}</time>
              <span css={tw`h-16pxr w-1pxr bg-custom-gray`}> </span>
              <span>{category}</span>
            </div>
            <h1 css={tw`font-bold leading-snug text-36pxr tablet:text-32pxr`}>{title}</h1>
          </header>
          <Summary summary={summary} />
          <div css={tw`h-1pxr mb-40pxr`} />
          <Markdown
            key="body"
            dangerouslySetInnerHTML={{ __html: html! }}
            itemProp="articleBody"
            rhythm={rhythm}
          />
        </div>
        <hr />
        <Slice alias="bio" />
      </article>
    </Layout>
  );
};

export const Head = ({ data: { markdownRemark: post }, location }: HeadProps<DataProps>) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.summary || post.excerpt}
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
      excerpt
      html
      frontmatter {
        category
        title
        summary
        date(formatString: "YYYY. MM. DD", locale: "ko")
      }
    }
  }
`;

export default BlogPost;
