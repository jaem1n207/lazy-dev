import type { GatsbyConfig } from 'gatsby';
import { default as netlifyAdapter } from 'gatsby-adapter-netlify';

const siteMetadata = Object.freeze({
  title: 'Lazy Dev',
  description: '웹 프론트 개발에 대한 이야기를 다룹니다.',
  siteUrl: 'https://lazy-dev.netlify.app',
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
  'gatsby-transformer-json',
];

const devPlugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-plugin-alias-imports',
    options: {
      alias: {
        Hooks: 'src/hooks',
        Images: 'src/images',
        Pages: 'src/pages',
        Styles: 'src/styles',
        Layout: 'src/layout',
        Types: 'src/types',
        Apps: 'src/apps',
        Utils: 'src/utils',
      },
      extensions: ['ts', 'tsx', 'js'],
    },
  },
  {
    resolve: 'gatsby-plugin-typescript',
  },
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
      host: siteMetadata.siteUrl,
      sitemap: `${siteMetadata.siteUrl}/sitemap-0.xml`,
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
                description: node.excerpt,
                date: node.frontmatter.date,
                url: encodeURI(site.siteMetadata.siteUrl + node.fields.slug),
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }],
              });
            });
          },
          query: `{
            allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
              nodes {
                excerpt
                html
                fields {
                  slug
                }
                frontmatter {
                  title
                  date
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
      name: siteMetadata.title,
      short_name: siteMetadata.title,
      description: siteMetadata.description,
      start_url: '/',
      theme_color: '#86bff2',
      background_color: '#1C1C1E',
      // This will impact how browsers show your PWA/website
      // https://css-tricks.com/meta-theme-color-and-trickery/
      display: `standalone`,
      orientation: `portrait`,
      icon: './static/images/favicon.png',
      icon_options: {
        purpose: `any maskable`,
      },
    },
  },
  'gatsby-plugin-offline',
];

const config: GatsbyConfig = {
  jsxRuntime: 'automatic',
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    DEV_SSR: true,
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
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
  adapter: netlifyAdapter({
    excludeDatastoreFromEngineFunction: false,
  }),
};

export default config;
