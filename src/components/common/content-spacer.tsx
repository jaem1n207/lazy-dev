import React, { ElementType, HTMLAttributes, forwardRef } from 'react';

import { window } from 'browser-monads-ts';
import tw from 'twin.macro';

import { checkRootPath } from 'Libs/url';

interface ContentSpacerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
  compact?: boolean;
}

const ContentSpacer = forwardRef<HTMLElement, ContentSpacerProps>(
  ({ as: Component = 'div', className, children, compact = false, ...rest }, ref) => {
    const isRootPath = checkRootPath(window.location.pathname);

    return (
      <Component
        ref={ref}
        css={[
          tw`relative mx-10vw`,
          compact && tw`mx-auto max-w-7xl`,
          !isRootPath && tw`max-w-4xl mx-auto`,
          ...(className ? [className] : []),
        ]}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

ContentSpacer.displayName = 'ContentSpacer';

export default ContentSpacer;
