import * as React from 'react';

export type SeoProps = {
  description?: string | null;
  thumbnail?: string | null;
  pathname?: string;
  children?: React.ReactNode;
  openGraph?: OpenGraph | null;
  twitter?: Twitter | null;
} & Pick<Queries.SiteSiteMetadata, 'title'>;

type OpenGraph = OpenGraphWebsite | OpenGraphArticle | OpenGraphMetadata;

type Twitter =
  | TwitterSummary
  | TwitterSummaryLargeImage
  | TwitterPlayer
  | TwitterApp
  | TwitterMetadata;

type TwitterMetadata = {
  site?: string;
  siteId?: string;
  creator?: string;
  creatorId?: string;
  description?: string;
  title?: string;
  images?: string;
};
type TwitterSummary = TwitterMetadata & {
  card: 'summary';
};
type TwitterSummaryLargeImage = TwitterMetadata & {
  card: 'summary_large_image';
};
type TwitterPlayer = TwitterMetadata & {
  card: 'player';
  players: TwitterPlayerDescriptor | Array<TwitterPlayerDescriptor>;
};
type TwitterApp = TwitterMetadata & {
  card: 'app';
  app: TwitterAppDescriptor;
};

type TwitterAppDescriptor = {
  id: {
    iphone?: string | number;
    ipad?: string | number;
    googleplay?: string;
  };
  url?: {
    iphone?: string | URL;
    ipad?: string | URL;
    googleplay?: string | URL;
  };
  name?: string;
};

type TwitterPlayerDescriptor = {
  playerUrl: string | URL;
  streamUrl: string | URL;
  width: number;
  height: number;
};

type OpenGraphMetadata = {
  determiner?: 'a' | 'an' | 'the' | 'auto' | '';
  title?: string;
  description?: string;
  emails?: string | Array<string>;
  phoneNumbers?: string | Array<string>;
  faxNumbers?: string | Array<string>;
  siteName?: string;
  locale?: Locale;
  alternateLocale?: Locale | Array<Locale>;
  image?: string;
  url?: string | URL;
  countryName?: string;
  ttl?: number;
};

type Locale = string;

type OpenGraphWebsite = OpenGraphMetadata & {
  type: 'website';
};
type OpenGraphArticle = OpenGraphMetadata & {
  type: 'article';
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: null | string | URL | Array<string | URL>;
  section?: null | string;
  tags?: null | string | Array<string>;
};
