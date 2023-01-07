const { resolve } = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.sourceNodes = ({ actions: { createNode }, createContentDigest, createNodeId }) => {
  const authors = [
    {
      authorId: 'jaemin',
      name: 'Jaemin Lee',
      summary: '웹 프론트 개발자',
      github: 'https://github.com/jaem1n207',
    },
  ];

  authors.map((author) =>
    createNode({
      ...author,
      id: createNodeId(author.authorId),
      internal: {
        type: `Author`,
        contentDigest: createContentDigest(author),
      },
    })
  );
};

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

  const authorBio = resolve('./src/components/bio.tsx');

  const authorResults = await graphql(
    `
      {
        allAuthor {
          edges {
            node {
              authorId
            }
          }
        }
      }
    `
  );

  if (authorResults.errors) {
    reporter.panicOnBuild('There was an error loading your author bio', authorResults.errors);
    return;
  }
  const authors = authorResults.data.allAuthor.edges;

  if (authors.length > 0) {
    authors.forEach((author) => {
      createSlice({
        id: `bio--${author.node.authorId}`,
        component: authorBio,
        context: {
          slug: author.node.authorId,
        },
      });
    });
  }

  const blogPostTemplate = resolve('./src/templates/blog-post.tsx');

  const blogResult = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        limit: 1000
        filter: { fileAbsolutePath: { regex: "/(content/blog)/" } }
      ) {
        edges {
          node {
            timeToRead
            id
            excerpt
            frontmatter {
              date(formatString: "YYYY. MM. DD.", locale: "ko")
              title
              category
              authorId
              thumbnail {
                childImageSharp {
                  id
                }
                base
              }
              summary
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
      categoriesGroup: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { category: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  if (blogResult.errors) {
    reporter.panicOnBuild('There was an error loading your blog posts', blogResult.errors);
  }

  const posts = blogResult.data.postsRemark.edges;

  if (posts.length > 0) {
    posts.forEach((post) => {
      const slug = post.node.fields.slug;
      createPage({
        path: `blog${slug}`,
        component: blogPostTemplate,
        context: {
          slug: slug,
          next: post.previous,
          previous: post.previous,
        },
        slices: {
          bio: `bio--${post.node.frontmatter.authorId}`,
        },
      });
    });
  }

  const categories = blogResult.data.categoriesGroup.group;

  const mainTemplate = resolve('./src/pages/index.tsx');

  const kebabCase = (string) =>
    string
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();

  if (categories.length > 0) {
    categories.forEach((category) => {
      const slug = `/category/${kebabCase(category.fieldValue)}/`;

      createPage({
        path: slug,
        component: mainTemplate,
        context: {
          category: category.fieldValue,
        },
      });
    });
  }
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: `slug`,
      value,
    });
  }

  if (node.internal.type === `ImageSharp`) {
    const parent = getNode(node.parent);

    if (parent.relativeDirectory === 'author') {
      createNodeField({
        node,
        name: 'authorId',
        value: parent.name,
      });
    }
  }
};
