<<<<<<< HEAD
/**
 * @fileoverview Scroll to anchor link with smooth scroll polyfill and smooth-scroll library
 * @see https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/src/utils/scroll.js
 */

// https://github.com/cferdinandi/smooth-scroll/issues/481
// @ts-ignore
import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.min';
import smoothscroll from 'smoothscroll-polyfill';

import { isBrowser } from './environment';

=======
import SmoothScroll from 'smooth-scroll';
import smoothscroll from 'smoothscroll-polyfill';

>>>>>>> 0a4c3e7 (✨ feat: smooth scroll polyfill 및 블로그 포스트에 적용)
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
<<<<<<< HEAD
  if (!isBrowser) return null;
=======
>>>>>>> 0a4c3e7 (✨ feat: smooth scroll polyfill 및 블로그 포스트에 적용)
  if (!scroll) throw Error('Not founded SmoothScroll instance');

  if (dest < window.scrollY) {
    scroll.animateScroll(dest);
  }

  return scroll;
}
