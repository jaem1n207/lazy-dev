// 로직 작성 고민 포인트..
// 이건 모달, 팝업 등이 열려 있을 경우 `ESC` 눌러 닫히도록 하는 로직을 선언적으로 관리하기 위함이다.
// 단축키의 경우, 결국 언젠가 중복되는 단축키가 있을 것이고 ex) cmd+k: 검색창 열기, 사이드바 닫기 등... 이런 경우는 포커스를 둔 컴포넌트가 단축키를 처리하도록 하는 것이 좋을 것 같다.
// KeyListener 컴포넌트를 분리하는 것보다는 확장하여 두 개의 key code가 입력되는 상황을 처리하는 게 더 좋을 것 같다. 이렇게 하면 코드의 재사용성이 높아지고, 관련 로직이 한 곳에서 관리되므로 유지 보수가 더 쉬워질 것 같기 때문이다.

import { RefObject, useCallback, useEffect, useRef } from 'react';

export const Keys = {
  ESC: 27,
  CMD: 91,
  CTRL: 17,
  K: 75,
};
type UnionKeys = (typeof Keys)[keyof typeof Keys];

type KeyListenerProps = {
  /**
   * 이벤트 핸들러가 연결될 DOM 요소에 대한 참조입니다.
   *
   * 이 참조가 제공되면, 해당 요소가 현재 포커스된 요소인지 확인하고,
   * 포커스된 경우에만 이벤트 핸들러를 호출합니다.
   *
   * `div`, `span` 등과 같은 논인터랙티브 요소는 포커스를 받을 수 없습니다.
   * 이런 요소가 타겟 요소인 경우, `tabIndex` 속성을 통해 포커스를 받을 수 있도록 설정해야 합니다.
   * 키보드 탐색을 통해 해당 요소에 도달할 수 없도록 `tabIndex: -1`로 설정하는 것이 좋습니다.
   */
  targetRef?: RefObject<HTMLElement>;
  /**
   * 감지할 키 코드입니다.
   *
   * 단일 키를 지정할 수도 있고, 여러 키를 동시에 감지하고 싶은 경우엔 배열로 지정할 수 있습니다.
   */
  keyCode: UnionKeys | UnionKeys[];
  /**
   * 지정된 키 이벤트가 발생했을 때 호출될 이벤트 핸들러입니다.
   */
  handler: (event: KeyboardEvent) => void;
};

const KeyListener = ({ targetRef, keyCode, handler }: KeyListenerProps) => {
  const pressedKeysRef = useRef<UnionKeys[]>([]);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!pressedKeysRef.current.includes(e.keyCode)) {
      pressedKeysRef.current.push(e.keyCode);
    }
  }, []);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (targetRef && targetRef.current !== document.activeElement) return;

      if (Array.isArray(keyCode)) {
        if (keyCode.every((code) => pressedKeysRef.current.includes(code))) {
          handlerRef.current(e);
        }
      } else {
        if (e.keyCode === keyCode) {
          handlerRef.current(e);
        }
      }

      pressedKeysRef.current = [];
    },
    [targetRef, keyCode],
  );

  useEffect(() => {
    const currentTarget = targetRef?.current;

    const handleFocus = () => {
      pressedKeysRef.current = [];
    };

    if (currentTarget) {
      currentTarget.addEventListener('focus', handleFocus);
      currentTarget.addEventListener('blur', handleFocus);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      if (currentTarget) {
        currentTarget.removeEventListener('focus', handleFocus);
        currentTarget.removeEventListener('blur', handleFocus);
      }

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp, targetRef]);

  return null;
};

export default KeyListener;
