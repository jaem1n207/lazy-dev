import React, { ElementType, forwardRef, ForwardedRef, HTMLAttributes } from 'react';

import classNames from 'classnames';
import { MotionProps } from 'framer-motion';
import tw from 'twin.macro';

type GridProps = {
  as?: ElementType;
  className?: string;
  rowGap?: string;
  children: React.ReactNode;
  animated?: boolean;
} & HTMLAttributes<HTMLElement>;

const Grid = forwardRef<ForwardedRef<HTMLElement>, GridProps>(
  ({ as: Component = 'div', className, rowGap, children, animated = true, ...rest }, ref) => {
    const baseStyles = classNames(
      tw`relative grid grid-cols-12 gap-x-24pxr tablet:grid-cols-8 tablet:gap-x-16pxr desktop:grid-cols-4`,
      {
        [`grid-row-gap-${rowGap}`]: rowGap,
      },
      className
    );

    const motionProps: MotionProps = animated
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 },
        }
      : {};

    return (
      <Component ref={ref} className={baseStyles} {...motionProps} {...rest}>
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
