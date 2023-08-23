import { createContext } from 'react';

import type { ParentRef } from './types';

export const ParentRefContext = createContext<ParentRef>(undefined);
