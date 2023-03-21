import React, { ElementType, forwardRef, HTMLAttributes } from 'react';

import classNames from 'classnames';
import { motion, MotionProps } from 'framer-motion';

type GridProps = {
  as?: ElementType;
  className?: string;
  rowGap?: string;
  children: React.ReactNode;
  animated?: boolean;
} & HTMLAttributes<HTMLElement>;

const Grid = forwardRef<HTMLElement, GridProps>(
  ({ as: Component = 'div', className, rowGap, children, animated = true, ...rest }, ref) => {
    const wrapperStyles = classNames(`relative mx-10vw`);

    const baseStyles = classNames(
      `relative grid grid-cols-12 gap-x-24pxr tablet:grid-cols-8 tablet:gap-x-16pxr desktop:grid-cols-4`,
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
      <motion.div {...motionProps}>
        <Component ref={ref} className={wrapperStyles} {...rest}>
          <div className={baseStyles}>{children}</div>
        </Component>
      </motion.div>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
