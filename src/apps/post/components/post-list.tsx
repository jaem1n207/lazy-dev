import React from 'react';

import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { ROUTES } from 'Types/enum';
import { animateVariant, fadeIn, textVariant } from 'Utils/motion';

interface PostListProps {
  posts: Queries.HomeQuery['posts']['edges'];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <section className="w-full px-36pxr desktop:px-24pxr foldable:order-1 foldable: foldable:px-20pxr foldable:pt-36pxr">
      <motion.div
        variants={textVariant()}
        initial={animateVariant.hidden}
        animate={animateVariant.show}
      >
        <h2 className="font-bold text-24pxr foldable:text-20pxr mb-16pxr">Posts</h2>
      </motion.div>
      <motion.div
        variants={fadeIn({ direction: 'right' })}
        initial={animateVariant.hidden}
        animate={animateVariant.show}
        className="grid grid-cols-2 gap-24pxr foldable:grid-cols-1"
      >
        {posts?.map((post) => (
          <article key={post.node.fields?.slug} className="rounded-lg focus-primary mb-24pxr">
            <Link to={ROUTES.BLOG_POST.toUrl(post.node.fields?.slug!)}>
              <div className="w-full overflow-hidden h-300pxr mb-16pxr desktop:h-200pxr tablet:h-180pxr foldable:h-200pxr">
                <GatsbyImage
                  image={post.node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
                  alt={post.node.frontmatter?.title!}
                  className="w-full h-full rounded-lg"
                />
              </div>
              <h3 className="font-bold text-24pxr foldable:text-20pxr mb-8pxr">
                {post.node.frontmatter?.title}
              </h3>
              <time
                dateTime={post.node.frontmatter?.date!}
                className="text-18pxr foldable:text-16pxr"
              >
                {post.node.frontmatter?.date}
              </time>
            </Link>
          </article>
        ))}
      </motion.div>
    </section>
  );
};

export default PostList;
