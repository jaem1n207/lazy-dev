import React from 'react';

import { motion } from 'framer-motion';
import { HeadProps, PageProps, graphql } from 'gatsby';

import Seo from 'Apps/common/seo/seo';
import { Typography } from 'Apps/common/typography';
import PostCard from 'Apps/post/components/post-card';
import { animateVariant, textVariant } from 'Utils/motion';

const TagTemplate = ({
  data,
  pageContext,
}: PageProps<
  Queries.PostsByTagQuery,
  {
    tag: string;
    ids: string[];
  }
>) => {
  return (
    <div className="mx-auto max-w-7xl">
      <motion.h2
        className="font-bold text-center text-48pxr foldable:text-36pxr mb-16pxr mt-24pxr tablet:mt-20pxr"
        initial={animateVariant.hidden}
        animate={animateVariant.show}
        variants={textVariant()}
      >
        {pageContext.tag}
      </motion.h2>
      <div className="max-w-[800px] mx-auto foldable:pt-80pxr pt-100pxr px-32pxr foldable:px-20pxr">
        <Typography prose={false} className="font-bold text-24pxr foldable:text-20pxr mb-16pxr">
          {data.posts.edges.length} posts
        </Typography>
        <section className="grid grid-cols-2 gap-24pxr foldable:grid-cols-1 foldable:gap-20pxr">
          {data.posts?.edges?.map((post) => (
            <PostCard key={post.node.fields?.slug} post={post} />
          ))}
        </section>
      </div>
    </div>
  );
};

export const Head = ({
  location,
  pageContext,
}: HeadProps<
  Queries.PostsByTagQuery,
  {
    tag: string;
    ids: string[];
  }
>) => {
  return <Seo title={pageContext.tag} pathname={location.pathname} />;
};

export const query = graphql`
  query PostsByTag($ids: [String]!) {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(content|blog)/" }, id: { in: $ids } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            summary
            thumbnail {
              childImageSharp {
                gatsbyImageData(height: 300, placeholder: BLURRED)
              }
            }
            date(formatString: "YYYY.MM.DD")
            tags
          }
        }
      }
    }
  }
`;

export default TagTemplate;
