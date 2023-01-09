import * as React from 'react';

import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';

import CategoryFilter from 'Components/category-filter';
import PostList from 'Components/post/post-list';
import Seo from 'Components/seo';
import Layout from 'Layout/layout';
import { firstLetterUppercase } from 'Libs/string';
import Post from 'Types/post';

type ContextProps = {
  category: string;
};

const IndexPage: React.FC<PageProps<Queries.HomeQuery, ContextProps>> = ({
  data,
  location,
  pageContext,
}) => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  const currentCategory = pageContext.category;
  const postData = data.allMarkdownRemark.edges;

  React.useLayoutEffect(() => {
    const filteredPosts = postData
      .filter((post) => {
        if (currentCategory) {
          return post.node.frontmatter!.category === currentCategory;
        }

        return true;
      })
      .map((edge) => {
        const { slug } = edge.node.fields!;
        const { title, date, category, summary, thumbnail } = edge.node.frontmatter!;
        const { childImageSharp } = thumbnail!;

        const post: Post = {
          slug,
          title,
          date,
          category,
          summary,
          thumbnail: childImageSharp?.id!,
          timeToRead: edge.node.timeToRead,
        };

        return post;
      });

    setPosts(filteredPosts);
  }, [currentCategory, data.allMarkdownRemark, postData]);

  return (
    <Layout location={location} title={data.site?.siteMetadata?.title!}>
      <CategoryFilter categories={data.allMarkdownRemark.group} />
      <h2 className="font-bold text-32pxr mb-24pxr tablet:text-28pxr">
        {currentCategory ? firstLetterUppercase(currentCategory) : 'All'} Posts
      </h2>
      <PostList posts={posts} />
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(content/blog)/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YY")
            title
            category
            draft
            summary
            thumbnail {
              childImageSharp {
                id
              }
              base
            }
          }
        }
      }
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
