import React, { useMemo } from 'react';

import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image';

import { ContentSpacer, Grid, H2, H4, H5 } from 'Components/common';
import NoneActiveWrapper from 'Components/common/none-active-wrapper';
import { ELEMENT_CLASS, ROUTES } from 'Types/enum';
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
    <div className="w-full px-0pxr desktop:px-32pxr">
      <div className="bg-transparent rounded-lg">
        <div className="mx-0pxr tablet:-mx-32pxr">
          <ContentSpacer>
            <Grid
              as="article"
              className={`bg-bg-secondary rounded-lg pt-56pxr pb-48pxr desktop:pt-36pxr desktop:pb-24pxr group foldable:px-16pxr hero-section ${ELEMENT_CLASS.MOVING_ELEMENT}`}
            >
              <div className="flex flex-col justify-between col-span-5 col-start-2 desktop:col-span-full">
                <NoneActiveWrapper>
                  <Link
                    aria-label={`Read more about ${post.title}`}
                    to={ROUTES.BLOG_POST.toUrl(post.slug)}
                    className="absolute z-10 rounded-lg focus-primary inset-0pxr left-0pxr right-0pxr mobile:left-0pxr mobile:right-0pxr foldable:-left-16pxr foldable:-right-16pxr tablet:-left-48pxr tablet:-right-48pxr desktop:-left-96pxr desktop:-right-96pxr"
                  />
                </NoneActiveWrapper>

                <div>
                  <H5 as="h2">추천 글</H5>
                  <H2 as="h3" className="mt-40pxr tablet:mt-32pxr text-text-primary">
                    {post.title}
                  </H2>
                  <H4 as="div" variant="secondary" className="mt-24pxr">
                    <time dateTime={post.date!}>{post.date}</time> — {post.timeToRead} min read
                  </H4>
                </div>

                <div className="mt-24pxr desktop:mt-32pxr">
                  <div className="relative w-24pxr h-24pxr desktop:w-32pxr desktop:h-32pxr">
                    <div className="absolute w-full h-full transition-all duration-300 ease-in-out border-2 rounded-full border-primary group-hover:border-transparent group-hover:animate-arrow">
                      <svg
                        className="absolute w-full h-full text-text-primary group-hover:text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 5L19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative col-span-4 col-start-8 mt-40pxr tablet:mt-32pxr desktop:col-span-full">
                <GatsbyImage
                  image={image}
                  alt={post.title ?? 'post thumbnail'}
                  loading="lazy"
                  className="object-cover object-center w-full transition rounded-lg"
                />
              </div>
            </Grid>
          </ContentSpacer>
        </div>
      </div>
    </div>
  );
};

export default HeroPostCard;
