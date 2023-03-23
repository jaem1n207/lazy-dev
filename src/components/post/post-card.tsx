import React, { useMemo } from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image';

import { H3, H6 } from 'Components/common';
import { ROUTES } from 'Types/enum';
import Post from 'Types/post';

interface PostCardProps {
  post: Post;
}

const PostCard = ({
  post: { slug, title, summary, date, category, thumbnail, timeToRead },
}: PostCardProps) => {
  const data = useStaticQuery<Queries.Query>(graphql`
    query ThumbnailImage {
      allImageSharp {
        edges {
          node {
            id
            gatsbyImageData(width: 900, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  `);

  const image = useMemo(() => {
    const image = data.allImageSharp.edges.find((edge) => edge.node.id === thumbnail);

    return image?.node.gatsbyImageData as GatsbyImageProps['image'];
  }, [data, thumbnail]);

  if (!slug) return null;

  return (
    <article className="relative w-full">
      <Link
        to={ROUTES.BLOG_POST.toUrl(slug)}
        className="relative block w-full select-none group peer focus:outline-none drag-none"
      >
        <div className="rounded-lg aspect-h-2 aspect-w-3">
          <GatsbyImage
            image={image}
            alt={title ?? 'post thumbnail'}
            loading="lazy"
            className="object-cover object-center w-full transition rounded-lg"
          />
        </div>
        <div className="mt-32pxr text-20pxr">
          <time dateTime={date!}>{date}</time> — {timeToRead} min read
        </div>
        <H3 as="div" className="mt-16pxr">
          {title}
        </H3>
        <H6 variant="secondary" as="div" className="truncate mt-8pxr">
          {summary}
        </H6>
      </Link>
    </article>
  );
};

export default PostCard;
