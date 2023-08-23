import React from 'react';

interface TagListProps {
  tags: Queries.HomeQuery['tags']['group'];
  // toggleTag: (tag: string) => void;
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <aside className="aside-scroll tablet:hidden pl-40pxr pr-36pxr desktop:pl-28pxr desktop:pr-24pxr">
      <div className="w-full mb-24pxr">
        <h2 className="font-bold text-24pxr foldable:text-20pxr mb-16pxr">Tags</h2>
        <ul className="flex flex-wrap gap-8pxr">
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <button
                type="button"
                className="font-bold text-18pxr foldable:text-16pxr"
                // onClick={() => toggleTag(tag.fieldValue)}
              >
                {tag.fieldValue} ({tag.totalCount})
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TagList;
