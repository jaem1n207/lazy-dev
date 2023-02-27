/* eslint-disable no-undef */
import { useEffect, useRef } from 'react';

import { isBrowser } from 'Libs/environment';

type EventListener<E extends keyof HTMLElementEventMap> = (event: HTMLElementEventMap[E]) => void;

type EventListenerOptions = {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
};

export const useEventListener = <E extends keyof HTMLElementEventMap>(
  eventName: E,
  handler: EventListener<E>,
  options: EventListenerOptions = {},
  element: HTMLElement | Window = window
) => {
  const savedHandler = useRef<EventListener<E>>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener: EventListener<E> = (event) =>
      savedHandler.current && savedHandler.current(event);

    // @ts-ignore
    element.addEventListener(eventName, eventListener, options);

    return () => {
      // @ts-ignore
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);

  if (!isBrowser) {
    return null;
  }
};
