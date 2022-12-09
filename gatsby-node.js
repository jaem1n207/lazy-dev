const { resolve } = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: 'slug',
      value,
    });
  }
};

// export const sourceNodes: GatsbyNode['sourceNodes'] = ({
//   actions: { createNode },
//   createContentDigest,
//   createNodeId,
// }) => {
//   const author = {
//     id: 'jaemin',
//     name: 'Jaemin Lee',
//     summary: '웹 프론트 개발자',
//   };
//   const social = {
//     github: 'https://github.com/jaem1n207/lazy-dev',
//   };

//   createNode({
//     ...author,
//     ...social,
//     id: createNodeId(author.id),
//     internal: {
//       type: 'Author',
//       contentDigest: createContentDigest(author),
//     },
//   });
// };

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createSlice, createPage } = actions;

  createSlice({
    id: 'header',
    component: resolve('./src/components/header.tsx'),
  });

  createSlice({
    id: 'footer',
    component: resolve('./src/components/footer.tsx'),
  });

  const blogPostTemplate = resolve('./src/templates/blog-post.tsx');

  const blogResult = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 1000
        filter: { frontmatter: { category: { ne: "null" }, draft: { eq: false } } }
      ) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              date(formatString: "YYYY. MM. DD. ")
              title
              category
            }
            fields {
              slug
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (blogResult.errors) {
    reporter.panicOnBuild('There was an error loading your blog posts', blogResult.errors);
  }

  const posts = blogResult.data.allMarkdownRemark.edges;

  if (posts.length > 0) {
    posts.forEach((post) => {
      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          next: post.previous,
          previous: post.previous,
        },
      });
    });
  }

  // const authorBio = resolve('./src/components/bio.tsx');

  // const authorResult = await graphql<{ author: { nodes: { id: string } } }>(`
  //   query {
  //     author {
  //       nodes {
  //         id
  //       }
  //     }
  //   }
  // `);

  // if (authorResult.errors) {
  //   reporter.panicOnBuild('There was an error loading your author bio', authorResult.errors);
  //   return;
  // }

  // const author = authorResult.data?.author.nodes;

  // if (author) {
  //   createSlice({
  //     id: `bio--${author.id}`,
  //     component: authorBio,
  //     context: {
  //       id: author.id,
  //     },
  //   });
  // }

  /**
   * Create blog posts
   * https://github.com/gatsbyjs/gatsby-starter-slices/blob/0bc5fe2ba7c228bcdd1821786f2f46ba48efa5f9/gatsby-node.js#L91
   */
};

// export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
//   const { createTypes } = actions;
//   const typeDefs = `
//     type SiteSiteMetadata {
//       author: Author
//       siteUrl: String
//       social: Social
//     }

//     type Author {
//       name: String
//       summary: String
//     }

//     type Social {
//       github: String
//     }

//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//       fields: Fields
//     }

//     type Frontmatter {
//       title: String
//       category: String
//       date: Date @dateformat
//     }

//     type Fields {
//       slug: String
//     }
//   `;
//   createTypes(typeDefs);
// };
