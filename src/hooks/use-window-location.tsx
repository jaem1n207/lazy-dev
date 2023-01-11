import React from 'react';

import { useIsMounted } from './use-is-mounted';

export const useWindowLocation = () => {
  const isMounted = useIsMounted();
  const [location, setLocation] = React.useState(isMounted() ? window.location : undefined);

  React.useEffect(() => {
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
