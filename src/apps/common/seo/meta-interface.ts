import type { Author, ColorSchemeEnum, ThemeColorDescriptor } from './meta-types';
import type { OpenGraph } from './opengraph-types';

export interface Metadata {
  title?: string | null;
  description?: string | null;
  authors?: null | Author | Array<Author>;
  creator?: null | string;
  publisher?: null | string;
  openGraph?: OpenGraph | null;
  keywords?: null | string | Array<string>;
  themeColor?: null | string | ThemeColorDescriptor | ThemeColorDescriptor[];
  colorScheme?: null | ColorSchemeEnum;
}
