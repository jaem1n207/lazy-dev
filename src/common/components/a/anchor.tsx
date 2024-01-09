/* eslint-disable react/prop-types */
import { forwardRef, HTMLProps, memo, ReactNode } from "react";
import classNames from "classnames";

type AnchorVariant = "default" | "underline";

const anchorVariantClassName: Record<AnchorVariant, string> = {
  default: "focus-primary text-primary",
  underline: "focus-primary text-primary shadow-text-underline transition-shadow hover:shadow-none",
};

interface LinkLikeComponentProps extends HTMLProps<HTMLAnchorElement> {
  children?: ReactNode;
  external?: boolean;
  download?: string | boolean;
  variant?: AnchorVariant;
}

type AnchorProps = LinkLikeComponentProps;

const Anchor = memo(
  forwardRef<HTMLAnchorElement, AnchorProps>(function Anchor({ children, ...props }, ref) {
    const { href, external, className: customClassName, variant, ...restProps } = props;

    const externalAttributes = {
      ...(external && { target: "_blank", rel: "noopener noreferrer" }),
    };

    return (
      <a
        {...externalAttributes}
        {...restProps}
        href={href}
        ref={ref}
        className={classNames(anchorVariantClassName[variant ?? "default"], customClassName)}
      >
        {children}
      </a>
    );
  }),
);

export default Anchor;
