import React from 'react';

const HighlightMatches = () => {
  return <div>HighlightMatches</div>;
};

export default HighlightMatches;

// TODO
/**
 * `escapeStringRegexp` 패키지 사용하여 검색 문자열과 일치하는 문자열에 대해 하이라이팅 스타일 부여
 * 현재 선택된 인덱스의 리스트를 가리키는 (position: absolute) SyncListHighlight 컴포넌트 구현
 * md 파일에서 html 내용 중, svg, img, pre 등은 제거해서 flexSearch Document의 content 값으로 주입 => vite plugin을 만들어야 하나? -> 만든다면 lazy-dev-search?
 * mdx 컴파일 과정과 개츠비 md 컴파일 과정 비교 후 데이터 정의
 * PageIndex: {title: '큰 페이지 하나의 제목 (라우터 페이지 제목)'}
 * SectionIndex: {title: '큰 페이지 하나의 제목 (라우터 페이지 제목)', content: '헤딩별 콘텐츠 (h2, h3 안의 콘텐츠 내용 p태그)', url: 'slug', 'display: 'content와 비슷한데 정확한 개념 정리 필요'}
 * 마크다운 컴파일 결과 데이터는 abc.json 파일 참고
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
