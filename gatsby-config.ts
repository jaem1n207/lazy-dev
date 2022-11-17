import path from 'path';

import type { GatsbyConfig } from 'gatsby';

const __dirname = path.resolve();

const siteMetadata: GatsbyConfig['siteMetadata'] = {
  title: `Lazy Dev`,
  description: `jaemin's front end dev blog`,
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
      path: path.join(__dirname, 'content/blog'),
    },
    __key: 'blog',
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'assets',
      path: path.join(__dirname, 'content/assets'),
    },
    __key: 'assets',
  },
];

const devPlugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-plugin-alias-imports',
    options: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['ts', 'tsx', 'js'],
    },
  },
  {
    resolve: 'gatsby-plugin-typescript',
  },
];

const markdownPlugins: GatsbyConfig['plugins'] = ['gatsby-plugin-mdx'];

const imagePlugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-image',
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
];

const searchPlugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-sitemap',
  'gatsby-plugin-robots-txt',
];

const pwaPlugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Lazy Dev',
      short_name: 'Lazy Dev',
      description: 'jaemin`s front end dev blog',
      start_url: '/',
      background_color: '#282c35',
      theme_color: '#efaec1',
      display: 'standalone',
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
  siteMetadata,
  graphqlTypegen: true,
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
