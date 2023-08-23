import React, { useMemo } from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image';

import { H3, H5, H6 } from 'Apps/common/typography';
import NoneActiveWrapper from 'Apps/common/wrapper/none-active-wrapper';
import { ELEMENT_CLASS, ROUTES } from 'Types/enum';
import Post from 'src/legacy/post/post';

interface PostCardProps {
  post: Post;
}

const PostCard = ({
  post: { slug, title, summary, date, thumbnail, timeToRead },
}: PostCardProps) => {
  const data = useStaticQuery<Queries.PostThumbnailImageQuery>(graphql`
    query PostThumbnailImage {
      allImageSharp {
        edges {
          node {
            id
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              aspectRatio: 1
              sizes: "(max-width:639px) 80vw','(min-width:640px) and (max-width:1023px) 40vw','(min-width:1024px) and (max-width:1620px) 25vw','420px'"
              breakpoints: [280, 560, 840, 1100, 1300, 1650]
            )
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
    <article className="relative w-full select-none drag-none">
      <Link
        to={ROUTES.BLOG_POST.toUrl(slug)}
        className={`relative block w-full group peer focus:outline-none ${ELEMENT_CLASS.MOVING_ELEMENT}`}
      >
        <NoneActiveWrapper>
          <GatsbyImage
            image={image}
            alt={title ?? 'post thumbnail'}
            loading="lazy"
            className="object-cover object-center w-full transition rounded-lg focus-primary"
          />
        </NoneActiveWrapper>
        <H5 as="div" className="mt-32pxr" variant="secondary">
          <time dateTime={date!}>{date}</time> — {timeToRead} min read
        </H5>
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
