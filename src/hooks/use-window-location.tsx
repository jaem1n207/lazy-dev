import React from 'react';

import { isBrowser } from 'Libs/environment';

import { useIsMounted } from './use-is-mounted';

export const useWindowLocation = () => {
  const isMounted = useIsMounted();
  const [location, setLocation] = React.useState(
    isMounted() && isBrowser ? window.location : undefined
  );

  React.useEffect(() => {
    if (!isBrowser) return;

    const handleLocationChange = () => {
      setLocation(window.location);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return location;
};
