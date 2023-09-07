export type ExtendMetaContent = Record<string, undefined | string | URL | number | boolean | null>;

export type MultiMetaContent =
  | string
  | (ExtendMetaContent | string | URL | number)[]
  | null
  | undefined;

export type ColorSchemeEnum =
  | 'normal'
  | 'light'
  | 'dark'
  | 'light dark'
  | 'dark light'
  | 'only light';

export type ThemeColorDescriptor = {
  color: string;
  media?: string;
};

export type Author = {
  url?: string | URL;
  name?: string;
};
