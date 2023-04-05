/**
 * Original Code
 * @see https://github.com/juliencrn/usehooks-ts/blob/master/src/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.ts
 */

import { useEffect, useLayoutEffect } from 'react';

import { isBrowser } from 'Libs/environment';

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
