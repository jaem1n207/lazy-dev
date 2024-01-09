import { motion } from "framer-motion";
import { graphql, HeadProps, PageProps } from "gatsby";

import Seo from "@/common/components/seo/seo";
import { Typography } from "@/common/components/typography";
import { animateVariant, textVariant } from "@/common/utils/motion";
import PostCard from "@/features/post/components/post-card";

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
        className="mb-16pxr mt-24pxr text-center text-48pxr font-bold tablet:mt-20pxr foldable:text-36pxr"
        initial={animateVariant.hidden}
        animate={animateVariant.show}
        variants={textVariant()}
      >
        {pageContext.tag}
      </motion.h2>
      <div className="mx-auto max-w-[800px] px-32pxr pt-100pxr foldable:px-20pxr foldable:pt-80pxr">
        <Typography prose={false} className="mb-16pxr text-24pxr font-bold foldable:text-20pxr">
          {data.posts.edges.length} posts
        </Typography>
        <section className="grid grid-cols-2 gap-24pxr foldable:grid-cols-1 foldable:gap-20pxr">
          {data.posts?.edges?.map((post) => <PostCard key={post.node.fields?.slug} post={post} />)}
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
  return (
    <Seo
      title={`${pageContext.tag} posts`}
      openGraph={{
        type: "website",
        url: location.pathname,
      }}
    />
  );
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
