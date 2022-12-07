import * as React from 'react';

import { Link } from 'gatsby';
import tw from 'twin.macro';

interface Props {
  children: React.ReactNode;
  size?: 'medium' | 'large';
}

const Header = ({ children, size = 'medium' }: Props) => {
  let header = (
    <Link css={tw`no-underline text-24pxr`} to="/">
      {children}
    </Link>
  );

  if (size === 'large') {
    header = (
      <h1 css={tw`m-0pxr text-40pxr`}>
        <Link to="/">{children}</Link>
      </h1>
    );
  }

  return <header css={tw`font-bold mb-48pxr`}>{header}</header>;
};

export default Header;
