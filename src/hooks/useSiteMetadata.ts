import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetaData {
  site: {
    // eslint-disable-next-line no-undef
    siteMetadata: Queries.SiteSiteMetadata;
  };
}

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetaData>(
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
  return site.siteMetadata;
};

export type UseSiteMetaDataReturnType = ReturnType<typeof useSiteMetadata>;
