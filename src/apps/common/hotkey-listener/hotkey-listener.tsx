import { RefObject, useEffect, useRef } from 'react';

const Keys = {
  Alt: 'Alt',
  Control: 'Control',
  Meta: 'Meta',
  Shift: 'Shift',

  Enter: 'Enter',
  Escape: 'Escape',

  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',

  A: 'a',
  K: 'k',
} as const;
type UnionKeys = (typeof Keys)[keyof typeof Keys];

type HotKey = UnionKeys | UnionKeys[];

type HotKeyListenerProps = {
  /**
   * 감지할 키 코드입니다.
   *
   * 단일 키를 지정할 수도 있고, 여러 키를 동시에 감지하고 싶은 경우엔 배열로 지정할 수 있습니다.
   */
  hotkey: HotKey;
  /**
   * 지정된 키 이벤트가 발생했을 때 호출될 콜백 함수입니다.
   */
  handler: () => void;
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
};

const HotKeyListener = ({ hotkey, handler, targetRef }: HotKeyListenerProps) => {
  const hotkeys = useRef(
    new Set(Array.isArray(hotkey) ? hotkey.map((k) => k.toLowerCase()) : [hotkey.toLowerCase()]),
  );
  const currentlyPressedKeys = useRef(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key.toLowerCase();

      if (key === 'meta') {
        key = navigator.platform.includes('Mac') ? 'meta' : 'control';
      }

      currentlyPressedKeys.current.add(key);

      if (hotkeys.current.size !== currentlyPressedKeys.current.size) {
        return;
      }

      const pressedKeys = Array.from(currentlyPressedKeys.current);
      const isMatch = pressedKeys.every((k) => hotkeys.current.has(k));
      if (isMatch) {
        handler();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      let key = e.key.toLowerCase();

      if (key === 'meta') {
        key = navigator.platform.includes('Mac') ? 'meta' : 'control';
      }
      // 떼어진 키를 currentlyPressedKeys에서 제거합니다.
      currentlyPressedKeys.current.delete(key);
    };

    const domNode = targetRef?.current ?? document;

    // @ts-ignore
    domNode.addEventListener('keydown', handleKeyDown);
    // @ts-ignore
    domNode.addEventListener('keyup', handleKeyUp);

    return () => {
      // @ts-ignore
      domNode.removeEventListener('keydown', handleKeyDown);
      // @ts-ignore
      domNode.removeEventListener('keyup', handleKeyUp);
    };
  }, [handler, targetRef]);

  return null;
};

export default HotKeyListener;
