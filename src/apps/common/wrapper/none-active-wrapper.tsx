import { Children, HTMLAttributes, ReactNode, cloneElement, isValidElement } from 'react';

import classNames from 'classnames';

import { ELEMENT_CLASS } from 'Types/enum';

interface NoneActiveWrapperProps {
  children: ReactNode;
}

const NoneActiveWrapper = ({ children }: NoneActiveWrapperProps) => {
  const wrappedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const newClassName = classNames(child.props.className, ELEMENT_CLASS.NONE_ACTIVE);
      // @ts-ignore
      return cloneElement<HTMLAttributes<HTMLElement>>(child, {
        className: newClassName,
      });
    }
    return child;
  });

  return <>{wrappedChildren}</>;
};

export default NoneActiveWrapper;
