import classNames from "classnames";
import { type HTMLAttributes, useMemo, useRef } from "react";

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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;

type HighlightProps = Props & NativeAttrs;

const Highlight = ({ rect, visible, ...props }: HighlightProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const isFirstVisible = usePrevious(isUnplacedRect(rect));

  // `isFirstVisible` 은 `rect` 가 변경될 때마다 변경됨
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
  }, [rect.width, rect.height, rect.left, rect.elementTop]);

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
