import React from 'react';

import { Link } from 'gatsby';
import tw from 'twin.macro';

interface Props {
  children: React.ReactNode;
  size?: 'medium' | 'large';
}

const Header = ({ children, size = 'medium' }: Props) => {
  let header = (
    <Link css={tw`text-24pxr`} to="/">
      {children}
    </Link>
  );

  if (size === 'large') {
    header = (
      <h1 css={tw`text-36pxr`}>
        <Link to="/">{children}</Link>
      </h1>
    );
  }

  return <header css={tw`font-bold`}>{header}</header>;
};

export default Header;
