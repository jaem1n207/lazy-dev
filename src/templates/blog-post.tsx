import React from 'react';

import { graphql, HeadProps, PageProps } from 'gatsby';

import Seo from 'Components/seo';
import Layout from 'Layout/layout';

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

const BlogPost = ({ data, location }: PageProps<Queries.Query>) => {
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
          <article key="body" dangerouslySetInnerHTML={{ __html: html! }} itemProp="articleBody" />
        </div>
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

export const pageQuery = graphql`
  query BlogPostBySlug {
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
    markdownRemark(fields: { slug: { eq: "$slug" } }) {
      id
      excerpt
      html
      frontmatter {
        title
        description
        date(formatString: "YYYY. MM. DD. ")
      }
    }
  }
`;

export default BlogPost;
