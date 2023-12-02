/**
 * Original Code
 * @see https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/src/utils/dom.js
 * modified by @jaem1n207
 */

/**
 * 주어진 셀렉터에 일치하는 모든 요소를 반환합니다.
 */
export const getElements = <T extends HTMLElement = HTMLElement>(
  selectors: string,
  target?: HTMLElement,
): NodeListOf<T> => {
  const elements = (target || document).querySelectorAll<T>(selectors);
  if (!elements.length) throw new Error(`제공한 선택자와 일치하는 요소가 없습니다: ${selectors}`);

  return elements;
};

/**
 * 주어진 셀렉터에 일치하는 첫 번째 요소를 반환합니다.
 */
export const getElement = <T extends HTMLElement = HTMLElement>(
  selector: string,
  target?: HTMLElement,
): T => {
  const element = (target || document).querySelector<T>(selector);
  if (!element) throw new Error(`제공한 선택자와 일치하는 요소가 없습니다: ${selector}`);

  return element;
};

/**
 * 주어진 요소의 상대적인 위치를 반환합니다.
 */
export const getElementOffset = (element: HTMLElement | null) => {
  if (!element)
    return {
      top: 0,
      left: 0,
    };

  const { top, left } = element.getBoundingClientRect();

  return { top, left };
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
