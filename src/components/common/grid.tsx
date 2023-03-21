import React, { ElementType, forwardRef, HTMLAttributes } from 'react';

import classNames from 'classnames';
import { motion, MotionProps } from 'framer-motion';

import ContentSpacer from './content-spacer';

interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  rowGap?: string;
  renderContentSpacer?: boolean;
  children: React.ReactNode;
  animated?: boolean;
}

const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      as: Component = 'div',
      className,
      rowGap,
      renderContentSpacer = true,
      children,
      animated = true,
      ...rest
    },
    ref
  ) => {
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
        {renderContentSpacer ? (
          <ContentSpacer ref={ref} {...rest}>
            <Component className={baseStyles}>{children}</Component>
          </ContentSpacer>
        ) : (
          <Component ref={ref} className={baseStyles} {...rest}>
            {children}
          </Component>
        )}
      </motion.div>
    );
  }
);

Grid.displayName = 'Grid';

export default Grid;
