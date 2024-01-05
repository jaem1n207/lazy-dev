import classNames from "classnames";
/**
 * Original Code
 * @see https://github.com/kentcdodds/kentcdodds.com/blob/main/app/components/typography.tsx
 * modified by @jaem1n207
 */
import * as React from "react";

import { PolymorphicComponent, PolymorphicComponentProps, PolymorphicRef } from "../polymorphic";

const fontSize = {
  h1: "leading-tight text-48pxr tablet:text-36pxr foldable:text-30pxr",
  h2: "leading-tight text-36pxr tablet:text-30pxr foldable:text-24pxr",
  h3: "font-medium text-30pxr leading-9 tablet:text-24pxr tablet:leading-8 foldable:text-20pxr foldable:leading-7",
  h4: "font-medium text-24pxr leading-8 tablet:text-20pxr tablet:leading-7 foldable:text-18pxr foldable:leading-6",
  h5: "font-medium text-20pxr leading-7 tablet:text-18pxr tablet:leading-6 foldable:text-16pxr foldable:leading-5",
  h6: "font-medium text-18pxr leading-6 tablet:text-16pxr tablet:leading-5 foldable:text-14pxr foldable:leading-4",
};

const titleColors = {
  primary: "text-black dark:text-white",
  secondary: "text-gray-400 dark:text-slate-500",
};

type TitleProps = {
  variant?: keyof typeof titleColors;
};

const Title = <T extends React.ElementType = "h1">({
  as,
  size,
  variant = "primary",
  children,
  className,
  ...props
}: PolymorphicComponentProps<T, TitleProps> & { size: keyof typeof fontSize }) => {
  const Component = as ?? size;

  return (
    <Component className={classNames(fontSize[size], titleColors[variant], className)} {...props}>
      {children}
    </Component>
  );
};

const H1 = (props: PolymorphicComponentProps<"h1", TitleProps>) => <Title size='h1' {...props} />;
const H2 = (props: PolymorphicComponentProps<"h2", TitleProps>) => <Title size='h2' {...props} />;
const H3 = (props: PolymorphicComponentProps<"h3", TitleProps>) => <Title size='h3' {...props} />;
const H4 = (props: PolymorphicComponentProps<"h4", TitleProps>) => <Title size='h4' {...props} />;
const H5 = (props: PolymorphicComponentProps<"h5", TitleProps>) => <Title size='h5' {...props} />;
const H6 = (props: PolymorphicComponentProps<"h6", TitleProps>) => <Title size='h6' {...props} />;

type _TypographyProps = {
  prose?: boolean;
};

type TypographyProps<T extends React.ElementType> = PolymorphicComponentProps<T, _TypographyProps>;

type TypographyComponent = PolymorphicComponent<"span", _TypographyProps>;

const Typography: TypographyComponent = React.forwardRef(
  <T extends React.ElementType = 'span'>(
    { as, prose = false, className, ...props }: TypographyProps<T>,
    ref: PolymorphicRef<T>['ref'],
  ) => {
    const Component = as ?? 'span';

    return (
      <Component
        ref={ref}
        className={classNames(
          prose ? 'prose' : 'text-base text-text-primary',
          className,
          'transition-colors duration-500',
        )}
        {...props}
      />
    );
  },
);

Typography.displayName = "Typography";

export { H1, H2, H3, H4, H5, H6, Typography };
