import type { GatsbyConfig } from 'gatsby';

const siteMetadata: GatsbyConfig['siteMetadata'] = {
  title: `Lazy Dev`,
  description: `웹 프론트 개발에 대한 이야기를 다룹니다.`,
  siteUrl: `https://lazyDev.gatsbyjs.io`,
  author: `Jaemin Lee`,
  lang: `ko`,
  links: {
    github: `https://github.com/jaem1n207/lazy-dev`,
  },
  favicon: `./src/images/favicon.png`,
  postTitle: `All`,
};

const corePlugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'blog',
      // eslint-disable-next-line no-undef
      path: `${__dirname}/content/blog`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'assets',
      // eslint-disable-next-line no-undef
      path: `${__dirname}/content/assets`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      // eslint-disable-next-line no-undef
      path: `${__dirname}/src/images`,
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
        Images: 'src/images',
        Pages: 'src/pages',
        Styles: 'src/styles',
        Layout: 'src/layout',
      },
      extensions: ['ts', 'tsx', 'js'],
    },
  },
  {
    resolve: 'gatsby-plugin-typescript',
  },
  'gatsby-plugin-emotion',
  'gatsby-plugin-postcss',
];

const markdownPlugins: GatsbyConfig['plugins'] = [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 630,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
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
  // feed plugin 추가
];

const pwaPlugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Lazy Dev',
      short_name: 'Lazy Dev',
      description: '웹 프론트 개발에 대한 이야기를 다룹니다.',
      lang: 'ko',
      start_url: '/',
      background_color: '#282c35',
      // This will impact how browsers show your PWA/website
      // https://css-tricks.com/meta-theme-color-and-trickery/
      // theme_color: '#efaec1',
      display: `minimal-ui`,
      icon: 'src/images/icon.png',
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
      crossOrigin: `use-credentials`,
    },
  },
  'gatsby-plugin-offline',
];

const config: GatsbyConfig = {
  graphqlTypegen: true,
  siteMetadata,
  pathPrefix: '/',
  plugins: [
    ...corePlugins,
    ...devPlugins,
    ...imagePlugins,
    ...markdownPlugins,
    ...searchPlugins,
    ...pwaPlugins,
  ],
};

export default config;
