/**
 * Original Code
 * @see https://github.com/juliencrn/usehooks-ts/blob/master/src/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.ts
 */

import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
