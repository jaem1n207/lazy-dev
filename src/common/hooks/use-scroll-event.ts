import { useEffect } from "react";

export const useScrollEvent = (onScroll: () => void) => {
  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: false });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
};
