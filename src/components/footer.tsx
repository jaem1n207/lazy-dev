import * as React from 'react';

import tw from 'twin.macro';

import { UnderlineLink } from 'Components/underlineLink';

const Footer = () => {
  return (
    <footer css={tw`mt-70pxr pt-28pxr`}>
      @ {new Date().getFullYear()}, Built with
      {` `}
      <UnderlineLink href="https://github.com/jaem1n207/lazy-dev">Lazy Dev</UnderlineLink>
      <div css={tw`float-right`}>
        <UnderlineLink href="/rss.xml" target="_blank" rel="noopener noreferrer">
          rss
        </UnderlineLink>
      </div>
    </footer>
  );
};

export default Footer;
