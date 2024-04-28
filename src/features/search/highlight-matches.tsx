import type { ReactNode } from "react";
import escapeStringRegexp from "escape-string-regexp";

interface HighlightMatchesProps {
  /**
   * 사용자가 입력한 검색어
   */
  match: string;
  /**
   * 검색 대상 문자열
   */
  value?: string;
}

/**
 * 검색 결과를 생성하고, 일치하는 부분을 하이라이트합니다.
 * @param value 검색 대상 전체 텍스트
 * @param regexp 사용자의 검색어에 해당하는 정규식
 * @returns 하이라이트된 검색 결과와 남은 텍스트
 */
const createSearchResult = (value: string, regexp: RegExp) => {
  const splitValue = value.split("");
  let result = regexp.exec(value);
  let index = 0; // 현재 검색 위치를 추적합니다.
  const content: (string | ReactNode)[] = [];

  while (result) {
    const before = splitValue.splice(0, result.index - index).join("");
    const matched = splitValue.splice(0, regexp.lastIndex - result.index).join("");
    content.push(
      before,
      <span key={result.index} className="text-primary">
        {matched}
      </span>,
    );
    // 다음 검색을 위해 현재 검색 위치를 갱신합니다.
    index = regexp.lastIndex;
    result = regexp.exec(value);
  }

  return { content, remaining: splitValue.join("") };
};

/**
 * 검색어와 전체 문자열을 받아 하이라이트된 검색 결과를 반환하는 컴포넌트입니다.
 */
const HighlightMatches = ({ match, value }: HighlightMatchesProps) => {
  if (!value) return null;

  const escapedSearch = escapeStringRegexp(match.trim());
  const regexp = new RegExp(escapedSearch.replaceAll(/\s+/g, "|"), "ig");
  const { content, remaining } = createSearchResult(value, regexp);

  return (
    <>
      {content}
      {remaining}
    </>
  );
};

export default HighlightMatches;
