import React from 'react';

import { ContentSpacer, UnderlineLink } from 'Components/common';

const Footer = () => {
  return (
    <ContentSpacer as="footer" className="mt-32pxr pt-28pxr">
      <div className="flex mx-auto max-w-7xl">
        @ {new Date().getFullYear()}, Built with&nbsp;
        <UnderlineLink external url="https://github.com/jaem1n207/lazy-dev">
          Lazy Dev
        </UnderlineLink>
        <div className="ml-auto">
          <UnderlineLink external url="/rss.xml">
            rss
          </UnderlineLink>
        </div>
      </div>
    </ContentSpacer>
  );
};

export default Footer;
