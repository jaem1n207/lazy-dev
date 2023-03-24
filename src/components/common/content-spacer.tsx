import React, { ElementType, HTMLAttributes, forwardRef, useEffect, useState } from 'react';

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
    const [isRootPath, setIsRootPath] = useState(false);

    // const baseStyles = classNames(
    //   `relative mx-10vw`,
    //   {
    //     'mx-auto max-w-7xl': compact,
    //     'mx-auto max-w-4xl': !isRootPath,
    //   },
    //   className
    // );

    useEffect(() => {
      setIsRootPath(checkRootPath(window.location.pathname));
    }, []);

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
