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
}

const fontSize = {
  h1: 'leading-tight text-5xl tablet:text-4xl',
  h2: 'leading-tight text-4xl tablet:text-3xl',
  h3: 'font-medium text-3xl tablet:text-2xl',
  h4: 'font-medium text-2xl tablet:text-xl',
  h5: 'font-medium text-xl tablet:text-lg',
  h6: 'font-medium text-lg',
};

const titleColors = {
  primary: 'text-black dark:text-white',
  secondary: 'text-gray-400 dark:text-slate-500',
};

interface TitleProps extends CommonProps {
  size: keyof typeof fontSize;
  variant?: keyof typeof titleColors;
}

const Title = ({ as, size, variant = 'primary', className, id }: TitleProps) => {
  const Component = as ?? size;
  return (
    <Component id={id} className={classNames(fontSize[size], titleColors[variant], className)} />
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
        prose && 'prose prose-light dark:prose-dark'
      )}
    />
  );
};

export { H1, H2, H3, H4, H5, H6, Typography };
