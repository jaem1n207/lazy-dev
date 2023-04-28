import React, { PropsWithChildren } from 'react';

import classNames from 'classnames';

interface SkeletonProps {
  className?: string;
}

interface SkeletonItemProps {
  children: React.ReactNode;
}

/**
 * 전달 받은 children의 모든 자식 요소에 bg-slate-700 클래스를 추가합니다.
 */
const addClassToChildren = (children: React.ReactNode): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const className = child.props.className
        ? `${child.props.className} bg-slate-700`
        : 'bg-slate-700';

      return React.cloneElement(child as React.ReactElement, {
        className,
        children: addClassToChildren(child.props.children),
      });
    }
    return child;
  });
};

const SkeletonItem = ({ children }: SkeletonItemProps) => {
  return <>{addClassToChildren(children)}</>;
};

const Skeleton = ({ className, children }: PropsWithChildren<SkeletonProps>) => {
  const classes = classNames('animate-pulse', className);

  return (
    <div role="status" aria-label="Loading content" className={classes}>
      {children}
    </div>
  );
};

Skeleton.Item = SkeletonItem;

export default Skeleton;
