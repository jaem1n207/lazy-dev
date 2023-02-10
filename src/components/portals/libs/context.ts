import { createContext } from 'react';

import { PortalsContainerElement } from './types';

export interface PortalsManager {
  container: PortalsContainerElement;
}

export const PortalsManagerContext = createContext<PortalsManager | null>(null);
