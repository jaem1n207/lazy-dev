import * as React from "react";

import classNames from "classnames";

import { PolymorphicComponent, PolymorphicComponentProps, PolymorphicRef } from "../polymorphic";

type _ContentSpacerProps = {
  compact?: boolean;
};

type ContentSpacerProps<T extends React.ElementType> = PolymorphicComponentProps<
  T,
  _ContentSpacerProps
>;

type ContentSpacerComponent = PolymorphicComponent<"div", _ContentSpacerProps>;

const ContentSpacer: ContentSpacerComponent = React.forwardRef(
  <T extends React.ElementType = 'div'>(
    { as, compact = false, className, ...props }: ContentSpacerProps<T>,
    ref: PolymorphicRef<T>['ref'],
  ) => {
    const Component = as ?? 'div';

    const classes = classNames(
      'relative',
      {
        'mx-10vw': !compact,
        'mx-auto': compact,
      },
      className,
    );

    return <Component ref={ref} className={classes} {...props} />;
  },
);

ContentSpacer.displayName = "ContentSpacer";

export default ContentSpacer;
