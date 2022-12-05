// import * as React from 'react';

// import { graphql } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// const Bio = ({ data }: Queries.BioByAuthorIdQuery) => {
//   const { author, imageSharp } = data;
//   const avatar = getImage(imageSharp);

//   return (
//     <div>
//       {avatar && <GatsbyImage image={avatar} alt={author.name} />}
//       <p>
//         Written by <strong>{author.name}</strong> {author.summary} {` `}
//         <a href={author.github}>You should follow me on GitHub</a>
//       </p>
//     </div>
//   );
// };

// export const query = graphql`
//   query BioByAuthorId($id: String!) {
//     author(id: { eq: $id }) {
//       name
//       summary
//       github
//     }
//     imageSharp(fields: { id: { eq: $id } }) {
//       gatsbyImageData(height: 50, width: 50)
//     }
//   }
// `;

// export default Bio;
