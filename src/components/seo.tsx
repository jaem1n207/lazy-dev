import * as React from 'react';

import { useStaticQuery, graphql } from 'gatsby';

type Meta = React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[];

// eslint-disable-next-line no-undef
interface SeoProps extends Pick<Queries.SiteSiteMetadata, 'title'> {
  // eslint-disable-next-line no-undef
  description?: Queries.Maybe<string>;
  // eslint-disable-next-line no-undef
  image?: Queries.Maybe<string>;
  meta?: Meta;
  pathname?: string;
}

interface SiteMetaData {
  site: {
    // eslint-disable-next-line no-undef
    siteMetadata: Queries.SiteSiteMetadata;
  };
}

const Seo = ({ description, image, title, pathname: propsPathname }: SeoProps) => {
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
    image: `${site.siteUrl}${image || site.favicon}`,
    url: `${site.siteUrl}${propsPathname || ''}`,
    author: site.author!.name || '',
  };

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{site.title ? `${title} | ${site.title}` : title}</title>
      <meta name="description" content={seo.description} />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.author} />
    </>
  );
};

export default Seo;
