import { type FocusEvent, type MouseEvent, type MutableRefObject, useState } from "react";

import { getElementOffset } from "../utils/dom";

export interface ReactiveDomReact {
  top: number;
  left: number;
  right: number;
  width: number;
  height: number;
  elementTop: number;
}

const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  width: 0,
  height: 0,
  elementTop: -1000,
};

/**
 * `DOM` 요소의 위치와 크기를 반환합니다.
 */
const getRectFromDOMWithContainer = (
  domRect?: DOMRect,
  getContainer?: () => HTMLElement | null,
): ReactiveDomReact => {
  if (!domRect) return defaultRect;
  const container = getContainer ? getContainer() : null;
  const scrollElement = container || document.documentElement;
  const { top: offsetTop, left: offsetLeft } = getElementOffset(container);

  return {
    ...domRect,
    width: domRect.width || domRect.right - domRect.left,
    height: domRect.height || domRect.top - domRect.bottom,
    top: domRect.bottom + scrollElement.scrollTop - offsetTop,
    left: domRect.left + scrollElement.scrollLeft - offsetLeft,
    elementTop: domRect.top + scrollElement.scrollTop - offsetTop,
  };
};

/**
 * 주어진 `DOM` 요소가 아직 화면에 배치되지 않았는지 확인합니다.
 */
export const isUnplacedRect = (rect?: ReactiveDomReact): boolean => {
  if (!rect) return true;

  return rect.top === defaultRect.top && rect.left === defaultRect.left;
};

/**
 * 주어진 `ref`에 대한 위치와 크기를 반환합니다.
 */
const getRefRect = (
  ref?: MutableRefObject<HTMLElement | null>,
  getContainer?: () => HTMLElement | null,
): ReactiveDomReact => {
  if (!ref || !ref.current) return defaultRect;
  const rect = ref.current.getBoundingClientRect();

  return getRectFromDOMWithContainer(rect, getContainer);
};

/**
 * 이벤트가 발생한 `DOM` 요소의 위치와 크기를 반환합니다.
 */
const getEventRect = (
  event?: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>,
  getContainer?: () => HTMLElement | null,
) => {
  const rect = (event?.target as HTMLElement)?.getBoundingClientRect();
  if (!rect) return defaultRect;

  return getRectFromDOMWithContainer(rect, getContainer);
};

const isRefTarget = (
  eventOrRef:
    | MouseEvent<HTMLElement>
    | FocusEvent<HTMLElement>
    | MutableRefObject<HTMLElement | null>,
): eventOrRef is MutableRefObject<HTMLElement | null> =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  typeof (eventOrRef as any)?.target === "undefined";

/**
 * 주어진 `ref` 또는 이벤트가 발생한 `DOM` 요소의 위치와 크기를 반환합니다.
 */
export const useRect = (initialState?: ReactiveDomReact | (() => ReactiveDomReact)) => {
  const [rect, setRect] = useState<ReactiveDomReact>(initialState || defaultRect);

  const updateRect = (
    eventOrRef:
      | MouseEvent<HTMLElement>
      | FocusEvent<HTMLElement>
      | MutableRefObject<HTMLElement | null>,
    getContainer?: () => HTMLElement | null,
  ) => {
    if (isRefTarget(eventOrRef)) return setRect(getRefRect(eventOrRef, getContainer));

    setRect(getEventRect(eventOrRef, getContainer));
  };

  return {
    rect,
    setRect: updateRect,
  };
};
