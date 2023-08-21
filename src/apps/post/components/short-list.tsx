import React from 'react';

import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { H4 } from 'Components/common';
import { ROUTES } from 'Types/enum';

interface ShortListProps {
  shorts: Queries.HomeQuery['shorts']['edges'];
}

const ShortList = ({ shorts }: ShortListProps) => {
  return (
    <aside className="aside-scroll pl-36pxr pr-40pxr desktop:pl-24pxr desktop:pr-38pxr foldable:w-full foldable:order-2 foldable:mt-48pxr foldable:mb-24px foldable:px-20pxr">
      <div className="w-full mb-24pxr">
        <h2 className="font-bold text-24pxr foldable:text-20pxr mb-16pxr">Shorts</h2>
        <ul className="flex flex-wrap gap-8pxr">
          {shorts.map((short) => (
            <li key={short.node.fields?.slug}>
              <Link to={ROUTES.BLOG_POST.toUrl(short.node.fields?.slug!)}>
                <div className="w-full overflow-hidden h-180pxr mb-16pxr desktop:h-160pxr foldable:h-180pxr">
                  <GatsbyImage
                    image={short.node.frontmatter?.thumbnail?.childImageSharp?.gatsbyImageData!}
                    alt={short.node.frontmatter?.title!}
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <H4 className="mb-8pxr">{short.node.frontmatter?.title}</H4>
                <time
                  dateTime={short.node.frontmatter?.date!}
                  className="text-18pxr foldable:text-16pxr"
                >
                  {short.node.frontmatter?.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ShortList;
