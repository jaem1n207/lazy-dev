import * as React from 'react';

import { graphql, SliceComponentProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { UnderlineLink } from 'Components/underlineLink';

const Bio = ({ data }: SliceComponentProps<Queries.BioByAuthorIdQuery>) => {
  const { author, imageSharp } = data;

  const avatar = getImage(imageSharp);

  return (
    <div className="flex">
      {avatar && (
        <GatsbyImage
          className="rounded-full mr-12pxr min-w-72pxr"
          image={avatar}
          alt={author?.name || ''}
        />
      )}
      <div className="flex flex-col justify-center gap-y-4pxr">
        <span className="text-14pxr">
          Written by <strong className="text-16pxr text-primary">{author?.name}</strong>
        </span>
        <span className="text-15pxr">{author?.summary}</span>
        <UnderlineLink external url={author?.github || ''} className="text-14pxr">
          You should follow me on GitHub
        </UnderlineLink>
      </div>
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
      gatsbyImageData(height: 80, width: 80)
    }
  }
`;

export default Bio;
