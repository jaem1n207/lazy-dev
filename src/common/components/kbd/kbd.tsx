import { forwardRef, useMemo, type ElementType, type ReactNode } from "react";
import classNames from "classnames";

import type {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from "../polymorphic";
import { kbdKeyMapMac, kbdKeyMapWinLinux, kbdKeyTitleMap, type KbdKey } from "./types";

type _KbdProps = {
  keys?: KbdKey | KbdKey[];
  className?: {
    wrapper?: string;
    abbr?: string;
    kbd?: string;
  };
  children?: ReactNode;
};

type KbdProps<T extends ElementType> = PolymorphicComponentProps<T, _KbdProps>;

type KbdComponent = PolymorphicComponent<"kbd", _KbdProps>;

const Kbd: KbdComponent = forwardRef(
  <T extends ElementType = "kbd">(
    { as, keys, className, children, ...props }: KbdProps<T>,
    ref: PolymorphicRef<T>["ref"],
  ) => {
    const Component = as ?? "kbd";

    const keyContents = useMemo(() => {
      const keyMap = window.__LAZY_DEV_DATA__.platform === "mac" ? kbdKeyMapMac : kbdKeyMapWinLinux;
      const keysToRender = typeof keys === "string" ? [keys] : Array.isArray(keys) ? keys : [];

      return keysToRender.map((key) => (
        <abbr
          key={key}
          className={classNames("no-underline", className?.abbr)}
          title={kbdKeyTitleMap[key]}
        >
          {keyMap[key]}
        </abbr>
      ));
    }, [keys, className?.abbr]);

    return (
      <Component
        ref={ref}
        className={classNames(
          "inline-flex items-center justify-center space-x-0.5 rounded-md bg-bg-secondary px-1.5 py-0.5 text-center font-sans text-sm font-normal text-neutral-600 shadow-sm pointer-coarse:hidden dark:text-zinc-200",
          className?.wrapper,
        )}
        {...props}
      >
        {keyContents}
        {children && <span className={className?.kbd}>{children}</span>}
      </Component>
    );
  },
);

Kbd.displayName = "Kbd";

export default Kbd;
