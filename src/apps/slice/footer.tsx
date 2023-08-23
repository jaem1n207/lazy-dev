import React from 'react';

import UnderlineLink from 'Apps/common/a/components/underlineLink';
import ContentSpacer from 'Apps/common/layout/components/content-spacer';

const Footer = () => {
  return (
    <ContentSpacer as="footer" className="pb-32pxr pt-28pxr">
      <div className="flex mx-auto max-w-7xl">
        @ {new Date().getFullYear()}, Built with&nbsp;
        <UnderlineLink external url="https://www.gatsbyjs.com" className="rounded-sm focus-primary">
          Gatsby
        </UnderlineLink>
        <div className="ml-auto">
          <UnderlineLink external url="/rss.xml" className="rounded-sm focus-primary">
            rss
          </UnderlineLink>
        </div>
      </div>
    </ContentSpacer>
  );
};

export default Footer;
