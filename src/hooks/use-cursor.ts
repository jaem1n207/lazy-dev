import { useState, useRef, CSSProperties, useCallback, useEffect } from 'react';

import { useBoolean } from './use-boolean';
import { useEventListener } from './use-event-listener';

interface CursorProps {
  color?: CSSProperties['color'];
}

interface Styles {
  cursorInner: CSSProperties;
  cursorOuter: CSSProperties;
}

const baseCursorStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  background: 'rgba(255, 255, 255,1)',
  borderRadius: '50%',
  pointerEvents: 'none',
  mixBlendMode: 'difference',
  transition: '0.15s all cubic-bezier(0.075, 0.82, 0.165, 1)',
  zIndex: 99,
  translate: 'none',
  rotate: 'none',
  scale: 'none',
};

const innerSize = 8;
const outerSize = 8;
const innerScale = 0.7;
const outerScale = 5;
const outerAlpha = 0.4;

const useCursor = ({ color = '#fff' }: CursorProps) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useBoolean(false);
  const [isActive, setIsActive] = useBoolean(false);
  const [isActiveClickable, setIsActiveClickable] = useBoolean(false);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  let endX = useRef(0);
  let endY = useRef(0);

  const onMouseMove = useCallback(({ clientX: x, clientY: y }: MouseEvent) => {
    setCoords({ x, y });
    endX.current = x;
    endY.current = y;

    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.top = y + 'px';
      cursorInnerRef.current.style.left = x + 'px';
    }
  }, []);

  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8;
        coords.y += (endY.current - coords.y) / 8;
        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.top = coords.y + 'px';
          cursorOuterRef.current.style.left = coords.x + 'px';
        }

        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animateOuterCursor);
      }
    },
    [requestRef, coords]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
  }, [animateOuterCursor]);

  const onMouseDown = useCallback(() => {
    setIsActive.on();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseUp = useCallback(() => {
    setIsActive.off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseEnter = useCallback(() => {
    setIsVisible.on();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsVisible.off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @ts-ignore
  useEventListener('mousemove', onMouseMove, document);
  // @ts-ignore
  useEventListener('mousedown', onMouseDown, document);
  // @ts-ignore
  useEventListener('mouseup', onMouseUp, document);
  // @ts-ignore
  useEventListener('mouseenter', onMouseEnter, document);
  // @ts-ignore
  useEventListener('mouseleave', onMouseLeave, document);

  useEffect(() => {
    if (isActive) {
      if (cursorInnerRef.current && cursorOuterRef.current) {
        cursorInnerRef.current.style.transform = `scale(${innerScale})`;
        cursorOuterRef.current.style.transform = `scale(${outerScale})`;
      }
    } else {
      if (cursorInnerRef.current && cursorOuterRef.current) {
        cursorInnerRef.current.style.transform = 'scale(1)';
        cursorOuterRef.current.style.transform = 'scale(1)';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerScale, outerScale, isActive]);

  useEffect(() => {
    if (isActiveClickable) {
      if (cursorInnerRef.current && cursorOuterRef.current) {
        cursorInnerRef.current.style.transform = `scale(${innerScale * 1.3})`;
        cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerScale, outerScale, isActiveClickable]);

  useEffect(() => {
    if (isVisible) {
      if (cursorInnerRef.current && cursorOuterRef.current) {
        cursorInnerRef.current.style.opacity = '1';
        cursorOuterRef.current.style.opacity = '1';
      }
    } else {
      if (cursorInnerRef.current && cursorOuterRef.current) {
        cursorInnerRef.current.style.opacity = '0';
        cursorOuterRef.current.style.opacity = '0';
      }
    }
  }, [isVisible]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const clickables: NodeListOf<HTMLElement> = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
    );
    clickables.forEach((el) => {
      el.style.cursor = 'none';

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
  }, [isActive]);

  const styles: Styles = {
    cursorInner: {
      ...baseCursorStyles,
      width: innerSize,
      height: innerSize,
      backgroundColor: `rgba(${color}, 1)`,
      opacity: isVisible ? 0 : 1,
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
    },
    cursorOuter: {
      ...baseCursorStyles,
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      opacity: isVisible ? 0 : 1,
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
  };

  return { styles, cursorOuterRef, cursorInnerRef };
};

export default useCursor;
