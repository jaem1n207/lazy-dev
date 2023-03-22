/**
 * Original Code
 * @see https://github.com/kentcdodds/kentcdodds.com/blob/main/app/components/typography.tsx
 * modified by @jaem1n207
 */
import * as React from 'react';

import classNames from 'classnames';

interface CommonProps {
  as?: React.ElementType;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

const fontSize = {
  h1: 'leading-tight text-48pxr tablet:text-36pxr',
  h2: 'leading-tight text-36pxr tablet:text-30pxr',
  h3: 'font-medium text-30pxr leading-9 tablet:text-24pxr tablet:leading-8',
  h4: 'font-medium text-24pxr leading-8 tablet:text-20pxr tablet:leading-7',
  h5: 'font-medium text-20pxr leading-7 tablet:text-18pxr tablet:leading-6',
  h6: 'font-medium text-18pxr leading-6',
};

const titleColors = {
  primary: 'text-black dark:text-white',
  secondary: 'text-gray-400 dark:text-slate-500',
};

interface TitleProps extends CommonProps {
  variant?: keyof typeof titleColors;
}

const Title = ({
  as,
  size,
  variant = 'primary',
  className,
  id,
  children,
}: TitleProps & { size: keyof typeof fontSize }) => {
  const Component = as ?? size;
  return (
    <Component
      id={id}
      className={classNames(
        fontSize[size],
        titleColors[variant],
        className,
        'transition-colors duration-500'
      )}
    >
      {children}
    </Component>
  );
};

const H1 = (props: TitleProps) => <Title {...props} size="h1" />;

const H2 = (props: TitleProps) => <Title {...props} size="h2" />;

const H3 = (props: TitleProps) => <Title {...props} size="h3" />;

const H4 = (props: TitleProps) => <Title {...props} size="h4" />;

const H5 = (props: TitleProps) => <Title {...props} size="h5" />;

const H6 = (props: TitleProps) => <Title {...props} size="h6" />;

interface ParagraphProps extends CommonProps {
  prose?: boolean;
  textColorClassName?: string;
}

const Typography = ({
  as = 'p',
  prose = true,
  textColorClassName = 'text-secondary',
  className,
  id,
}: React.PropsWithChildren<ParagraphProps>) => {
  const Component = as;
  return (
    <Component
      id={id}
      className={classNames(
        'text-28pxr tablet:text-18pxr',
        textColorClassName,
        className,
        prose && 'prose prose-light dark:prose-dark',
        'transition-colors duration-500'
      )}
    />
  );
};

export { H1, H2, H3, H4, H5, H6, Typography };
