import { useState, type ReactNode, useEffect } from 'react';

type ClineOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

const ClientOnly = ({ children, fallback }: ClineOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <>{fallback}</>;

  return <>{children}</>;
};

export default ClientOnly;
