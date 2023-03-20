import { useRef, CSSProperties, useCallback, useEffect } from 'react';

import { document } from 'browser-monads-ts';

import { getElements } from 'Libs/dom';
import { clickableTransform } from 'Libs/transform';
import { ELEMENT_SELECTOR } from 'Types/enum';

import { useBoolean } from './use-boolean';
import { useEventListener } from './use-event-listener';

type CalculateCursorCSSProperties = Pick<CSSProperties, 'opacity' | 'top' | 'left' | 'transform'>;

interface Styles {
  cursor: CalculateCursorCSSProperties;
}

const cursorScale = 3;

const useCursor = () => {
  const [isActive, setIsActive] = useBoolean(false);
  const [isActiveClickable, setIsActiveClickable] = useBoolean(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const { handleMouseMove, handleMouseOut } = clickableTransform();

  const onMouseMove = useCallback(({ clientX: x, clientY: y }: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.top = y + 'px';
      cursorRef.current.style.left = x + 'px';
    }
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
    const clickables = getElements(ELEMENT_SELECTOR.CLICKABLE);

    clickables.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        handleMouseMove(e, el);
      });
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
        handleMouseOut(el);
      });
    });

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener('mousemove', (e) => {
          handleMouseMove(e, el);
        });
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
          handleMouseOut(el);
        });
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // 뒤늦게 렌더되는 clickable 요소에도 이벤트를 추가하기 위함
  useEffect(() => {
    setIsActive.on();

    setTimeout(() => {
      setIsActive.off();
    }, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles: Styles = {
    cursor: {
      top: 0,
      left: 0,
    },
  };

  return { styles, cursorRef };
};

export default useCursor;
