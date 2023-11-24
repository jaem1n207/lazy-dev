/**
 * Original Code
 * @see https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/src/utils/dom.js
 * modified by @jaem1n207
 */

/**
 * 주어진 셀렉터에 일치하는 모든 요소를 반환합니다.
 */
export const getElements = (selectors: string) => {
  const elements = document.querySelectorAll(selectors);
  if (!elements.length)
    throw new Error(`There is no element that matches the selector: ${selectors}`);

  return elements;
};

/**
 * 주어진 셀렉터에 일치하는 첫 번째 요소를 반환합니다.
 */
export const getElement = (selector: string) => {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`There is no element that matches the selector: ${selector}`);

  return element;
};

/**
 * 주어진 요소에 클래스를 추가합니다.
 */
export const addClass = (element: Element, className: string) => element.classList.add(className);

/**
 * 주어진 요소에서 클래스를 제거합니다.
 */
export const removeClass = (element: Element, className: string) =>
  element.classList.remove(className);

/**
 * 주어진 요소가 특정 클래스를 가지고 있는지 확인합니다.
 */
export const hasClass = (element: Element, className: string) =>
  element.classList.contains(className);
