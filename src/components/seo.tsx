import * as React from 'react';

import useSiteMetadata from 'Hooks/useSiteMetadata';

type Meta = React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[];

// eslint-disable-next-line no-undef
interface SeoProps extends Pick<Queries.SiteSiteMetadata, 'title'> {
  // eslint-disable-next-line no-undef
  description?: Queries.Maybe<string>;
  // eslint-disable-next-line no-undef
  image?: Queries.Maybe<string>;
  meta?: Meta;
}

const Seo = ({ description, image, title }: SeoProps) => {
  const site = useSiteMetadata();

  const metaDescription = description || site.description;
  const ogImageUrl = site.siteUrl ?? '' + (image || (site.favicon as string));

  return (
    <>
      <title>{site.title ? `${title} | ${site.title}` : title}</title>
      <meta name="description" content={metaDescription as string} />
      <meta property="og:title" content={title as string} />
      <meta property="og:description" content={metaDescription as string} />
      <meta property="og:type" content="website" />
      <meta property="image" content={ogImageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      {/* <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.social?.twitter || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} /> */}
    </>
  );
};

export default Seo;
