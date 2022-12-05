import { resolve } from 'path';

import type { GatsbyNode } from 'gatsby';

export const sourceNodes: GatsbyNode['sourceNodes'] = ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
}) => {
  const author = {
    id: 'jaemin',
    name: 'Jaemin Lee',
    summary: '웹 프론트 개발자',
  };
  const social = {
    github: 'https://github.com/jaem1n207/lazy-dev',
  };

  createNode({
    ...author,
    ...social,
    id: createNodeId(author.id),
    internal: {
      type: 'Author',
      contentDigest: createContentDigest(author),
    },
  });
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createSlice } = actions;

  createSlice({
    id: 'header',
    component: resolve('./src/components/header.tsx'),
  });

  createSlice({
    id: 'footer',
    component: resolve('./src/components/footer.tsx'),
  });

  const authorBio = resolve('./src/components/bio.tsx');

  const authorResult = await graphql<{ author: { nodes: { id: string } } }>(`
    query {
      author {
        nodes {
          id
        }
      }
    }
  `);

  if (authorResult.errors) {
    reporter.panicOnBuild('There was an error loading your author bio', authorResult.errors);
    return;
  }

  const author = authorResult.data?.author.nodes;

  if (author) {
    createSlice({
      id: `bio--${author.id}`,
      component: authorBio,
      context: {
        id: author.id,
      },
    });
  }

  /**
   * Create blog posts
   * https://github.com/gatsbyjs/gatsby-starter-slices/blob/0bc5fe2ba7c228bcdd1821786f2f46ba48efa5f9/gatsby-node.js#L91
   */
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      github: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `;
  createTypes(typeDefs);
};
