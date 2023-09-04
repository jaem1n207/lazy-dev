import React from 'react';

import { Link } from 'gatsby';

import { ROUTES } from 'Types/enum';

interface TagListProps {
  tags: Queries.HomeQuery['tags']['group'];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <aside className="aside-scroll pl-40pxr pr-36pxr desktop:pl-28pxr desktop:pr-24pxr tablet:hidden">
      <div className="mb-24pxr w-full">
        <h2 className="mb-16pxr text-24pxr font-bold foldable:text-20pxr">Tags</h2>
        <ul className="flex flex-wrap gap-8pxr">
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <Link
                to={ROUTES.TAG.toUrl(tag.fieldValue!)}
                className="text-18pxr font-bold foldable:text-16pxr"
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TagList;
