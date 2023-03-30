import { useRef, CSSProperties, useCallback, useEffect, useState } from 'react';

import { document } from 'browser-monads-ts';

import { isTouchDevice } from 'Libs/device';
import { getElements } from 'Libs/dom';
import { clickableTransform } from 'Libs/transform';
import { ELEMENT_SELECTOR } from 'Types/enum';

import { useBoolean } from './use-boolean';
import { useEventListener } from './use-event-listener';

const LAST_CURSOR_POSITION_KEY = 'lastCursorPosition';

interface LastCursorPosition {
  x: number;
  y: number;
}

const useLastCursorPosition = () => {
  const lastCursorPosition = useRef<LastCursorPosition>({ x: 0, y: 0 });

  const saveCursorPosition = useCallback(({ x, y }: { x: number; y: number }) => {
    const newPosition = { x, y };
    lastCursorPosition.current = { x, y };
    sessionStorage.setItem(LAST_CURSOR_POSITION_KEY, JSON.stringify(newPosition));
  }, []);

  useEffect(() => {
    const storedCursorPosition = sessionStorage.getItem(LAST_CURSOR_POSITION_KEY);
    if (storedCursorPosition) {
      lastCursorPosition.current = JSON.parse(storedCursorPosition);
    }
  }, []);

  return {
    lastCursorPosition: lastCursorPosition.current,
    saveCursorPosition,
  };
};

type CalculateCursorCSSProperties = Pick<CSSProperties, 'opacity' | 'transform' | 'top' | 'left'>;

interface Styles {
  cursor: CalculateCursorCSSProperties;
}

const cursorScale = 3;

const useCursor = () => {
  const [isActive, setIsActive] = useBoolean(false);
  const [isActiveClickable, setIsActiveClickable] = useBoolean(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  const { handleMouseMove, handleMouseOut } = clickableTransform();
  const { lastCursorPosition, saveCursorPosition } = useLastCursorPosition();

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.top = y + 'px';
        cursorRef.current.style.left = x + 'px';
        saveCursorPosition({ x, y });
      }
    },
    [saveCursorPosition]
  );

  useEffect(() => {
    const isNonTouchDevice = !isTouchDevice();

    const body = document.body;

    if (isNonTouchDevice) {
      body.classList.add('hide-cursor');
    } else {
      body.classList.remove('hide-cursor');
    }

    setShouldRender(isNonTouchDevice);

    return () => {
      body.classList.remove('hide-cursor');
    };
  }, []);

  const onMouseDown = useCallback(() => {
    setIsActive.on();
  }, [setIsActive]);

  const onMouseUp = useCallback(() => {
    setIsActive.off();
  }, [setIsActive]);

  useEventListener('mousemove', onMouseMove, document);
  useEventListener('mousedown', onMouseDown, document);
  useEventListener('mouseup', onMouseUp, document);

  useEffect(() => {
    if (isActive) {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `scale(${cursorScale})`;
      }
    } else {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `scale(1)`;
      }
    }
  }, [isActive]);

  useEffect(() => {
    if (isActiveClickable) {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `scale(${cursorScale * 1.4})`;
      }
    }
  }, [isActiveClickable]);

  useEffect(() => {
    if (isActive) return;

    const clickables = getElements(ELEMENT_SELECTOR.CLICKABLE);
    const animatable = getElements(ELEMENT_SELECTOR.ANIMATE);

    animatable.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        handleMouseMove(e, el);
      });
      el.addEventListener('mouseout', () => {
        handleMouseOut(el);
      });
    });

    clickables.forEach((el) => {
      el.addEventListener('mouseover', () => {
        setIsActive.on();
      });
      el.addEventListener('click', () => {
        setIsActive.on();
        setIsActiveClickable.off();
      });
      el.addEventListener('mousedown', () => {
        setIsActiveClickable.on();
      });
      el.addEventListener('mouseup', () => {
        setIsActive.on();
      });
      el.addEventListener('mouseout', () => {
        setIsActive.off();
        setIsActiveClickable.off();
      });
    });

    return () => {
      animatable.forEach((el) => {
        el.removeEventListener('mousemove', (e) => {
          handleMouseMove(e, el);
        });
        el.removeEventListener('mouseout', () => {
          handleMouseOut(el);
        });
      });

      clickables.forEach((el) => {
        el.removeEventListener('mouseover', () => {
          setIsActive.on();
        });
        el.removeEventListener('click', () => {
          setIsActive.on();
          setIsActiveClickable.off();
        });
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable.on();
        });
        el.removeEventListener('mouseup', () => {
          setIsActive.on();
        });
        el.removeEventListener('mouseout', () => {
          setIsActive.off();
          setIsActiveClickable.off();
        });
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsActive]);

  useEffect(() => {
    onMouseMove({ clientX: lastCursorPosition.x, clientY: lastCursorPosition.y } as MouseEvent);
  }, [lastCursorPosition, onMouseMove]);

  const styles: Styles = {
    cursor: {
      top: lastCursorPosition.y,
      left: lastCursorPosition.x,
    },
  };

  return {
    cursorRef,
    styles,
    shouldRender,
  };
};

export default useCursor;
