import React from 'react';

import { UnstyledLink } from 'Apps/common/a';
import ContentSpacer from 'Apps/common/layout/components/content-spacer';

const Footer = () => {
  return (
    <ContentSpacer as="footer" className="pb-32pxr pt-28pxr">
      <div className="mx-auto flex max-w-7xl">
        @ {new Date().getFullYear()}, Built with&nbsp;
        <UnstyledLink external url="https://www.gatsbyjs.com" className="focus-primary rounded-sm">
          Gatsby
        </UnstyledLink>
        <div className="ml-auto">
          <UnstyledLink external url="/rss.xml" className="focus-primary rounded-sm">
            rss
          </UnstyledLink>
        </div>
      </div>
    </ContentSpacer>
  );
};

export default Footer;
