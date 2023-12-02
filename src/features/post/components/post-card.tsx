import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { ROUTES } from '@/common/const';

interface PostCardProps {
  post: Queries.HomeQuery['posts']['edges'][0];
}

const PostCard = ({ post }: PostCardProps) => {
  const { slug } = post.node.fields!;
  const { thumbnail, tags, title, summary, date } = post.node.frontmatter!;
  const timeToRead = post.node.timeToRead!;

  return (
    <Link to={ROUTES.BLOG_POST.toUrl(slug!)} className="focus-primary rounded-lg">
      <motion.div className="flex flex-col gap-8pxr" whileHover={{ transform: 'translateY(-4px)' }}>
        <div className="h-250pxr w-full overflow-hidden desktop:h-200pxr tablet:h-180pxr foldable:h-200pxr">
          <GatsbyImage
            image={thumbnail?.childImageSharp?.gatsbyImageData!}
            alt={title!}
            className="h-full w-full rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-8pxr p-8pxr">
          <div className="-mb-4pxr flex flex-wrap gap-8pxr">
            {tags?.map((tag) => (
              <span key={tag} className="font-semibold text-primary foldable:text-14pxr">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-24pxr font-bold leading-8 tablet:text-20pxr tablet:leading-7 foldable:text-18pxr foldable:leading-6">
            {title}
          </h3>
          <p className="line-clamp-1 foldable:text-14pxr">{summary}</p>
          <div className="flex flex-wrap items-center gap-4pxr text-all-custom-gray foldable:text-14pxr">
            <time dateTime={date!}>{date}</time>
            <span>•</span>
            <span>{timeToRead} min read</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PostCard;
