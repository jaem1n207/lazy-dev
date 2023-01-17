import React from 'react';

<<<<<<< HEAD
<<<<<<< HEAD
import { isBrowser } from 'Libs/environment';

=======
>>>>>>> 8a7b240 (✨ feat: useWindowLocation hook)
=======
import { isBrowser } from 'Libs/environment';

>>>>>>> 7458950 (🐛 fix: node 환경 처리)
import { useIsMounted } from './use-is-mounted';

export const useWindowLocation = () => {
  const isMounted = useIsMounted();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f17d967 (🐛 fix: smooth-scroll window is not defined issue)
  const [location, setLocation] = React.useState(
    isMounted() && isBrowser ? window.location : undefined
  );

  React.useEffect(() => {
    if (!isBrowser) return;

=======
  const [location, setLocation] = React.useState(isMounted() ? window.location : undefined);

  React.useEffect(() => {
<<<<<<< HEAD
>>>>>>> 8a7b240 (✨ feat: useWindowLocation hook)
=======
    if (!isBrowser) return;

>>>>>>> 7458950 (🐛 fix: node 환경 처리)
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
