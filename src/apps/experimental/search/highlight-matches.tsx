import React from 'react';

interface HighlightMatchesProps {
  match: string;
  value?: string;
}

const HighlightMatches = ({ match, value }: HighlightMatchesProps) => {
  if (!value) return null;

  // FIXME: 매칭되는 글자 하이라이트 스타일 부여하는 로직 작성

  return <div>{value}</div>;
};

export default HighlightMatches;

// TODO
/**
 * `escapeStringRegexp` 패키지 사용하여 검색 문자열과 일치하는 문자열에 대해 하이라이팅 스타일 부여
 * 현재 선택된 인덱스의 리스트를 가리키는 (position: absolute) SyncListHighlight 컴포넌트 구현
 */

// async function fetchTodo(id) {
//   const data = await fetchDataFromCache(`/api/todos/${id}`)
//   return { contents: data.contents }
// }

// function Todo({ id, isSelected }) {
//   const todo = use(fetchTodo(id))
//   return (
//     <div className={isSelected ? 'selected-todo' : 'normal-todo'}>
//       {todo.contents}
//     </div>
//   )
// }

// isSelected가 변하고 id가 변하지 않았을 때 fetchTodo를 호출하지 않고 캐시된 데이터를 사용하는지 테스트
// 참고: https://yceffort.kr/2023/06/react-use-hook
