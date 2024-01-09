import { useEffect, useRef, useState, type SetStateAction } from "react";

const useCurrentState = <T>(initialState: T | (() => T)) => {
  const [state, setState] = useState<T>(() => {
    return typeof initialState === "function" ? (initialState as () => T)() : initialState;
  });
  const ref = useRef<T>(initialState as T);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  const setValue = (val: SetStateAction<T>) => {
    const result = typeof val === "function" ? (val as (prevState: T) => T)(ref.current) : val;
    ref.current = result;
    setState(result);
  };

  return [state, setValue, ref] as const;
};

export default useCurrentState;
