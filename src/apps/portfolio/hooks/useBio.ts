import { graphql, useStaticQuery } from 'gatsby';

export const useBio = () => {
  const { author, profileImage } = useStaticQuery<Queries.bioQuery>(
    graphql`
      query bio {
        author: author {
          id
          email
          name
          githubName
          github
        }
        profileImage: imageSharp(fields: { authorId: { eq: "jaemin" } }) {
          gatsbyImageData(placeholder: BLURRED, layout: FIXED, width: 200, height: 200)
        }
      }
    `
  );

  return {
    author,
    profileImage,
  };
};
