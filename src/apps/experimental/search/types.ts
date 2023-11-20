import type { ReactNode } from 'react';

import FlexSearch from 'flexsearch';

export type SectionIndex = FlexSearch.Document<
  {
    id: string;
    url: string;
    title: string;
    pageId: string;
    content: string;
    display?: string;
  },
  ['title', 'content', 'url', 'display']
>;

export type PageIndex = FlexSearch.Document<
  {
    id: number;
    title: string;
    content: string;
  },
  ['title']
>;

export type Result = {
  _page_rk: number;
  _section_rk: number;
  route: string;
  prefix: ReactNode;
  children: ReactNode;
};

export type SearchResult = {
  children: ReactNode;
  id: string;
  prefix?: ReactNode;
  route: string;
};
