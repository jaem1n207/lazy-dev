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
    <Link
      to={ROUTES.BLOG_POST.toUrl(slug!)}
      className="focus-primary row-span-5 row-end-auto grid grid-rows-article gap-2 rounded-lg p-1 transition-transform hover:-translate-y-1 focus:-translate-y-1"
    >
      <GatsbyImage
        image={thumbnail?.childImageSharp?.gatsbyImageData!}
        alt=""
        className="aspect-video h-full w-full rounded-lg"
      />
      <div className="flex flex-wrap gap-8pxr">
        {tags?.map((tag) => (
          <span key={tag} className="font-semibold text-all-custom-gray tablet:text-14pxr">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-24pxr font-extrabold leading-8 tablet:text-20pxr tablet:leading-7 foldable:text-18pxr foldable:leading-6">
        {title}
      </h3>
      <p className="mt-2 line-clamp-3 text-text-primary foldable:text-14pxr">{summary}</p>
      <div className="flex flex-wrap items-center gap-4pxr text-all-custom-gray foldable:text-14pxr">
        <time dateTime={date!}>{date}</time>
        <span>•</span>
        <span>{timeToRead} min read</span>
      </div>
    </Link>
  );
};

export default PostCard;
