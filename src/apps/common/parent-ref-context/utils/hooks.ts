import { useContext } from 'react';

import { ParentRefContext } from './context';
import type { ParentRef } from './types';

export const useParentRef = (): ParentRef => {
  const parentRef = useContext(ParentRefContext);

  if (!parentRef) {
    throw new Error('parentRef가 제공되지 않았어요. <ParentRefProvider> 컴포넌트로 감싸주세요.');
  }

  return parentRef;
};
