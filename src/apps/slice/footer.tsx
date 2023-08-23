import React from 'react';

import { UnstyledLink } from 'Apps/common/a';
import ContentSpacer from 'Apps/common/layout/components/content-spacer';

const Footer = () => {
  return (
    <ContentSpacer as="footer" className="pb-32pxr pt-28pxr">
      <div className="flex mx-auto max-w-7xl">
        @ {new Date().getFullYear()}, Built with&nbsp;
        <UnstyledLink external url="https://www.gatsbyjs.com" className="rounded-sm focus-primary">
          Gatsby
        </UnstyledLink>
        <div className="ml-auto">
          <UnstyledLink external url="/rss.xml" className="rounded-sm focus-primary">
            rss
          </UnstyledLink>
        </div>
      </div>
    </ContentSpacer>
  );
};

export default Footer;
