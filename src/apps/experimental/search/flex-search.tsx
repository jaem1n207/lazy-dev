import * as React from 'react';

import FlexSearch from 'flexsearch';
import { graphql, useStaticQuery } from 'gatsby';

type PageIndex = FlexSearch.Document<
  {
    id: number;
    title: string;
    content: string;
  },
  ['title']
>;

type SectionIndex = FlexSearch.Document<
  {
    id: string;
    url: string;
    title: string;
    content: string;
  },
  ['url', 'title', 'content']
>;

type SearchData = {
  id: string;
  title: string;
  content: string;
  url: string;
};

// type SearchData = {
//   [route: string]: {
//     title: string;
//     data: any;
//   };
// };

type Result = {
  _page_rk: number;
  _section_rk: number;
  route: string;
  prefix: React.ReactNode;
  children: React.ReactNode;
};

// 캐싱
// const indexes: [PageIndex, SectionIndex] = [];

const useFetchSearchData = async (): Promise<SearchData[]> => {
  const searchDataQuery = useStaticQuery<Queries.SearchDataQuery>(graphql`
    query SearchData {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
            rawMarkdownBody
            id
          }
        }
      }
    }
  `).allMarkdownRemark.edges;

  const normalizedData = searchDataQuery.map(({ node }) => ({
    id: node.id,
    title: node.frontmatter?.title!,
    content: node.rawMarkdownBody!,
    url: node.fields?.slug!,
  }));

  return normalizedData;
};

const useLoadIndexesImpl = async () => {
  const searchData = await useFetchSearchData();

  const pageIndex: PageIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      field: ['title'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  const sectionIndex: SectionIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      tag: 'url',
      field: ['url', 'title', 'content'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  console.log(
    '🚀 ~ file: flex-search.tsx:75 ~ useLoadIndexesImpl ~ searchData:',
    JSON.stringify(searchData[0].content),
  );
};

const Flexsearch = () => {
  useLoadIndexesImpl();

  return <div>Flexsearch</div>;
};

export default Flexsearch;
