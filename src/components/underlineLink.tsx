/* eslint-disable react/prop-types */
import * as React from 'react';

import classNames from 'classnames';

interface LinkLikeComponentProps extends React.HTMLProps<HTMLAnchorElement> {
  url?: string;
  children?: React.ReactNode;
  external?: boolean;
  download?: string | boolean;
}

interface UnderlineLinkProps extends LinkLikeComponentProps {}

export const UnderlineLink = React.memo(
  React.forwardRef<HTMLAnchorElement, UnderlineLinkProps>(function UnderlineLink(
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
          `text-primary shadow-text-underline hover:shadow-none transition-shadow`,
          customClassName
        )}
      >
        {children}
      </a>
    );
  })
);
