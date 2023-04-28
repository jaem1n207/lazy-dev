import React, { PropsWithChildren } from 'react';

import classNames from 'classnames';

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className, children }: PropsWithChildren<SkeletonProps>) => {
  const classes = classNames('animate-pulse', className);

  return (
    <div role="status" aria-label="Loading content" className={classes}>
      {children}
    </div>
  );
};

export default Skeleton;
