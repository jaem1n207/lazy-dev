import React, { useMemo } from 'react';

import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image';

import NoneActiveWrapper from 'Apps/common/wrapper/none-active-wrapper';
import { ELEMENT_CLASS, ROUTES } from 'Types/enum';
import Post from 'src/legacy/post/post';

interface HeroPostCardProps {
  post: Post;
}

const HeroPostCard = ({ post }: HeroPostCardProps) => {
  const data = useStaticQuery<Queries.HeroThumbnailImageQuery>(graphql`
    query HeroThumbnailImage {
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
      <div className="rounded-lg bg-transparent">
        <div className="mx-0pxr tablet:-mx-32pxr">
          <ContentSpacer>
            <Grid
              as="article"
              className={`hero-section group rounded-lg bg-bg-secondary pt-56pxr pb-48pxr desktop:pt-36pxr desktop:pb-24pxr foldable:px-16pxr ${ELEMENT_CLASS.MOVING_ELEMENT}`}
            >
              <div className="col-span-5 col-start-2 flex flex-col justify-between desktop:col-span-full">
                <NoneActiveWrapper>
                  <Link
                    aria-label={`Read more about ${post.title}`}
                    to={ROUTES.BLOG_POST.toUrl(post.slug)}
                    className="focus-primary absolute inset-0pxr left-0pxr right-0pxr z-10 rounded-lg desktop:-left-96pxr desktop:-right-96pxr tablet:-left-48pxr tablet:-right-48pxr foldable:-left-16pxr foldable:-right-16pxr mobile:left-0pxr mobile:right-0pxr"
                  />
                </NoneActiveWrapper>

                <div>
                  <H5 as="h2">추천 글</H5>
                  <H2 as="h3" className="mt-40pxr text-text-primary tablet:mt-32pxr">
                    {post.title}
                  </H2>
                  <H4 as="div" variant="secondary" className="mt-24pxr">
                    <time dateTime={post.date!}>{post.date}</time> — {post.timeToRead} min read
                  </H4>
                </div>

                <div className="mt-24pxr desktop:mt-32pxr">
                  <div className="relative h-24pxr w-24pxr desktop:h-32pxr desktop:w-32pxr">
                    <div className="border-2 group-hover:animate-arrow absolute h-full w-full rounded-full border-primary transition-all duration-300 ease-in-out group-hover:border-transparent">
                      <svg
                        className="absolute h-full w-full text-text-primary group-hover:text-primary"
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

              <div className="relative col-span-4 col-start-8 mt-40pxr desktop:col-span-full tablet:mt-32pxr">
                <GatsbyImage
                  image={image}
                  alt={post.title ?? 'post thumbnail'}
                  loading="lazy"
                  className="w-full rounded-lg object-cover object-center transition"
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
