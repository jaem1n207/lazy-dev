import { RefObject, useRef, useState } from 'react';

import KeyListener, { Keys } from 'Apps/common/key-listener/key-listener';

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
      <div ref={divRef} tabIndex={-1} className="h-40pxr w-full bg-gray-400">
        <KeyListener targetRef={divRef} keyCode={[Keys.CTRL, Keys.K]} handler={handleIncrement} />
        Hello World: {count}
      </div>
      <input ref={inputRef1} type="text" />
      <KeyListener
        targetRef={inputRef1}
        keyCode={[Keys.CMD, Keys.K]}
        handler={() => clearInput(inputRef1)}
      />

      <input ref={inputRef2} type="text" />
      <KeyListener
        targetRef={inputRef2}
        keyCode={[Keys.CMD, Keys.K]}
        handler={() => clearInput(inputRef2)}
      />
    </div>
  );
};

export default Abc;
