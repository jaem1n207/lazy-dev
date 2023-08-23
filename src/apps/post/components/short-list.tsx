import React from 'react';

import ShortCard from './short-card';

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
            <ShortCard key={short.node.fields?.slug} short={short} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ShortList;
