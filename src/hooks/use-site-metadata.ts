import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<Queries.SiteMetaDataQuery>(
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

  if (!site?.siteMetadata) {
    console.error('site.siteMetadata is undefined');

    return undefined;
  }

  return site.siteMetadata;
};

export type UseSiteMetaDataReturnType = ReturnType<typeof useSiteMetadata>;
