import * as dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const siteMetadata: GatsbyConfig['siteMetadata'] = Object.freeze({
  title: 'Lazy Dev',
  description: '웹 프론트 개발에 대한 이야기를 다룹니다.',
  siteUrl: 'https://lazyDev.gatsbyjs.io',
  author: {
    name: 'Jaemin Lee',
    summary: '웹 프론트 개발자',
  },
  lang: 'ko',
  social: {
    github: 'https://github.com/jaem1n207',
  },
  favicon: '/images/favicon.png',
  postTitle: 'All',
});

const analyserPlugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
    options: {
      devMode: false,
    },
  },
];

const corePlugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'blog',
      path: `${__dirname}/content/blog`,
      // https://www.gatsbyjs.com/docs/reference/release-notes/v5.5/#faster-hashing-for-gatsby-source-filesytem
      fastHash: true,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'assets',
      path: `${__dirname}/content/assets`,
      fastHash: true,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images`,
      fastHash: true,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/data`,
      name: 'data',
    },
  },
  'gatsby-transformer-json',
  {
    resolve: `gatsby-plugin-gatsby-cloud`,
    options: {
      headers: {
        '/*.css': ['Cache-Control: public, max-age=31536000, immutable'],
        '/images/*': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/static/*': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/fonts/*': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/page-data/*': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/app-data.json': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/sw.js': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/**/*.html': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/sitemap-*.xml': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/rss.xml': ['Cache-Control: public, max-age=0, must-revalidate'],
      }, // 헤더를 추가하는 옵션입니다. `Link` 헤더는 아래 기준으로 변환됩니다
      /**
       * @see: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-sri-for
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/sandbox
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/upgrade-insecure-requests
       *
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/geolocation
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/microphone
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/camera
       * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/payment
       */
      allPageHeaders: [
        'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
        'X-Content-Type-Options: nosniff',
        'X-Frame-Options: SAMEORIGIN',
        'Referrer-Policy: no-referrer-when-downgrade',
        "Content-Security-Policy: default-src https: data: 'unsafe-inline' 'unsafe-eval'",
        'Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()',
      ], // 모든 페이지의 헤더를 추가하는 옵션. `Link` 헤더는 아래 기준으로 변환됩니다.
      mergeSecurityHeaders: true, // 기본적인 보안 헤더를 해제할지 여부
      mergeLinkHeaders: true, // 기본적인 Gatsby.js 헤더를 해제할지 여부
      mergeCachingHeaders: true, // 기본 캐싱 헤더를 해제할지 여부
      transformHeaders: (headers: any) => headers, // 각 경로(예: 헤더)에서 헤더를 조작하기 위한 선택적 변환 함수
      generateMatchPathRewrites: true, // 클라이언트 전용 경로에 대한 리디렉션 규칙 자동 작성을 해제할지 여부
    },
  },
];

const devPlugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-plugin-alias-imports',
    options: {
      alias: {
        Components: 'src/components',
        Hooks: 'src/hooks',
        Libs: 'src/libs',
        Images: 'src/images',
        Pages: 'src/pages',
        Styles: 'src/styles',
        Layout: 'src/layout',
        Templates: 'src/templates',
        Types: 'src/types',
        Apps: 'src/apps',
        Utils: 'src/utils',
      },
      extensions: ['ts', 'tsx', 'js'],
    },
  },
  {
    resolve: 'gatsby-plugin-typography',
    options: {
      pathToConfigModule: 'src/styles/typography',
    },
  },
  {
    resolve: 'gatsby-plugin-typescript',
  },
  'gatsby-plugin-emotion',
  {
    resolve: 'gatsby-plugin-postcss',
    options: {
      postCssPlugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
];

const markdownPlugins: GatsbyConfig['plugins'] = [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1000,
            linkImagesToOriginal: false,
          },
        },
        {
          resolve: `gatsby-remark-images-medium-zoom`,
          options: {
            background: 'rgba(0,0,0,0.8)',
            margin: 12,
            scrollOffset: 0,
            zIndex: 90,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        {
          resolve: `gatsby-remark-table-of-contents`,
          options: {
            exclude: '목차',
            fromHeading: 1,
            toHeading: 6,
            className: 'table-of-contents',
          },
        },
        `gatsby-remark-autolink-headers`,
        `gatsby-remark-prismjs`,
        `gatsby-remark-emoji`,
      ],
    },
  },
];

const imagePlugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-image',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
];

const searchPlugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-sitemap',
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      policy: [{ userAgent: '*', allow: '/' }],
    },
  },
  {
    resolve: 'gatsby-plugin-feed',
    options: {
      query: `{
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }`,
      feeds: [
        {
          serialize: ({
            query: { site, allMarkdownRemark },
          }: {
            query: { site: any; allMarkdownRemark: any };
          }) => {
            return allMarkdownRemark.nodes.map((node: any) => {
              return Object.assign({}, node.frontmatter, {
                description: node.frontmatter.summary,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }],
              });
            });
          },
          query: `{
            allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
              nodes {
                html
                fields {
                  slug
                }
                frontmatter {
                  title
                  date
                  summary
                }
              }
            }
          }`,
          output: '/rss.xml',
          title: 'Lazy Dev Blog RSS Feed',
        },
      ],
    },
  },
];

const pwaPlugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Lazy Dev',
      short_name: 'Lazy Dev',
      description: '웹 프론트 개발에 대한 이야기를 다룹니다.',
      start_url: '/',
      scope: '/',
      background_color: '#1C1C1E',
      theme_color: '#86bff2',
      // This will impact how browsers show your PWA/website
      // https://css-tricks.com/meta-theme-color-and-trickery/
      display: `standalone`,
      orientation: `portrait`,
      icon: './static/images/favicon.png',
      icon_options: {
        purpose: `any maskable`,
      },
      icons: [
        {
          src: './public/icons/icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: './public/icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: './public/icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: './public/icons/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: './public/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: './public/icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: './public/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: './public/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
  'gatsby-plugin-offline',
];

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
  },
  graphqlTypegen: true,
  siteMetadata,
  plugins: [
    ...analyserPlugins,
    ...corePlugins,
    ...devPlugins,
    ...imagePlugins,
    ...markdownPlugins,
    ...searchPlugins,
    ...pwaPlugins,
  ],
};

export default config;
