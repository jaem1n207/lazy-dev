import { writeFileSync } from "fs";
import { resolve } from "path";
import esbuild from "esbuild";
import type { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

import type { SearchData } from "@/common/types/types";

import { extractContentByHeading } from "./html-parser";

export const sourceNodes: GatsbyNode["sourceNodes"] = ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
}) => {
  const authors = [
    {
      authorId: "jaemin",
      email: "roy.jm.lee@gmail.com",
      name: "이재민",
      githubName: "jaem1n207",
      summary: "웹 프론트 개발자",
      github: "https://github.com/jaem1n207",
    },
  ];

  authors.map((author) =>
    createNode({
      ...author,
      id: createNodeId(author.authorId),
      internal: {
        type: "Author",
        contentDigest: createContentDigest(author),
      },
    }),
  );
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
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
    id: "nav",
    component: resolve("src/apps/slice/nav.tsx"),
    context: {
      title: headerResults.data?.site?.siteMetadata?.title,
    },
  });

  createSlice({
    id: "footer",
    component: resolve("src/apps/slice/footer.tsx"),
  });

  const authorBio = resolve("src/apps/slice/bio.tsx");

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
    reporter.panicOnBuild("There was an error loading your author bio", authorResults.errors);
    return;
  }
  const authors = authorResults.data?.allAuthor.edges ?? [];

  if (authors.length > 0) {
    for (const author of authors) {
      createSlice({
        id: `bio--${author.node.authorId}`,
        component: authorBio,
        context: {
          slug: author.node.authorId,
        },
      });
    }
  }

  const tagTemplate = resolve("src/features/tag/templates/tag.tsx");

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
    reporter.panicOnBuild("There was an error loading your tags", tagResults.errors);
  }

  const tags = tagResults.data?.allTags.group ?? [];

  if (tags.length > 0) {
    for (const tag of tags) {
      createPage({
        path: `/tags/${tag.fieldValue}`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
          ids: tag.edges.map((edge) => edge.node.id),
        },
      });
    }
  }

  const blogPostTemplate = resolve("src/features/post/templates/blog-post.tsx");

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
    reporter.panicOnBuild("There was an error loading your blog posts", blogResult.errors);
  }

  const posts = blogResult.data?.allMarkdownRemark.edges ?? [];

  if (!posts.length) {
    reporter.warn("There are no posts!");
    return;
  }

  for (const post of posts) {
    const slug = post.node.fields?.slug ?? "";

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
  }

  const indexes: SearchData = {};
  posts.map((edge) => {
    const { node } = edge;
    const title = node.frontmatter?.title!;
    const route = node.fields?.slug!;

    const contentByHeading = extractContentByHeading(node.html!);
    indexes[route] = { title, data: contentByHeading };
  });

  // 마크다운의 frontmatter.locale에 따라서 분기 처리 지원 예정
  const localeKey = "ko";
  writeFileSync(`public/lazy-dev-data-${localeKey}.json`, JSON.stringify(indexes, null, 2));
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const relativeFilePath = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: "slug",
      value: relativeFilePath,
    });
  }

  if (node.internal.type === "ImageSharp") {
    if (!node.parent) return;
    const parent = getNode(node.parent);

    if (!parent?.relativeDirectory) return;
    if (parent.relativeDirectory === "author") {
      createNodeField({
        node,
        name: "authorId",
        value: parent.name,
      });
    }
  }
};

const preBodyScript = () => {
  window.__LAZY_DEV_DATA__ = {
    theme: {
      mode: "light",
      setPreferredTheme: (theme) => {
        console.error("theme preference not yet implemented");
      },
    },
    brand: "chrome",
    platform: "mac",
  };

  const getInitialColorMode = () => {
    const persistedColorPreference = window.localStorage.getItem("theme") as Theme;
    const hasPersistedPreference = typeof persistedColorPreference === "string";

    if (hasPersistedPreference) {
      return persistedColorPreference;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";

    if (hasMediaQueryPreference) {
      mql.addEventListener("change", (e) => {
        window.__LAZY_DEV_DATA__.theme.setPreferredTheme(e.matches ? "dark" : "light");
      });
      return mql.matches ? "dark" : "light";
    }

    return "light";
  };

  const theme = getInitialColorMode();
  document.documentElement.classList.add(theme);

  window.__LAZY_DEV_DATA__.theme.mode = theme;
  window.__LAZY_DEV_DATA__.theme.setPreferredTheme = (newTheme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    window.__LAZY_DEV_DATA__.theme.mode = newTheme;
    window.localStorage.setItem("theme", newTheme);
  };

  const isNavigatorDefined = typeof navigator !== "undefined";
  const userAgent = isNavigatorDefined
    ? navigator.userAgentData && Array.isArray(navigator.userAgentData.brands)
      ? navigator.userAgentData.brands
          .map((brand) => `${brand.brand.toLowerCase()} ${brand.version}`)
          .join(" ")
      : navigator.userAgent.toLowerCase()
    : "some useragent";

  const platform = isNavigatorDefined
    ? navigator.userAgentData && typeof navigator.userAgentData.platform === "string"
      ? navigator.userAgentData.platform.toLowerCase()
      : navigator.platform.toLowerCase()
    : "some platform";

  const isMacOs = platform.startsWith("mac");
  const isWindows = platform.startsWith("win");
  const isMobile =
    isNavigatorDefined && navigator.userAgentData
      ? navigator.userAgentData.mobile
      : userAgent.includes("mobile");

  const isChromium = userAgent.includes("chrome") || userAgent.includes("chromium");
  const isFirefox =
    userAgent.includes("firefox") ||
    userAgent.includes("thunderbird") ||
    userAgent.includes("librewolf");
  const isOpera = isChromium && (userAgent.includes("opr") || userAgent.includes("opera"));
  const isEdge = isChromium && userAgent.includes("edg");
  const isChrome = isChromium && !isOpera && !isEdge;
  const isSafari = !isChromium && userAgent.includes("safari");

  // 사용자의 browser, os 정보를 가져옵니다. 주로 검색창에 표시되는
  // 키보드 단축키 또는 마크다운 내 a 요소의 스타일을 변경하기 위해 사용합니다
  const platformMap: Record<Platform, boolean> = {
    mac: isMacOs,
    win: isWindows,
    mobile: isMobile,
  };
  const brandMap: Record<Brand, boolean> = {
    chrome: isChrome,
    firefox: isFirefox,
    safari: isSafari,
    edge: isEdge,
    opera: isOpera,
  };
  const brand: Brand = Object.keys(brandMap).find((key) => brandMap[key as Brand]) as Brand;
  document.documentElement.classList.add(
    `platform-${isMacOs ? "mac" : isWindows ? "win" : "mobile"}`,
  );
  document.documentElement.classList.add(`brand-${brand || "chromium"}`);

  window.__LAZY_DEV_DATA__.brand = brand;
  window.__LAZY_DEV_DATA__.platform = Object.keys(platformMap).find(
    (key) => platformMap[key as Platform],
  ) as Platform;
};

// 정적 검사, prettier, 오타 검사를 위해 문자열이 아닌 함수를 사용합니다.
// 함수를 작성한 다음 문자열화를 진행합니다.
let calledFunction = `(${preBodyScript})()`;
calledFunction = esbuild.transformSync(calledFunction, {
  minify: true,
  platform: "browser",
}).code;

/**
 * gatsby-node.ts에서 `gatsby-ssr.tsx`의 `setPreBodyComponents`에
 * 전달하기 위해 함수 결과를 `definePlugin`으로 문자열 형태로 주입합니다.
 *
 * 이렇게 하는 이유는 `gatsby-ssr.tsx`에서 직접 esbuild를 사용하여 번들링 시도 시,
 * 코드는 런타임이 아닌 Gatsby의 SSR 과정에서 실행됩니다. 이 과정에서 코드를 변환하려고 하면
 * 변환된 코드가 webpack을 통해 다시 번들링되는 과정에서 Node.js의 core 모듈들에 대한 참조가 발생합니다.
 * webpack5부터는 Node.js의 core 모듈에 대한 자동 폴리필을 제공하지 않기에,
 * 이 로직을 `gatsby-ssr.tsx`에서 실행하면 빌드 시 에러가 발생합니다.
 *
 * @see https://github.com/jaem1n207/lazy-dev/issues/73
 */
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
  plugins,
}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "process.env.LAZY_DEV_PRE_BODY_SCRIPT": JSON.stringify(calledFunction),
      }),
    ],
  });
};
