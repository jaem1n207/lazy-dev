import React, { FC } from 'react';

import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';

import Seo from 'Apps/common/seo/seo';
import PostList from 'Apps/post/components/post-list';
import ShortList from 'Apps/post/components/short-list';
import TagList from 'Apps/tag/components/tag-list';

// const useUpdateQueryStringValueWithoutNavigation = (queryKey: string, queryValue: string) => {
//   useEffect(() => {
//     const currentSearchParams = new URLSearchParams(window.location.search);
//     const oldQueryValue = currentSearchParams.get(queryKey) ?? '';
//     if (queryValue === oldQueryValue) return;

//     if (queryValue) {
//       currentSearchParams.set(queryKey, queryValue);
//     } else {
//       currentSearchParams.delete(queryKey);
//     }
//     const newUrl = [window.location.pathname, currentSearchParams.toString()]
//       .filter(Boolean)
//       .join('?');
//     window.history.replaceState(null, '', newUrl);
//   }, [queryKey, queryValue]);
// };

const IndexPage: FC<PageProps<Queries.HomeQuery>> = ({ data }) => {
  const tags = data.tags.group;
  const posts = data.posts.edges;
  const shorts = data.shorts.edges;

  return (
    <main>
      <div className="grid relative mx-auto max-w-[1500px] grid-cols-main-three-large desktop:grid-cols-main-three-small tablet:grid-cols-main-two foldable:flex foldable:flex-col foldable:items-center">
        <TagList tags={tags} />
        <PostList posts={posts} />
        <ShortList shorts={shorts} />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo title="Lazy Dev" pathname={location.pathname} />
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
      filter: { fileAbsolutePath: { regex: "/(content|blog)/" }, timeToRead: { gte: 5 } }
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
      filter: { fileAbsolutePath: { regex: "/(content|blog)/" }, timeToRead: { lte: 4 } }
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
