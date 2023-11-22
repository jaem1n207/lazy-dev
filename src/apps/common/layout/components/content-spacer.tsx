import { ElementType, HTMLAttributes, forwardRef } from 'react';
import * as React from 'react';

import classNames from 'classnames';

interface ContentSpacerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
  compact?: boolean;
}

const ContentSpacer = forwardRef<HTMLElement, ContentSpacerProps>(
  ({ as: Component = 'div', className, children, compact = false, ...rest }, ref) => {
    const classes = classNames(
      'relative',
      {
        'mx-10vw': !compact,
        'mx-auto': compact,
      },
      className,
    );

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
      </Component>
    );
  },
);

ContentSpacer.displayName = 'ContentSpacer';

export default ContentSpacer;
