export type OpenGraph = OpenGraphWebsite | OpenGraphArticle | OpenGraphMetadata;

type Locale = string;

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

type OpenGraphWebsite = OpenGraphMetadata & {
  type: 'website';
};
type OpenGraphArticle = OpenGraphMetadata & {
  type: 'article';
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: null | string | Array<string | URL>;
  section?: null | string;
  tags?: null | string | Array<string>;
};
