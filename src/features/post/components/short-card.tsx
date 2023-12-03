import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { ROUTES } from '@/common/const';

interface ShortCardProps {
  short: Queries.HomeQuery['shorts']['edges'][0];
}

const ShortCard = ({ short }: ShortCardProps) => {
  const { slug } = short.node.fields!;
  const { thumbnail, title } = short.node.frontmatter!;

  return (
    <li key={short.node.fields?.slug} className="focus-primary rounded-lg">
      <Link to={ROUTES.BLOG_POST.toUrl(slug!)}>
        <motion.div
          className="flex flex-col gap-8pxr"
          whileHover={{ transform: 'translateY(-4px)' }}
        >
          <div className="h-180pxr w-full overflow-hidden desktop:h-160pxr foldable:h-180pxr">
            <GatsbyImage
              image={thumbnail?.childImageSharp?.gatsbyImageData!}
              alt={title!}
              className="h-full w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-8pxr p-8pxr">
            <h3 className="line-clamp-2 text-20pxr font-bold leading-7 tablet:text-18pxr tablet:leading-6 foldable:text-16pxr foldable:leading-5">
              {title}
            </h3>
          </div>
        </motion.div>
      </Link>
    </li>
  );
};

export default ShortCard;
