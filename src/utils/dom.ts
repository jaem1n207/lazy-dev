/**
 * Original Code
 * @see https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/src/utils/dom.js
 * modified by @jaem1n207
 */

export const getElements = (selectors: string) => {
  const elements = document.querySelectorAll(selectors);
  if (!elements.length)
    throw new Error(`There is no element that matches the selector: ${selectors}`);

  return elements;
};

export const getElement = (selector: string) => {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`There is no element that matches the selector: ${selector}`);

  return element;
};

export const addClass = (element: Element, className: string) => element.classList.add(className);

export const removeClass = (element: Element, className: string) =>
  element.classList.remove(className);

export const hasClass = (element: Element, className: string) =>
  element.classList.contains(className);
