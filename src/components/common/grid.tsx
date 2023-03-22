import React, { ElementType, forwardRef, HTMLAttributes } from 'react';

import classNames from 'classnames';
import { motion, MotionProps } from 'framer-motion';

interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  rowGap?: string;
  children: React.ReactNode;
  animated?: boolean;
}

const Grid = forwardRef<HTMLElement, GridProps>(
  ({ as: Component = 'div', className, rowGap, children, animated = true, ...rest }, ref) => {
    const baseStyles = classNames(
      `max-w-7xl mx-auto relative grid grid-cols-12 gap-x-24pxr tablet:gap-x-16pxr tablet:grid-cols-8 mobile:grid-cols-4`,
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
        <Component ref={ref} className={baseStyles} {...rest}>
          {children}
        </Component>
      </motion.div>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
