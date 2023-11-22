interface HighlightMatchesProps {
  match: string;
  value?: string;
}

// eslint-disable-next-line unused-imports/no-unused-vars
const HighlightMatches = ({ match, value }: HighlightMatchesProps) => {
  if (!value) return null;

  // FIXME: 매칭되는 글자 하이라이트 스타일 부여하는 로직 작성

  return <div>{value}</div>;
};

export default HighlightMatches;

// TODO:
/**
 * `escapeStringRegexp` 패키지 사용하여 검색 문자열과 일치하는 문자열에 대해 하이라이팅 스타일 부여
 * 현재 선택된 인덱스의 리스트를 가리키는 (position: absolute) SyncListHighlight 컴포넌트 구현
 */
