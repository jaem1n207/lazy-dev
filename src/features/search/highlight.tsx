import { type HTMLAttributes, useMemo, useRef } from "react";

import classNames from "classnames";

import { usePrevious } from "@/common/hooks/use-previous";
import { type ReactiveDomReact, isUnplacedRect } from "@/common/hooks/use-rect";

type Props = {
  rect: ReactiveDomReact;
  visible?: boolean;
  hoverHeightRatio?: number;
  hoverWidthRatio?: number;
};

type HighlightPosition = {
  width: number;
  height: number;
  transform: string;
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
    const left = rect.left + (rect.width - width) / 2;
    const top = rect.elementTop + (rect.height - height) / 2;

    return {
      width,
      height,
      transform: `translate(${left}px, ${top}px)`,
      // 초기 좌표 값은 translate(-1000px, -1000px) 입니다.
      // 이때, 애니메이션을 적용하면 사용자에게 사이트가 느린 느낌을 줍니다.
      // 따라서 첫 요소에는 바로 하이라이트가 적용될 수 있도록 애니메이션을 적용하지 않습니다.
      transition: isFirstVisible ? "opacity" : "opacity, transform",
    };
    // `isFirstVisible` 을 의존성 배열에 넣지 않는 이유는, `isFirstVisible` 은 `rect` 가 변경될 때마다 변경되기 때문입니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);

  return (
    <span
      ref={ref}
      className={classNames(
        "absolute left-0pxr top-0pxr rounded-md bg-gray-300 text-primary duration-100 ease-linear will-change-transform dark:bg-gray-800",
        {
          "opacity-0": !visible,
          "opacity-100": visible,
        },
      )}
      style={{
        opacity: visible ? 0.8 : 0,
        width: position.width,
        height: position.height,
        transform: position.transform,
        transitionProperty: position.transition,
      }}
      {...props}
    />
  );
};

export default Highlight;
