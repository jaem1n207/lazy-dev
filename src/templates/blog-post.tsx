// import * as React from 'react';

// import { graphql, PageProps, HeadProps } from 'gatsby';

// import Seo from 'Components/seo';
// import Layout from 'Layout/layout';

// type DataProps = {
//   markdownRemark: {
//     html: string;
//     excerpt: string;
//     fields: {
//       slug: string;
//     };
//     frontmatter: {
//       date: string;
//       title: string;
//       // category: string;
//       description: string;
//     };
//   };
// };

// const blogPost: React.FC<PageProps<Queries.BlogPostBySlugQuery>> = ({ data, location }) => {
//   const title = data.site?.siteMetadata?.title || `Title`;

//   return (
//     <Layout location={location} title={title}>
//       blogPost
//     </Layout>
//   );
// };

// export const Head = ({ data: { markdownRemark: post } }: HeadProps<DataProps>) => {
//   return (
//     <Seo
//       title={post.frontmatter.title}
//       description={post.frontmatter.description || post.excerpt}
//     />
//   );
// };

// export default blogPost;

// export const pageQuery = graphql`
//   query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
//     site {
//       siteMetadata {
//         title
//         author {
//           name
//           summary
//         }
//         siteUrl
//       }
//     }
//     markdownRemark(id: { eq: $id }) {
//       id
//       excerpt(pruneLength: 160)
//       html
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//         # category
//         description
//       }
//     }
//     previous: markdownRemark(id: { eq: $previousPostId }) {
//       fields {
//         slug
//       }
//       frontmatter {
//         title
//       }
//     }
//     next: markdownRemark(id: { eq: $nextPostId }) {
//       fields {
//         slug
//       }
//       frontmatter {
//         title
//       }
//     }
//   }
// `;
