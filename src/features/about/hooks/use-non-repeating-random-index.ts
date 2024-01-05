import { useState } from "react";

interface NonRepeatingRandomIndexHook {
  (arrIndex: number): [number, () => number];
}

export const useNonRepeatingRandomIndex: NonRepeatingRandomIndexHook = (arrIndex) => {
  const [lastIndex, setLastIndex] = useState(Math.floor(Math.random() * arrIndex));

  const generateRandomIndex = () => {
    let newIndex: number;

    do {
      newIndex = Math.floor(Math.random() * arrIndex);
    } while (newIndex === lastIndex);

    setLastIndex(newIndex);
    return newIndex;
  };

  return [lastIndex, generateRandomIndex];
};
