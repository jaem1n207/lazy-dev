/* eslint-disable react/prop-types */
import React, { HTMLProps, ReactNode, forwardRef, memo } from 'react';

import classNames from 'classnames';

interface LinkLikeComponentProps extends HTMLProps<HTMLAnchorElement> {
  url?: string;
  children?: ReactNode;
  external?: boolean;
  download?: string | boolean;
}

interface UnderlineLinkProps extends LinkLikeComponentProps {}

const UnderlineLink = memo(
  forwardRef<HTMLAnchorElement, UnderlineLinkProps>(function UnderlineLink(
    { children, ...props },
    ref
  ) {
    const { url, external, className: customClassName, ...restProps } = props;

    const externalAttributes = {
      ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
    };

    return (
      <a
        {...externalAttributes}
        {...restProps}
        href={url}
        ref={ref}
        className={classNames(
          `text-primary shadow-text-underline hover:shadow-none transition-shadow focus-primary`,
          customClassName
        )}
      >
        {children}
      </a>
    );
  })
);

export default UnderlineLink;
