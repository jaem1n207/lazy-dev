import { useContext } from 'react';

import { PortalsManagerContext } from './context';

export const usePortalsManager = () => {
  const portalsManager = useContext(PortalsManagerContext);

  if (!portalsManager) {
    throw new Error('PortalsManagerContext is not provided.');
  }

  return portalsManager;
};
