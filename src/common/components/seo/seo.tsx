import type { ReactNode } from "react";
import { graphql, useStaticQuery } from "gatsby";

interface SeoProps {
  title?: string | null;
  description?: string | null;
  children?: ReactNode;
  openGraph?: {
    type?: "website" | "article";
    url?: string;
    image?: string | null;
  } | null;
}

const Seo = ({ description, title, openGraph, children }: SeoProps) => {
  const site = useSiteMetadata();

  const seo = {
    title: title || site?.title!,
    description: description || site?.description!,
    author: site?.author?.name || null,
    openGraph: {
      type: openGraph?.type || "website",
      url: `${site?.siteUrl}${openGraph?.url}` || null,
      image: `${site?.siteUrl}${openGraph?.image || site?.favicon}` || null,
    },
  };

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Facebook Meta Tags */}
      {seo.openGraph.url && <meta property="og:url" content={seo.openGraph.url} />}
      <meta property="og:type" content={seo.openGraph.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.openGraph.image || ""} />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.openGraph.image || ""} />
      <meta name="twitter:creator" content={seo?.author || ""} />

      {children}
    </>
  );
};

const useSiteMetadata = () => {
  const { site } = useStaticQuery<Queries.SiteMetaDataQuery>(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          description
          lang
          favicon
          postTitle
          siteUrl
          social {
            github
          }
          title
        }
      }
    }
  `);

  if (!site?.siteMetadata) {
    console.error("site.siteMetadata is undefined");

    return undefined;
  }

  return site.siteMetadata;
};

export default Seo;
