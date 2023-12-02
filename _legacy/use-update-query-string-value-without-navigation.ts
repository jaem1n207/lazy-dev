import { useEffect } from "react";

export const useUpdateQueryStringValueWithoutNavigation = (queryKey: string, queryValue: string) => {
  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const oldQueryValue = currentSearchParams.get(queryKey) ?? '';
    if (queryValue === oldQueryValue) return;

    if (queryValue) {
      currentSearchParams.set(queryKey, queryValue);
    } else {
      currentSearchParams.delete(queryKey);
    }
    const newUrl = [window.location.pathname, currentSearchParams.toString()]
      .filter(Boolean)
      .join('?');
    window.history.replaceState(null, '', newUrl);
  }, [queryKey, queryValue]);
};