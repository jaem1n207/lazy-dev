import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetaData {
  site: {
    // eslint-disable-next-line no-undef
    siteMetadata: Queries.SiteSiteMetadata;
  };
}

const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetaData>(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
            lang
            links {
              github
            }
            favicon
            postTitle
          }
        }
      }
    `
  );
  return site.siteMetadata;
};

export type UseSiteMetaDataReturnType = ReturnType<typeof useSiteMetadata>;

export default useSiteMetadata;
