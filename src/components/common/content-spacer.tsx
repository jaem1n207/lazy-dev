import React, { ElementType, HTMLAttributes, forwardRef } from 'react';

import { window } from 'browser-monads-ts';
import classNames from 'classnames';

interface ContentSpacerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
  compact?: boolean;
}

const ContentSpacer = forwardRef<HTMLElement, ContentSpacerProps>(
  ({ as: Component = 'div', className, children, compact = true, ...rest }, ref) => {
    const isRootPath = window.location.pathname === '/';

    const baseStyles = classNames(
      `relative mx-10vw`,
      {
        'mx-auto max-w-7xl': compact,
        'mx-auto max-w-4xl': !isRootPath,
      },
      className
    );

    return (
      <Component ref={ref} className={baseStyles} {...rest}>
        {children}
      </Component>
    );
  }
);

ContentSpacer.displayName = 'ContentSpacer';

export default ContentSpacer;
