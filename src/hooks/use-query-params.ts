import React from 'react';

import { useWindowLocation } from './use-window-location';

interface UseQueryParamsProps<T> {
  key: string;
  type: T;
  defaultValue?: string | number | boolean;
}

export const useQueryParams = <T>({ key, type, defaultValue }: UseQueryParamsProps<T>) => {
  const [value, setValue] = React.useState<T | undefined>(undefined);
  const location = useWindowLocation();

  const searchParams = React.useMemo(() => {
    return new URLSearchParams(location?.search);
  }, [location?.search]);

  React.useEffect(() => {
    const queryValue = searchParams?.get(key);

    if (queryValue) {
      if (type === 'string') {
        setValue(queryValue as unknown as T);
      } else if (type === 'number') {
        setValue(Number(queryValue) as unknown as T);
      } else if (type === 'boolean') {
        setValue(Boolean(queryValue) as unknown as T);
      }
    } else {
      setValue(defaultValue as unknown as T);
    }
  }, [key, type, defaultValue, searchParams]);

  return value;
};
