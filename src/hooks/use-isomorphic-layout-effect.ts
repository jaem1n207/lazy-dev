/**
 * Original Code
 * @see https://github.com/juliencrn/usehooks-ts/blob/master/src/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.ts
 */

import { useEffect, useLayoutEffect } from 'react';

// gatsby는 Node 환경에서 build 하기 때문에, window 객체가 없다.
// 따라서, window 객체를 사용하려면 아래 코드를 추가해야 한다.
// 하지만 `browser-monads-ts` 라이브러리를 사용하면, 아래 코드를 추가하지 않아도 된다.
// 따라서 아래 코드는 여기서만 사용하고, `browser-monads-ts` 라이브러리를 사용하는 곳에서는 사용하지 않는다.
const isBrowser = typeof window !== 'undefined';

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
