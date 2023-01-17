import SmoothScroll from 'smooth-scroll';
import smoothscroll from 'smoothscroll-polyfill';

import { isBrowser } from './environment';

let scroll: SmoothScroll | null = null;

export function init() {
  smoothscroll.polyfill();
  scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true,
  });
  return scroll;
}

export function destroy() {
  if (!scroll) throw Error('Not founded SmoothScroll instance');

  scroll.destroy();
  scroll = null;

  return scroll;
}

export function go(dest: number) {
  if (!isBrowser) return null;
  if (!scroll) throw Error('Not founded SmoothScroll instance');

  if (dest < window.scrollY) {
    scroll.animateScroll(dest);
  }

  return scroll;
}
