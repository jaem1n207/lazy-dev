const siteMetadata = {
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

const corePlugins = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'blog',
      path: `${__dirname}/content/blog`,
    },
    __key: 'blog',
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'assets',
      path: `${__dirname}/content/assets`,
    },
    __key: 'assets',
  },
];

const devPlugins = [
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

const markdownPlugins = ['gatsby-plugin-mdx'];

const imagePlugins = ['gatsby-plugin-image', 'gatsby-plugin-sharp', 'gatsby-transformer-sharp'];

const searchPlugins = [
  'gatsby-plugin-sitemap',
  'gatsby-plugin-robots-txt',
  // feed plugin 추가
];

const pwaPlugins = [
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Lazy Dev',
      short_name: 'Lazy Dev',
      description: 'jaemin`s front end dev blog',
      lang: 'ko',
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

const config = {
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

module.exports = config;
