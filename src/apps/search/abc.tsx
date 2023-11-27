/* HotkeyListener 실험용 컴포넌트 */
import { RefObject, useRef, useState } from 'react';

import HotkeyListener from 'Apps/common/hotkey-listener/hotkey-listener';

const Abc = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  const divRef = useRef<HTMLDivElement>(null);

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const clearInput = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.value = '';
    }
  };

  return (
    <div>
      <HotkeyListener
        hotkey={'Enter'}
        handler={() => {
          console.log('global event handler called');
        }}
      />
      <div ref={divRef} tabIndex={-1} className="h-40pxr w-full bg-gray-400">
        <HotkeyListener
          targetRef={divRef}
          hotkey={['Control', 'Shift', 'a']}
          handler={handleIncrement}
        />
        Hello World: {count}
      </div>
      <input ref={inputRef1} type="text" />
      <HotkeyListener
        targetRef={inputRef1}
        hotkey={['Meta', 'Shift', 'a']}
        handler={() => clearInput(inputRef1)}
      />

      <input ref={inputRef2} type="text" />
      <HotkeyListener
        targetRef={inputRef2}
        hotkey={['Meta', 'a']}
        handler={() => console.log('input2')}
      />
    </div>
  );
};

export default Abc;
