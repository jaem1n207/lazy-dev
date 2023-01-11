import React from 'react';

<<<<<<< HEAD
import { isBrowser } from 'Libs/environment';

=======
>>>>>>> 8a7b240 (✨ feat: useWindowLocation hook)
import { useIsMounted } from './use-is-mounted';

export const useWindowLocation = () => {
  const isMounted = useIsMounted();
<<<<<<< HEAD
  const [location, setLocation] = React.useState(
    isMounted() && isBrowser ? window.location : undefined
  );

  React.useEffect(() => {
    if (!isBrowser) return;

=======
  const [location, setLocation] = React.useState(isMounted() ? window.location : undefined);

  React.useEffect(() => {
>>>>>>> 8a7b240 (✨ feat: useWindowLocation hook)
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
