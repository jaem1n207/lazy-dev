export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(pointer: coarse)').matches;
};
