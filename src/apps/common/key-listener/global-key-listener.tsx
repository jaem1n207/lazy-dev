// 로직 작성 고민 포인트..
// 이건 모달, 팝업 등이 열려 있을 경우 `ESC` 눌러 닫히도록 하는 로직을 선언적으로 관리하기 위함이다.
// 그럼 `CMD+K` 눌렀을 때 검색창이 열리는 로직은 어떻게 관리할까? 이 컴포넌트에서 처리되도록 할까, 아니면 `hot-key-listener`를 따로 만들어 단일 책임으로 관리할까?
// 단축키의 경우, 결국 언젠가 중복되는 단축키가 있을 것이고 ex) cmd+k: 검색창 열기, 사이드바 닫기 등... 이런 경우는 포커스를 둔 컴포넌트가 단축키를 처리하도록 하는 것이 좋을 것 같다.
// `div`, `span` 같은 논인터랙티브 태그는 tabIndex를 주어 포커스를 줄 수 있다. 이 경우, `tabIndex={1}`로 주는 게 좋을 것이다. 사용자의 키보드 이벤트에 대해 반응하지 않으면서 스크립트로 포커스를 줄 수 있기 때문이다.
// 흠.. 고려할 게 너무 많은 것 같은데 그냥 `hot-key-listener`를 만들어서 관리하는 게 좋을 것 같기도 하다. 고민해보자

// using Example
// ESC, Command, Ctrl, K
{
  /* <GlobalKeyListener
  keyEvent="keydown"
  keyCode={Key.ESC}
  handler={handleClose}
/> */
}

const GlobalKeyListener = () => {
  return <div>GlobalKeyListener</div>;
};

export default GlobalKeyListener;
