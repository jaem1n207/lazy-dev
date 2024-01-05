import { useCallback, useState } from "react";

export const useBoolean = (flag: boolean) => {
  const [state, setState] = useState(flag);
  const setFlag = useCallback((newFlag: boolean) => {
    setState(newFlag);
  }, []);

  return [
    state,
    {
      on: () => setFlag(true),
      off: () => setFlag(false),
      toggle: () => setFlag(!state),
    },
  ] as const;
};
