import React from 'react';

import { graphql, SliceComponentProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import UnderlineLink from 'Apps/common/a/components/underlineLink';

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
      <div className="flex flex-col items-start justify-center gap-y-4pxr">
        <h4 className="text-16pxr">
          Written by <strong className="text-16pxr text-text-primary">{author?.name}</strong>
        </h4>
        <p className="text-15pxr">{author?.summary}</p>
        <UnderlineLink
          external
          url={author?.github || ''}
          className="rounded-sm text-16pxr focus-primary"
        >
          GitHub
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
      gatsbyImageData(width: 80, aspectRatio: 1, placeholder: BLURRED)
    }
  }
`;

export default Bio;
