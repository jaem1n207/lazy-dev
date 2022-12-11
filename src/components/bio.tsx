import * as React from 'react';

import { graphql, SliceComponentProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { UnderlineLink } from 'Components/underlineLink';

const Bio = ({ data }: SliceComponentProps<Queries.BioByAuthorIdQuery>) => {
  const { author, imageSharp } = data;

  const avatar = getImage(imageSharp);

  return (
    <div>
      {avatar && <GatsbyImage image={avatar} alt={author?.name || ''} />}
      <p>
        Written by <strong>{author?.name}</strong> {author?.summary}
        <UnderlineLink external url={author?.github || ''}>
          You should follow me on GitHub
        </UnderlineLink>
      </p>
    </div>
  );
};

export const query = graphql`
  query BioByAuthorId($slug: String!) {
    author(authorId: { eq: $slug }) {
      name
      summary
      github
    }
    imageSharp(fields: { authorId: { eq: $slug } }) {
      gatsbyImageData(height: 50, width: 50)
    }
  }
`;

export default Bio;
