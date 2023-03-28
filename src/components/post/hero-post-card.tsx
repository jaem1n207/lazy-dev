import React, { useMemo } from 'react';

import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImageProps } from 'gatsby-plugin-image';

import { H3, H6 } from 'Components/common';
import { ROUTES } from 'Types/enum';
import Post from 'Types/post';

interface HeroPostCardProps {
  post: Post;
}

const HeroPostCard = ({ post }: HeroPostCardProps) => {
  const data = useStaticQuery<Queries.Query>(graphql`
    query ThumbnailImage {
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
    const image = data.allImageSharp.edges.find((edge) => edge.node.id === post.thumbnail);

    return image?.node.gatsbyImageData as GatsbyImageProps['image'];
  }, [data, post.thumbnail]);

  if (!post.slug) return null;

  return (
    <article className="relative w-full select-none drag-none">
      <Link to={ROUTES.BLOG_POST.toUrl(post.slug)} className="relative block w-full group peer ">
        {/* <GatsbyImage
          image={image}
          alt={post.title ?? 'post thumbnail'}
          loading="lazy"
          className="object-cover object-center w-full transition rounded-lg"
        /> */}
        <div className="mt-32pxr text-20pxr">
          <time dateTime={post.date!}>{post.date}</time> — {post.timeToRead} min read
        </div>
        <H3 as="div" className="mt-16pxr">
          {post.title}
        </H3>
        <H6 variant="secondary" as="div" className="truncate mt-8pxr">
          {post.summary}
        </H6>
      </Link>
    </article>
  );
};

export default HeroPostCard;
