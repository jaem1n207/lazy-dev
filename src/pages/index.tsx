import { FC } from 'react';

import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';

import Seo from '@/common/components/seo/seo';

import PostList from '@/features/post/components/post-list';
import ShortList from '@/features/post/components/short-list';
import TagList from '@/features/tag/components/tag-list';

const IndexPage: FC<PageProps<Queries.HomeQuery>> = ({ data }) => {
  const tags = data.tags.group;
  const posts = data.posts.edges;
  const shorts = data.shorts.edges;

  return (
    <main>
      <div className="relative mx-auto grid max-w-[1500px] grid-cols-main-three-large desktop:grid-cols-main-three-small tablet:grid-cols-main-two foldable:flex foldable:flex-col foldable:items-center">
        <TagList tags={tags} />
        <PostList posts={posts} />
        <ShortList shorts={shorts} />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo
    openGraph={{
      type: 'website',
      url: location.pathname,
      image: '../assets/favicon.png',
    }}
  />
);

export const pageQuery = graphql`
  query Home {
    tags: allMarkdownRemark(sort: { frontmatter: { tags: ASC } }) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(content|blog)/" }, timeToRead: { gte: 3 } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            summary
            thumbnail {
              childImageSharp {
                gatsbyImageData(height: 300, placeholder: BLURRED)
              }
            }
            date(formatString: "YYYY.MM.DD")
            tags
          }
        }
      }
    }
    shorts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(content|blog)/" }, timeToRead: { lte: 2 } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData(height: 150, placeholder: BLURRED)
              }
            }
            date(formatString: "YYYY.MM.DD")
          }
        }
      }
    }
  }
`;
