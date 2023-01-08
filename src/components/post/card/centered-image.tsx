import React, { useMemo } from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image';
import tw from 'twin.macro';

import Post from 'Types/post';

interface CenteredImageProps extends Pick<Post, 'thumbnail'> {}

const CenteredImage = ({ thumbnail }: CenteredImageProps) => {
  const data = useStaticQuery<Queries.Query>(graphql`
    query CenteredImage {
      allImageSharp {
        edges {
          node {
            id
            gatsbyImageData(formats: WEBP, aspectRatio: 1.78, width: 632, layout: CONSTRAINED)
          }
        }
      }
    }
  `);

  const image = useMemo(() => {
    const image = data.allImageSharp.edges.find((edge) => edge.node.id === thumbnail);

    return image?.node.gatsbyImageData as GatsbyImageProps['image'];
  }, [data.allImageSharp.edges, thumbnail]);

  return (
    <span
      css={tw`box-border absolute block overflow-hidden border-none pointer-events-none opacity-10 bg-none p-0pxr m-0pxr inset-0pxr`}
    >
      <GatsbyImage
        image={image}
        loading="eager"
        alt="thumbnail"
        css={tw`box-border absolute block object-cover max-w-full max-h-full min-w-full min-h-full m-auto select-none brightness-150 blur-sm inset-0pxr p-0pxr w-0pxr h-0pxr`}
      />
    </span>
  );
};

export default CenteredImage;
