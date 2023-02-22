import { useState, useEffect, useCallback } from 'react';

interface CursorStyle {
  transform: string;
}

const useCursor = (cursorType: string, expandOnHover: boolean) => {
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>({
    transform: '',
  });

  const updateCursorStyle = useCallback(
    (event: MouseEvent) => {
      const { pageX: x, pageY: y } = event;
      console.log('updateCursorStyle', cursorType);
      setCursorStyle({
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(0.23, 0.23) ${cursorType}`,
      });
    },
    [cursorType]
  );

  const expandCursor = () => {
    setCursorStyle((prevStyle: any) => ({
      ...prevStyle,
      transform: `${prevStyle.transform} scale(1)`,
    }));
  };

  const resetCursor = () => {
    setCursorStyle((prevStyle) => ({
      ...prevStyle,
      transform: prevStyle.transform.replace('scale(1)', 'scale(0.23, 0.23)'),
    }));
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateCursorStyle);

    if (expandOnHover) {
      document.querySelectorAll('[data-hoverable=true]').forEach((element) => {
        element.addEventListener('mousedown', expandCursor);
        element.addEventListener('mouseup', resetCursor);
      });
    }

    return () => {
      window.removeEventListener('mousemove', updateCursorStyle);

      if (expandOnHover) {
        document.querySelectorAll('[data-hoverable=true]').forEach((element) => {
          element.removeEventListener('mousedown', expandCursor);
          element.removeEventListener('mouseup', resetCursor);
        });
      }
    };
  }, [cursorType, expandOnHover, updateCursorStyle]);

  return cursorStyle;
};

export default useCursor;
