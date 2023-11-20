import React, { useState } from 'react';

import FlexSearch from 'flexsearch';
import { Link } from 'gatsby';

import HighlightMatches from './highlight-matches';
// FIXME: 빌드할 때 만들어 둔 json 파일을 필요할 때 가져오도록 수정하는 건 어떨까 생각 중...
import searchData from './lazy-dev-data.json';
import type { PageIndex, Result, SearchResult, SectionIndex } from './types';

// FIXME: index 데이터 캐싱 => 컨텍스트에 담아 재사용하도록 해야하나 고민 중...
const indexes: {
  [locale: string]: [PageIndex, SectionIndex];
} = {};

const loadIndexesPromises = new Map<string, Promise<void>>();
const loadIndexes = (): Promise<void> => {
  const key = '@ko';
  if (loadIndexesPromises.has(key)) {
    return loadIndexesPromises.get(key)!;
  }
  const promise = loadIndexesImpl();
  loadIndexesPromises.set(key, promise);

  return promise;
};

const loadIndexesImpl = async () => {
  // const searchData = (await import('./lazy-dev-data.json')) as unknown as SearchData;

  const pageIndex: PageIndex = new FlexSearch.Document({
    // FIXME: 문서에선 인코더 함수로 한글 문자열 나눠서 색인화할 수 있는 걸로 보여지나, 영어가 망가지는 문제가 있음.
    // 뭔가 적절히 수정해서 사용할 수 있을 것 같긴 한데, 일단은 주석 처리하고 나중에 필요할 때 다시 생각해보기로
    // Korean Word Break https://github.com/nextapps-de/flexsearch#cjk-word-break-chinese-japanese-korean
    encode: (str) => str.replace(/[\x20-\x7F]/g, '').split(''),
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
      store: ['title', 'content', 'url', 'display'],
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

      // Add the page itself.
      pageContent += ` ${title} ${content}`;
    }

    pageIndex.add({
      id: pageId,
      title: StructuredData.title,
      content: pageContent,
    });
  }

  indexes['ko'] = [pageIndex, sectionIndex];
};

const Flexsearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const doSearch = (search: string) => {
    if (!search || !indexes) return;

    const [pageIndex, sectionIndex] = indexes['ko'];

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
      const occurred: Record<string, boolean> = {};

      for (let j = 0; j < sectionResults.length; j++) {
        const { doc } = sectionResults[j];
        const isMatchingTitle = doc.display !== undefined;
        if (isMatchingTitle) {
          pageTitleMatches[i]++;
        }
        const { url, title } = doc;
        const content = doc.display || doc.content;
        if (occurred[url + '@' + content]) continue;
        occurred[url + '@' + content] = true;
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

  const preload = async (active: boolean) => {
    if (active && !indexes['ko']) {
      setLoading(true);
      try {
        await loadIndexes();
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }
  };

  const onChange = async (value: string) => {
    setSearch(value);

    if (loading) {
      return;
    }
    if (!indexes['ko']) {
      setLoading(true);
      try {
        await loadIndexes();
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    }

    doSearch(value);
  };

  return (
    <div>
      <input
        className="sm:text-sm sm:leading-6 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        type="text"
        value={search}
        onChange={(e) => onChange(e.target.value)}
        placeholder="검색..."
      />

      <div>
        {loading && 'Loading...'}
        {error && 'Error'}
      </div>

      <div>
        {results.map((result) => {
          return (
            <Link key={result.id} to={result.route}>
              <div className="mb-16pxr">
                {result.prefix}
                {result.children}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Flexsearch;
