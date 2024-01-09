import type { ReactNode } from "react";
import FlexSearch from "flexsearch";

export type PageIndex = FlexSearch.Document<
  {
    id: number;
    title: string;
    content: string;
  },
  ["title"]
>;

export type SectionIndex = FlexSearch.Document<
  {
    id: string;
    title: string;
    content: string;
    url: string;
    pageId: string;
  },
  ["title", "content", "url"]
>;

export type Result = {
  _page_rk: number;
  _section_rk: number;
  route: string;
  prefix: ReactNode;
  children: ReactNode;
};

export type SearchResult = {
  route: string;
  prefix?: ReactNode;
  id: string;
  children: ReactNode;
};
