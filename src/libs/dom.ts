/**
 * Original Code
 * @see https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/src/utils/dom.js
 * modified by @jaem1n207
 */

const BODY = 'body';

export const getElements = (selector: string) => document.querySelectorAll(selector);
export const getElement = (selector: string) => document.querySelector(selector);
export const addClass = (element: Element, className: string) => element.classList.add(className);
export const removeClass = (element: Element, className: string) =>
  element.classList.remove(className);
export const hasClass = (element: Element, className: string) =>
  element.classList.contains(className);
export const getBody = () => getElement(BODY) || document.body;
export const addClassToBody = (className: string) => addClass(getBody(), className);
export const removeClassToBody = (className: string) => removeClass(getBody(), className);
export const hasClassOfBody = (className: string) => hasClass(getBody(), className);
export const getRect = (className: string) => getElement(className)?.getBoundingClientRect();
export const getPosY = (className: string) => getRect(className)?.y;

export const getDocumentHeight = () => document.documentElement.offsetHeight;

export const enableHoverOnActiveElements = () => {
  const isTouchDevice = 'ontouchstart' in document.documentElement;
  if (!isTouchDevice) {
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    const tagLabel = document.getElementById('tag-label');

    if (tagLabel) {
      tagLabel.setAttribute('data-hoverable', 'true');
    }

    buttons.forEach((button) => {
      button.setAttribute('data-hoverable', 'true');
    });

    links.forEach((link) => {
      link.setAttribute('data-hoverable', 'true');
    });
  }
};

export const disableHoverCursorStyle = () => {
  const isTouchDevice = 'ontouchstart' in document.documentElement;

  if (!isTouchDevice) {
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    // eslint-disable-next-line no-undef
    const tagLabel: NodeListOf<HTMLLabelElement> = document.querySelectorAll('#tag-label');

    if (tagLabel) {
      tagLabel.forEach((label) => {
        label.style.cursor = 'none';
      });
    }

    buttons.forEach((button) => {
      button.style.cursor = 'none';
    });

    links.forEach((link) => {
      link.style.cursor = 'none';
    });
  }
};
