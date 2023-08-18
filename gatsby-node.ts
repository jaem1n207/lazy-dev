import { resolve } from 'path';

import type { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

export const sourceNodes: GatsbyNode['sourceNodes'] = ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
}) => {
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

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createSlice, createPage } = actions;

  const headerResults = await graphql<Queries.Query>(`
    query site {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  createSlice({
    id: 'nav',
    component: resolve('./src/components/slice/nav.tsx'),
    context: {
      title: headerResults.data?.site?.siteMetadata?.title,
    },
  });

  createSlice({
    id: 'footer',
    component: resolve('./src/components/slice/footer.tsx'),
  });

  const authorBio = resolve('./src/components/bio.tsx');

  const authorResults = await graphql<Queries.Query>(`
    query allAuthors {
      allAuthor {
        edges {
          node {
            authorId
          }
        }
      }
    }
  `);

  if (authorResults.errors) {
    reporter.panicOnBuild('There was an error loading your author bio', authorResults.errors);
    return;
  }
  const authors = authorResults.data?.allAuthor.edges ?? [];

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

  const blogResult = await graphql<Queries.Query>(`
    query allMarkdownRemark {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(content/blog)/" } }) {
        edges {
          node {
            fields {
              slug
            }
            id
            frontmatter {
              authorId
            }
          }
        }
      }
    }
  `);

  if (blogResult.errors) {
    reporter.panicOnBuild('There was an error loading your blog posts', blogResult.errors);
  }

  const posts = blogResult.data?.allMarkdownRemark.edges ?? [];

  if (posts.length > 0) {
    posts.forEach((post) => {
      const slug = post.node.fields?.slug ?? '';

      createPage({
        path: slug,
        component: blogPostTemplate,
        context: {
          slug: slug,
        },
        slices: {
          bio: `bio--${post.node.frontmatter?.authorId}`,
        },
      });
    });
  }
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const relativeFilePath = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: `slug`,
      value: relativeFilePath,
    });
  }

  if (node.internal.type === `ImageSharp`) {
    if (!node.parent) return;
    const parent = getNode(node.parent);

    if (!parent?.relativeDirectory) return;
    if (parent.relativeDirectory === 'author') {
      createNodeField({
        node,
        name: 'authorId',
        value: parent.name,
      });
    }
  }
};
