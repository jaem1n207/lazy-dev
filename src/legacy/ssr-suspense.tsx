import React, { ComponentProps, Suspense } from 'react';

const useIsMounted = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

const SSRSuspense = (props: ComponentProps<typeof Suspense>) => {
  const isMounted = useIsMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }

  return <>{props.fallback}</>;
};

export default SSRSuspense;
