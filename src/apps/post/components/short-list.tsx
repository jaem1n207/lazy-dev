import React from 'react';

import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { H4 } from 'Apps/common/typography';
import { ROUTES } from 'Types/enum';
import { animateVariant, fadeIn, slideIn } from 'Utils/motion';

interface ShortListProps {
  shorts: Queries.HomeQuery['shorts']['edges'];
}

const ShortList = ({ shorts }: ShortListProps) => {
  return (
    <aside className="aside-scroll pl-36pxr pr-40pxr desktop:pl-24pxr desktop:pr-38pxr foldable:w-full foldable:order-2 foldable:mt-48pxr foldable:mb-24px foldable:px-20pxr">
      <div className="w-full mb-24pxr">
        <motion.div
          variants={slideIn({ direction: 'left' })}
          initial={animateVariant.hidden}
          animate={animateVariant.show}
        >
          <h2 className="font-bold text-24pxr foldable:text-20pxr mb-16pxr">Shorts</h2>
        </motion.div>
        <motion.ul
          variants={fadeIn({ direction: 'right' })}
          initial={animateVariant.hidden}
          animate={animateVariant.show}
          className="flex flex-wrap gap-8pxr"
        >
          {shorts.map((short) => (
            <li key={short.node.fields?.slug} className="rounded-lg focus-primary">
              <Link to={ROUTES.BLOG_POST.toUrl(short.node.fields?.slug!)}>
                <div className="w-full overflow-hidden h-180pxr mb-16pxr desktop:h-160pxr foldable:h-180pxr">
                  <GatsbyImage
                    image={short.node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
                    alt={short.node.frontmatter?.title!}
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <H4 as="h3" className="mb-8pxr">
                  {short.node.frontmatter?.title}
                </H4>
                <time
                  dateTime={short.node.frontmatter?.date!}
                  className="text-18pxr foldable:text-16pxr"
                >
                  {short.node.frontmatter?.date}
                </time>
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </aside>
  );
};

export default ShortList;
