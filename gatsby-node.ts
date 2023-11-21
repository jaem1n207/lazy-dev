import { writeFileSync } from 'fs';
import { resolve } from 'path';

import type { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

import type { SearchData } from 'Types/types';

import { extractContentByHeading } from './html-parser';

export const sourceNodes: GatsbyNode['sourceNodes'] = ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
}) => {
  const authors = [
    {
      authorId: 'jaemin',
      email: 'roy.jm.lee@gmail.com',
      name: '이재민',
      githubName: 'jaem1n207',
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
    }),
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
    component: resolve('./src/apps/slice/nav.tsx'),
    context: {
      title: headerResults.data?.site?.siteMetadata?.title,
    },
  });

  createSlice({
    id: 'footer',
    component: resolve('./src/apps/slice/footer.tsx'),
  });

  const authorBio = resolve('./src/apps/slice/bio.tsx');

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

  const tagTemplate = resolve('./src/apps/tag/templates/tag.tsx');

  const tagResults = await graphql<Queries.allTagsQuery>(`
    query allTags {
      allTags: allMarkdownRemark(sort: { frontmatter: { tags: ASC } }) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `);

  if (tagResults.errors) {
    reporter.panicOnBuild('There was an error loading your tags', tagResults.errors);
  }

  const tags = tagResults.data?.allTags.group ?? [];

  if (tags.length > 0) {
    tags.forEach((tag) => {
      createPage({
        path: `/tags/${tag.fieldValue}`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
          ids: tag.edges.map((edge) => edge.node.id),
        },
      });
    });
  }

  const blogPostTemplate = resolve('./src/apps/post/templates/blog-post.tsx');

  const blogResult = await graphql<Queries.Query>(`
    query allMarkdownRemark {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(content/blog)/" } }) {
        edges {
          node {
            fields {
              slug
            }
            id
            html
            headings {
              value
              id
            }
            frontmatter {
              authorId
              tags
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

  const posts = blogResult.data?.allMarkdownRemark.edges ?? [];

  if (!posts.length) {
    reporter.warn('There are no posts!');
    return;
  }

  posts.forEach((post) => {
    const slug = post.node.fields?.slug ?? '';

    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        slug: slug,
        tags: post.node.frontmatter?.tags,
        id: post.node.id,
      },
      slices: {
        bio: `bio--${post.node.frontmatter?.authorId}`,
      },
    });
  });

  const indexes: SearchData = {};
  posts.map((edge) => {
    const { node } = edge;
    const title = node.frontmatter?.title!;
    const route = node.fields?.slug!;

    const contentByHeading = extractContentByHeading(node.html!);
    indexes[route] = { title, data: contentByHeading };
  });

  writeFileSync('public/lazy-dev-data.json', JSON.stringify(indexes, null, 2));
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
