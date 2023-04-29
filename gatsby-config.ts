import * as dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const siteMetadata: GatsbyConfig['siteMetadata'] = {
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
};

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
    resolve: `gatsby-plugin-gatsby-cloud`,
    options: {
      headers: {
        '/*': ['Cache-Control: public, max-age=31536000, immutable'],
        'static/*': ['Cache-Control: public, max-age=31536000, immutable'],
      }, // option to add more headers. `Link` headers are transformed by the below criteria
      /**
       * @see: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html
       */
      allPageHeaders: ['Strict-Transport-Security: max-age=31536000; includeSubDomains; preload'], // option to add headers for all pages. `Link` headers are transformed by the below criteria
      mergeSecurityHeaders: true, // boolean to turn off the default security headers
      mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
      mergeCachingHeaders: true, // boolean to turn off the default caching headers
      transformHeaders: (headers: any) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
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
  'gatsby-plugin-robots-txt',
  {
    resolve: 'gatsby-plugin-feed',
    options: {
      query: `{
        site {
          siteMetadata {
            title
            description
            siteUrl
            site_url: siteUrl
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
    DEV_SSR: false,
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
