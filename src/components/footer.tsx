import React from 'react';

import { UnderlineLink } from 'Components/common/underlineLink';

const Footer = () => {
  return (
    <footer className={`flex mt-32pxr pt-28pxr`}>
      @ {new Date().getFullYear()}, Built with&nbsp;
      <UnderlineLink external url="https://github.com/jaem1n207/lazy-dev">
        Lazy Dev
      </UnderlineLink>
      <div className="ml-auto">
        <UnderlineLink external url="/rss.xml">
          rss
        </UnderlineLink>
      </div>
    </footer>
  );
};

export default Footer;
