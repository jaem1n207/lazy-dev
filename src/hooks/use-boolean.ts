import { useCallback, useState } from 'react';

type ReturnType = [
  boolean,
  {
    on: () => void;
    off: () => void;
    toggle: () => void;
  }
];

export const useBoolean = (flag: boolean): ReturnType => {
  const [state, setState] = useState(flag);
  const setFlag = useCallback(
    (newFlag: boolean) => {
      setState(newFlag);
    },
    [setState]
  );
  return [
    state,
    {
      on: () => setFlag(true),
      off: () => setFlag(false),
      toggle: () => setFlag(!state),
    },
  ];
};
