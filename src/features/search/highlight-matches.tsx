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
 * 사용자의 검색어를 안전하게 정규식으로 변환합니다.
 * @see https://github.com/jaem1n207/lazy-dev/issues/65
 * @param searchTerm 사용자가 입력한 검색어
 * @returns 검색어에 해당하는 정규식
 */
const processSearchTerm = (searchTerm: string): RegExp => {
  const trimmedSearchTerm = searchTerm.trim();

  // 공백을 기준으로 단어를 분리하고, 빈 문자열을 제거합니다.
  const searchWords = trimmedSearchTerm.split(/\s+/).filter(Boolean);

  if (searchWords.length > 0) {
    // 단어들을 정규식에서 사용할 수 있도록 이스케이프 처리하고, OR 연산자(|)로 연결합니다.
    const escapedSearch = searchWords.map(escapeStringRegexp).join("|");

    return new RegExp(escapedSearch, "ig");
  }

  // 검색어가 비어있는 경우, 매치되지 않는 정규식을 반환합니다.
  return new RegExp("$.^", "ig");
};

/**
 * 검색 결과를 생성하고, 일치하는 부분을 하이라이트합니다.
 * @param value 검색 대상 전체 텍스트
 * @param regexp 사용자의 검색어에 해당하는 정규식
 * @returns 하이라이트된 검색 결과와 남은 텍스트
 */
const createSearchResult = (value: string, regexp: RegExp) => {
  const splitValue = value.split("");
  let index = 0; // 현재 검색 위치를 추적합니다.
  const content: (string | ReactNode)[] = [];

  let result = regexp.exec(value);
  while (result) {
    if (result.index === regexp.lastIndex) {
      // 빈 문자열에 대한 검색을 방지하기 위해 lastIndex를 증가시킵니다.
      regexp.lastIndex++;
    } else {
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
    }

    result = regexp.exec(value);
  }

  return { content, remaining: splitValue.join("") };
};

/**
 * 검색어와 전체 문자열을 받아 하이라이트된 검색 결과를 반환하는 컴포넌트입니다.
 */
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
