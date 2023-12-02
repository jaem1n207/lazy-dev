import { writeFileSync } from 'fs';
import { resolve } from 'path';

import esbuild from 'esbuild';
import type { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

import type { SearchData } from '@/common/types/types';

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
    component: resolve('src/apps/slice/nav.tsx'),
    context: {
      title: headerResults.data?.site?.siteMetadata?.title,
    },
  });

  createSlice({
    id: 'footer',
    component: resolve('src/apps/slice/footer.tsx'),
  });

  const authorBio = resolve('src/apps/slice/bio.tsx');

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

  const tagTemplate = resolve('src/features/tag/templates/tag.tsx');

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

  const blogPostTemplate = resolve('src/features/post/templates/blog-post.tsx');

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

  // 마크다운의 frontmatter.locale에 따라서 분기 처리 지원 예정
  const localeKey = 'ko';
  writeFileSync(`public/lazy-dev-data-${localeKey}.json`, JSON.stringify(indexes, null, 2));
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

const generatePreBodyScript = `
  window.__LAZY_DEV_DATA__ = {
    theme: {
      mode: undefined,
      setPreferredTheme: undefined,
    },
    detectDevice: {},
  };

  function setTheme(newTheme) {
    window.__LAZY_DEV_DATA__.theme.mode = newTheme;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }

  let preferredTheme;
  try {
    preferredTheme = localStorage.getItem('theme');
  } catch (e) {}

  window.__LAZY_DEV_DATA__.theme.setPreferredTheme = (newTheme) => {
    preferredTheme = newTheme;
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    } catch (e) {}
  };

  let initialTheme = preferredTheme || 'system';
  let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  if (initialTheme === 'system') {
    initialTheme = darkQuery.matches ? 'dark' : 'light';
  }
  setTheme(initialTheme);

  // 플랫폼별로 콘텐츠를 표시하기 위해 브라우저가 Mac인지 여부를 감지합니다.
  // 예로 검색창에 표시되는 키보드 단축키를 들 수 있습니다.
  const isMacOs = window.navigator.platform.includes('Mac');
  document.documentElement.classList.add(isMacOs ? 'platform-mac' : 'platform-win');

  const userAgent = window.navigator.userAgent;

  const isMobile = /Mobi|Android/i.test(userAgent);
  const isTablet = /Tablet|iPad/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  const isSmartTV =
    /SmartTV|SMART-TV|Internet.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE-HTML/i.test(
      userAgent,
    );
  const isWearable = /Wearable|Watch/i.test(userAgent);
  const isEmbedded = /Raspbian|Ubuntu|ARM/i.test(userAgent);
  const isTouch =
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  window.__LAZY_DEV_DATA__.detectDevice = {
    isMacOs,
    isMobile,
    isTablet,
    isDesktop,
    isSmartTV,
    isWearable,
    isEmbedded,
    isTouch,
  };
`;
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  plugins,
}) => {
  const preBodyScript = esbuild.transformSync(generatePreBodyScript, {
    minify: true,
    format: 'iife',
  }).code;

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        'process.env.LAZY_DEV_PRE_BODY_SCRIPT': JSON.stringify(preBodyScript),
      }),
    ],
  });
};
