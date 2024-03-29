import Anchor from "@/common/components/a/anchor";
import ContentSpacer from "@/common/components/layout/content-spacer";

const Footer = () => {
  return (
    <ContentSpacer as="footer" className="pb-32pxr pt-28pxr">
      <div className="mx-auto flex max-w-7xl">
        @ {new Date().getFullYear()}, Built with&nbsp;
        <Anchor external href="https://www.gatsbyjs.com" className="rounded-sm">
          Gatsby
        </Anchor>
        <div className="ml-auto">
          <Anchor external href="/rss.xml" className="rounded-sm">
            rss
          </Anchor>
        </div>
      </div>
    </ContentSpacer>
  );
};

export default Footer;
