import { useState } from 'react';

import FlexSearch from 'flexsearch';

import type { SearchData } from '@/common/types/types';

import HighlightMatches from './highlight-matches';
import Search from './search';
import type { PageIndex, Result, SearchResult, SectionIndex } from './types';

// TODO: 추후에 추가될 영문 지원을 위해 locale을 인자로 받아서 처리하도록
const locale = 'ko';

// locale에 따른 검색 인덱스를 저장하는 객체
const indexes: {
  [locale: string]: [PageIndex, SectionIndex];
} = {};

// 검색 인덱스 로드를 위한 Promise를 캐싱하는 객체
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
  // 빌드 타임 때 생성한 검색 데이터를 가져옵니다.
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

  // 각 페이지와 섹션에 대해 인덱스를 추가합니다.
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
          prefix: isFirstItemOfPage && (
            <div className="border-white/20 mx-10pxr mb-8pxr mt-24pxr select-none border-b px-4pxr pb-6pxr text-14pxr font-semibold uppercase first-of-type:mt-0">
              {result.doc.title}
            </div>
          ),
          children: (
            <>
              <div className="text-base font-bold">
                <HighlightMatches match={search} value={title} />
              </div>
              {content && (
                <div className="mt-4pxr text-sm leading-snug text-gray-600 dark:text-gray-400">
                  <HighlightMatches match={search} value={content} />
                </div>
              )}
            </>
          ),
        });
        isFirstItemOfPage = false;
      }
    }

    const prioritizedResults = results.sort((a, b) => {
      // 페이지 순위가 같으면 섹션 순위로 정렬
      if (a._page_rk === b._page_rk) {
        return a._section_rk - b._section_rk;
      }
      // 페이지 제목 일치 횟수에 따라 정렬
      if (pageTitleMatches[a._page_rk] !== pageTitleMatches[b._page_rk]) {
        return pageTitleMatches[b._page_rk] - pageTitleMatches[a._page_rk];
      }
      // 그 외의 경우 페이지 순위로 정렬
      return a._page_rk - b._page_rk;
    });

    // 정렬된 결과를 사용자에게 보여줄 형태로 변환합니다.
    const displayableResults = prioritizedResults.map((result) => ({
      id: `${result._page_rk}_${result._section_rk}`,
      route: result.route,
      prefix: result.prefix,
      children: result.children,
    }));

    setResults(displayableResults);
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
