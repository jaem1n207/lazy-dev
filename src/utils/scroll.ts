/**
 * Original Code
 * @see https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/src/utils/scroll.js
 * @fileoverview Scroll to anchor link with smooth scroll polyfill and smooth-scroll library
 * modified by @jaem1n207
 */

import { window } from 'browser-monads-ts';
// https://github.com/cferdinandi/smooth-scroll/issues/481
// @ts-ignore
import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.min';
import smoothscroll from 'smoothscroll-polyfill';

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
  if (!scroll) throw Error('Not founded SmoothScroll instance');

  if (dest < window.scrollY) {
    scroll.animateScroll(dest);
  }

  return scroll;
}
