import React, { ReactNode } from 'react';

import { useStaticQuery, graphql } from 'gatsby';

interface SeoProps extends Pick<Queries.SiteSiteMetadata, 'title'> {
  description?: Queries.Maybe<string>;
  thumbnail?: Queries.Maybe<string>;
  pathname?: string;
  children?: ReactNode;
}

interface SiteMetaData {
  site: {
    siteMetadata: Queries.SiteSiteMetadata;
  };
}

const Seo = ({ description, title, thumbnail, pathname: propsPathname, children }: SeoProps) => {
  const data = useStaticQuery<SiteMetaData>(
    graphql`
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
    `
  );

  const site = data.site.siteMetadata;

  const seo = {
    title: title || site.title!,
    description: description || site.description!,
    image: thumbnail || undefined,
    url: `${site.siteUrl}${propsPathname || ''}`,
    author: site.author!.name || '',
  };

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{site.title ? `${title} | ${site.title}` : title}</title>
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={seo.title} />
      <meta property="og:locale" content="ko_KR" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.author} />

      {children}
    </>
  );
};

export default Seo;
