import React from 'react';

import { useA2HS } from 'Hooks/use-a2hs';

const A2HS = () => {
  const { isA2HS, isInstall, install } = useA2HS();
  console.log(isInstall);

  return (
    <div className="absolute mx-auto bottom-8pxr w-100pxr">
      {isA2HS && !isInstall && (
        <button
          className="font-bold rounded-lg py-8pxr text-24pxr px-12pxr bg-primary text-button-text"
          onClick={install}
        >
          Install
        </button>
      )}
    </div>
  );
};

export default A2HS;
