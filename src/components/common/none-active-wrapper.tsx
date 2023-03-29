import React from 'react';

import classNames from 'classnames';

import { ELEMENT_CLASS } from 'Types/enum';

interface NoneActiveWrapperProps {
  children: React.ReactNode;
}

const NoneActiveWrapper = ({ children }: NoneActiveWrapperProps) => {
  const wrappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const newClassName = classNames(child.props.className, ELEMENT_CLASS.NONE_ACTIVE);
      // @ts-ignore
      return React.cloneElement<React.HTMLAttributes<HTMLElement>>(child, {
        className: newClassName,
      });
    }
    return child;
  });

  return <>{wrappedChildren}</>;
};

export default NoneActiveWrapper;
