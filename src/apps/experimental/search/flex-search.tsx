import React, { useState } from 'react';

import FlexSearch from 'flexsearch';

import type { SearchData } from 'Types/types';

import HighlightMatches from './highlight-matches';
import Search from './search';
import type { PageIndex, Result, SearchResult, SectionIndex } from './types';

// 추후에 추가될 영문 지원을 위해 locale을 인자로 받아서 처리하도록
const locale = 'ko';

const indexes: {
  [locale: string]: [PageIndex, SectionIndex];
} = {};

// index 로드하는 promise를 캐싱하기 위한 map
const loadIndexesPromises = new Map<string, Promise<void>>();
const loadIndexes = (locale: string): Promise<void> => {
  const key = `@${locale}`;
  if (loadIndexesPromises.has(key)) {
    return loadIndexesPromises.get(key)!;
  }
  const promise = loadIndexesImpl(locale);
  loadIndexesPromises.set(key, promise);

  return promise;
};

const loadIndexesImpl = async (locale: string) => {
  // 서버측에서 직렬화한 데이터를 가져옵니다.
  const searchData = await fetch(`/lazy-dev-data-${locale}.json`).then<SearchData>((res) =>
    res.json(),
  );

  const pageIndex: PageIndex = new FlexSearch.Document({
    // 문서에선 인코더 함수로 한글 문자열 지원을 하는 것으로 파악되지만, 잘 동작하지 않습니다 https://github.com/nextapps-de/flexsearch#cjk-word-break-chinese-japanese-korean
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      store: ['title'],
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
      tag: 'pageId',
      store: ['title', 'content', 'url'],
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true,
    },
  });

  let pageId = 0;

  for (const [route, StructuredData] of Object.entries(searchData)) {
    let pageContent = '';
    ++pageId;

    for (const [key, content] of Object.entries(StructuredData.data)) {
      const [headingId, headingValue] = key.split('#');
      const url = route + (headingId ? '#' + headingId : '');
      const title = headingValue || StructuredData.title;
      const paragraphs = content.split('\n');

      sectionIndex.add({
        id: url,
        url,
        title,
        pageId: `page_${pageId}`,
        content: title,
        ...(paragraphs[0] && { display: paragraphs[0] }),
      });

      for (let i = 0; i < paragraphs.length; i++) {
        sectionIndex.add({
          id: `${url}_${i}`,
          url,
          title,
          pageId: `page_${pageId}`,
          content: paragraphs[i],
        });
      }

      pageContent += ` ${title} ${content}`;
    }

    pageIndex.add({
      id: pageId,
      title: StructuredData.title,
      content: pageContent,
    });
  }

  indexes[locale] = [pageIndex, sectionIndex];
};

const Flexsearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const doSearch = (search: string) => {
    if (!search) return;

    const [pageIndex, sectionIndex] = indexes[locale];

    const pageResults =
      pageIndex.search<true>(search, 5, {
        enrich: true,
        suggest: true,
      })[0]?.result || [];

    const results: Result[] = [];
    const pageTitleMatches: Record<number, number> = {};

    for (let i = 0; i < pageResults.length; i++) {
      const result = pageResults[i];
      pageTitleMatches[i] = 0;

      const sectionResults =
        sectionIndex.search<true>(search, 5, {
          enrich: true,
          suggest: true,
          tag: `page_${result.id}`,
        })[0]?.result || [];

      let isFirstItemOfPage = true;

      for (let j = 0; j < sectionResults.length; j++) {
        const { doc } = sectionResults[j];
        const { url, title } = doc;
        const content = doc.content;

        results.push({
          _page_rk: i,
          _section_rk: j,
          route: url,
          prefix: isFirstItemOfPage && <div>{result.doc.title}</div>,
          children: (
            <>
              <div>
                <HighlightMatches match={search} value={title} />
              </div>
              {content && (
                <div>
                  <HighlightMatches match={search} value={content} />
                </div>
              )}
            </>
          ),
        });
        isFirstItemOfPage = false;
      }
    }

    setResults(
      results
        .sort((a, b) => {
          // title이 매칭되는 횟수가 많은 순서대로 정렬
          if (a._page_rk === b._page_rk) {
            return a._section_rk - b._section_rk;
          }
          if (pageTitleMatches[a._page_rk] !== pageTitleMatches[b._page_rk]) {
            return pageTitleMatches[b._page_rk] - pageTitleMatches[a._page_rk];
          }
          return a._page_rk - b._page_rk;
        })
        .map((res) => ({
          id: `${res._page_rk}_${res._section_rk}`,
          route: res.route,
          prefix: res.prefix,
          children: res.children,
        })),
    );
  };

  const onChange = async (value: string) => {
    setSearchQuery(value);

    if (loading) return;

    if (!indexes[locale]) {
      setLoading(true);
      try {
        await loadIndexes(locale);
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    }

    doSearch(value);
  };

  return (
    <Search
      value={searchQuery}
      onChange={onChange}
      loading={loading}
      error={error}
      results={results}
    />
  );
};

export default Flexsearch;
