/* eslint-disable no-undef */
import { useRef, useEffect } from 'react';

import { isBrowser } from 'Libs/environment';

type Options = Pick<AddEventListenerOptions, 'capture' | 'passive' | 'once'>;

interface UseEventListener<K extends keyof DocumentEventMap> {
  (eventName: K, handler: DocumentEventMap[K], element?: Document, options?: Options): void;
}

export const useEventListener: UseEventListener<keyof DocumentEventMap> = (
  eventName,
  handler,
  element = document,
  options = {}
) => {
  const savedHandler = useRef<DocumentEventMap[keyof DocumentEventMap]>();
  const { capture, passive, once } = options;

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }

    const eventListener = (event: DocumentEventMap[keyof DocumentEventMap]) =>
      // @ts-ignore
      savedHandler.current?.(event);
    const opts = { capture, passive, once };
    element.addEventListener(eventName, eventListener, opts);
    return () => {
      element.removeEventListener(eventName, eventListener, opts);
    };
  }, [eventName, element, capture, passive, once]);

  if (!isBrowser) {
    return null;
  }
};
