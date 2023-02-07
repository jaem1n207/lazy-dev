import React from 'react';

import { useA2HS } from 'Hooks/use-a2hs';

const A2HS = () => {
  const { deferredPrompt, install, clearPrompt } = useA2HS();

  return !deferredPrompt ? (
    <div className="absolute z-30 flex items-center justify-center w-full bg-sky-50 bottom-8pxr gap-4pxr">
      <button
        className="font-bold rounded-lg py-8pxr text-24pxr px-12pxr bg-primary text-button-text"
        onClick={clearPrompt}
      >
        취소
      </button>
      <button
        className="font-bold rounded-lg py-8pxr text-24pxr px-12pxr bg-primary text-button-text"
        onClick={install}
      >
        홈 화면에 추가
      </button>
    </div>
  ) : null;
};

export default A2HS;
