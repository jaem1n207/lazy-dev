import type { GatsbySSR } from "gatsby";

export { wrapPageElement } from "./gatsby-shared";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
  setBodyAttributes,
  setPreBodyComponents,
}) => {
  setBodyAttributes({
    className: "min-h-screen antialiased tracking-tight text-text-primary bg-bg-primary transition",
  });
  setHtmlAttributes({
    lang: "ko",
  });
  setPreBodyComponents([
    <script
      key="gatsby-ssr-inline-script"
      id="gatsby-ssr-inline-script"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: String(process.env.LAZY_DEV_PRE_BODY_SCRIPT),
      }}
    />,
  ]);
};
