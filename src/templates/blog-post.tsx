import React from 'react';

import { graphql, HeadProps, PageProps, Slice } from 'gatsby';

import Seo from 'Components/seo';
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
      description: string;
      date: string;
    };
  };
};

const BlogPost = ({ data, location }: PageProps<Queries.BlogPostBySlugQuery>) => {
  const siteTitme = data.site?.siteMetadata?.title || 'Title';

  const { frontmatter, html } = data.markdownRemark!;
  const { title, date, description, category } = frontmatter!;

  return (
    <Layout location={location} title={siteTitme}>
      <article>
        <div>
          <header>
            <div>
              <span>{category}</span>
              <time dateTime={date!}>{date}</time>
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
          </header>
          <div /> {/* Divider 역할 */}
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

export const Head = ({ data: { markdownRemark: post } }: HeadProps<DataProps>) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
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
        description
        date(formatString: "YYYY. MM. DD.", locale: "ko")
      }
    }
  }
`;

export default BlogPost;
