import { ELEMENT_CLASS } from 'Types/enum';

import { hasClass } from '../../utils/dom';

const MAX_TRANSFORM_VALUE = 20; // tx 및 ty의 최대값 지정
const TRANSFORM_INCREMENT = 0.5; // tx 및 ty의 증가 단위

// 이벤트 대상 또는 이벤트 대상의 부모 요소 중 전달 받은 클래스 이름을 가진 요소를 찾아 반환
const findClosestAncestor = (element: HTMLElement, className: string): HTMLElement | null => {
  let currentNode: HTMLElement | null = element;

  while (currentNode) {
    if (hasClass(currentNode, className)) {
      return currentNode;
    }
    currentNode = currentNode.parentElement;
  }

  return null;
};

export const movingElementsTransform = () => {
  const updateTransform = (element: HTMLElement, mouseX: number, mouseY: number) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const tx = Math.max(
      -MAX_TRANSFORM_VALUE,
      Math.min(
        MAX_TRANSFORM_VALUE,
        ((mouseX - left - width / 2) / (width / 2)) * MAX_TRANSFORM_VALUE,
      ),
    );
    const ty = Math.max(
      -MAX_TRANSFORM_VALUE,
      Math.min(
        MAX_TRANSFORM_VALUE,
        ((mouseY - top - height / 2) / (height / 2)) * MAX_TRANSFORM_VALUE,
      ),
    );
    element.style.transform = `matrix(1, 0, 0, 1, ${tx * TRANSFORM_INCREMENT * 2}, ${
      ty * TRANSFORM_INCREMENT * 2
    })`;
  };

  const handleMouseMove = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const movingElement = findClosestAncestor(target, ELEMENT_CLASS.MOVING_ELEMENT);

    if (movingElement) {
      requestAnimationFrame(() => {
        updateTransform(movingElement, event.clientX, event.clientY);
      });
    }
  };

  const handleMouseOut = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const movingElement = findClosestAncestor(target, ELEMENT_CLASS.MOVING_ELEMENT);

    if (movingElement) {
      requestAnimationFrame(() => {
        movingElement.style.transform = 'translate3d(0px, 0px, 0px)';
      });
    }
  };

  return {
    handleMouseMove,
    handleMouseOut,
  };
};
