import { ChangeEvent } from 'react';

import { Link } from 'gatsby';

import { useBoolean } from 'Apps/about/hooks/use-boolean';

import type { SearchResult } from './types';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
  error: boolean;
  results: SearchResult[];
}

const Search = ({ value, onChange: _onChange, loading, error, results }: SearchProps) => {
  const [show, { on: onShow, off: onHide }] = useBoolean(false);
  const renderResults = Boolean(value) && show;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    _onChange(e.target.value);
    value ? onShow() : onHide();
  };

  return (
    <div className="relative w-256pxr">
      <input
        className="sm:text-sm sm:leading-6 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="검색..."
      />

      {renderResults && (
        <div>
          {error ? (
            <span>검색할 데이터를 가져오지 못했어요</span>
          ) : loading ? (
            <span>데이터를 불러오는 중이에요...</span>
          ) : results.length === 0 ? (
            <span>
              <strong>{value}</strong>에 대한 검색결과가 없어요
              <br />
              {/* FIXME: 글감 요청 issue 템플릿(https://github.com/jaem1n207/lazy-dev/discussions/62) 링크 설정하기 */}
              {value}에 대한 내용이 궁금하다면 <strong>글감 요청</strong>에 남겨주세요!
            </span>
          ) : (
            results.map((result) => {
              return (
                <Link key={result.id} to={result.route}>
                  <div className="mb-16pxr">
                    {result.prefix}
                    {result.children}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
