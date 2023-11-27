import { type HTMLAttributes, useMemo, useRef } from 'react';

import classNames from 'classnames';

import { usePrevious } from 'Hooks/use-previous';

import { type ReactiveDomReact, isUnplacedRect } from '../../hooks/use-rect';

type Props = {
  rect: ReactiveDomReact;
  visible?: boolean;
  hoverHeightRatio?: number;
  hoverWidthRatio?: number;
};

type HighlightPosition = {
  width: number;
  left: number;
  height: number;
  top: number;
  transition: string;
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

type HighlightProps = Props & NativeAttrs;

const Highlight = ({ rect, visible, ...props }: HighlightProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const isFirstVisible = usePrevious(isUnplacedRect(rect));

  const position = useMemo<HighlightPosition>(() => {
    const width = rect.width;
    const height = rect.height;

    return {
      width,
      height,
      left: rect.left + (rect.width - width) / 2,
      top: rect.elementTop + (rect.height - height) / 2,
      // 초기 좌표 값은 -1000 이므로 트랜지션을 주게 되면 첫 요소에 적용되는데 오래 걸리게 됩니다. 따라서 첫 요소에는 트랜지션을 주지 않습니다.
      transition: isFirstVisible ? 'opacity' : 'opacity, width, left, top',
    };
    // `isFirstVisible` 을 의존성 배열에 넣지 않는 이유는, `isFirstVisible` 은 `rect` 가 변경될 때마다 변경되기 때문입니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);

  return (
    <span
      ref={ref}
      className={classNames(
        'absolute rounded-md bg-gray-100 text-primary duration-100 ease-linear dark:bg-gray-800',
        {
          'opacity-0': !visible,
          'opacity-100': visible,
        },
      )}
      style={{
        width: position.width,
        left: position.left,
        height: position.height,
        top: position.top,
        opacity: visible ? 0.8 : 0,
        transitionProperty: position.transition,
      }}
      {...props}
    />
  );
};

export default Highlight;
