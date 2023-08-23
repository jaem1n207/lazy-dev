import React from 'react';

import { motion } from 'framer-motion';

import { animateVariant, slideIn, zoomIn } from 'Utils/motion';

interface TagListProps {
  tags: Queries.HomeQuery['tags']['group'];
  // toggleTag: (tag: string) => void;
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <aside className="aside-scroll tablet:hidden pl-40pxr pr-36pxr desktop:pl-28pxr desktop:pr-24pxr">
      <div className="w-full mb-24pxr">
        <motion.div
          variants={slideIn({ direction: 'left' })}
          initial={animateVariant.hidden}
          animate={animateVariant.show}
        >
          <h2 className="font-bold text-24pxr foldable:text-20pxr mb-16pxr">Tags</h2>
        </motion.div>
        <ul className="flex flex-wrap gap-8pxr">
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <motion.div
                variants={zoomIn({ duration: 0.5 })}
                initial={animateVariant.hidden}
                animate={animateVariant.show}
              >
                <button
                  type="button"
                  className="font-bold text-18pxr foldable:text-16pxr"
                  // onClick={() => toggleTag(tag.fieldValue)}
                >
                  {tag.fieldValue} ({tag.totalCount})
                </button>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TagList;
