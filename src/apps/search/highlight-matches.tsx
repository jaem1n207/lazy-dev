import { ReactNode } from 'react';

import escapeStringRegexp from 'escape-string-regexp';

interface HighlightMatchesProps {
  /**
   * 검색어
   */
  match: string;
  /**
   * 검색 대상 문자열
   */
  value?: string;
}

const processSearchTerm = (searchTerm: string) => {
  // 특수문자가 포함되어 있어도 안전하게 정규식 생성
  const escapedSearch = escapeStringRegexp(searchTerm.trim());

  // 여러 검색어를 탐색하기 위해 공백을 OR 연산자로 대체
  const regexp = new RegExp(escapedSearch.replaceAll(' ', '|'), 'ig');

  return regexp;
};

const createSearchResult = (value: string, regexp: RegExp) => {
  const splitValue = value.split('');
  let result;
  let index = 0;
  const content: (string | ReactNode)[] = [];

  while ((result = regexp.exec(value)) && regexp.lastIndex !== 0) {
    const before = splitValue.splice(0, result.index - index).join('');
    const after = splitValue.splice(0, regexp.lastIndex - result.index).join('');
    content.push(
      before,
      <span key={result.index} className="text-primary">
        {after}
      </span>,
    );
    // 다음 검색 시작 위치 지정
    index = regexp.lastIndex;
  }

  return { content, remaining: splitValue.join('') };
};

const HighlightMatches = ({ match, value }: HighlightMatchesProps) => {
  if (!value) return null;

  const regexp = processSearchTerm(match);
  const { content, remaining } = createSearchResult(value, regexp);

  return (
    <>
      {content}
      {remaining}
    </>
  );
};

export default HighlightMatches;
