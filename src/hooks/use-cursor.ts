import { useState, useRef, CSSProperties, useCallback, useEffect } from 'react';

import { getElements } from 'Libs/dom';

import { useBoolean } from './use-boolean';
import useEventListener from './use-event-listener';

type CalculateCursorCSSProperties = Pick<CSSProperties, 'opacity' | 'top' | 'left' | 'transform'>;

interface Styles {
  cursorInner: CalculateCursorCSSProperties;
  cursorOuter: CalculateCursorCSSProperties;
}

const outerScale = 3;

const useCursor = () => {
  const documentRef = useRef<Document>(document);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useBoolean(false);
  const [isActive, setIsActive] = useBoolean(false);
  const [isActiveClickable, setIsActiveClickable] = useBoolean(false);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>(0);
  let endX = useRef(0);
  let endY = useRef(0);

  // const matrix = new DOMMatrix();
  // const hoverContainer = getElement('.hover-container') as HTMLElement;
  // const links = getElements('.hover-this');
  // links.forEach((link) => {
  //   link.addEventListener('mousemove', (e) => {
  //     if (!hoverContainer) return;
  //     console.log(e.clientX);
  //     const x = e.clientX - hoverContainer.offsetLeft;
  //     const y = e.clientY - hoverContainer.offsetTop;

  //     matrix.e = x / hoverContainer.offsetWidth - 0.5;
  //     matrix.f = y / hoverContainer.offsetHeight - 0.5;

  //     link.style.transform = `matrix3d(${matrix.toString()})`;
  //   });
  // });

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
    // cursorInnerRef를 천천히 따라가는 느낌을 위해 deps에 coords 넣지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [requestRef]
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

  useEventListener('mousemove', onMouseMove, documentRef);
  useEventListener('mousedown', onMouseDown, documentRef);
  useEventListener('mouseup', onMouseUp, documentRef);
  useEventListener('mouseenter', onMouseEnter, documentRef);
  useEventListener('mouseleave', onMouseLeave, documentRef);

  useEffect(() => {
    if (isActive) {
      if (cursorInnerRef.current && cursorOuterRef.current) {
        cursorInnerRef.current.style.transform = `scale(0.7)`;
        cursorOuterRef.current.style.transform = `scale(${outerScale})`;
      }
    } else {
      if (cursorInnerRef.current && cursorOuterRef.current) {
        cursorInnerRef.current.style.transform = `scale(1)`;
        cursorOuterRef.current.style.transform = 'scale(1)';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outerScale, isActive]);

  useEffect(() => {
    if (isActiveClickable) {
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outerScale, isActiveClickable]);

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
    const clickables = getElements(
      'a, input[type="submit"], input[type="image"], label[for], select, button:not([disabled]), .link, input[type="text"], input[type="checkbox"]:not([disabled]), input[type="radio"]:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
      top: 0,
      left: 0,
    },
    cursorOuter: {
      top: 0,
      left: 0,
    },
  };

  return { styles, cursorOuterRef, cursorInnerRef };
};

export default useCursor;
