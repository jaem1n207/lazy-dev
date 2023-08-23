/**
 * Original Code
 * @see https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/src/utils/dom.js
 * modified by @jaem1n207
 */

export const getElements = (selector: string) =>
  Array.from(document.querySelectorAll(selector)) as HTMLElement[];
export const getElement = (selector: string) => document.querySelector<HTMLElement>(selector);
export const addClass = (element: Element, className: string) => element.classList.add(className);
export const removeClass = (element: Element, className: string) =>
  element.classList.remove(className);
export const hasClass = (element: Element, className: string) =>
  element.classList.contains(className);
