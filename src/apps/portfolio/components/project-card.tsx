import React, { useEffect } from 'react';

import { motion } from 'framer-motion';

import { useParentRef } from 'Apps/common/parent-ref-context/utils';
import { fadeIn } from 'Utils/motion';

interface Tag {
  name: string;
  colorClass: string;
}

interface ProjectCardProps {
  index: number;
  name: string;
  description: string;
  tags: Tag[];
  image: string;
  projectUrl: {
    github?: string;
    live?: string;
  };
}

const githubSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-github"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ index, name, description, tags, image, projectUrl }, ref) => {
    const parentRef = useParentRef();

    useEffect(() => {
      const parentEl = parentRef?.current;

      if (!parentEl) return;

      const updateCursor = ({ x, y }: { x: number; y: number }) => {
        parentEl.style.setProperty('--x', x + '');
        parentEl.style.setProperty('--y', y + '');
      };

      parentEl.addEventListener('pointermove', updateCursor);

      return () => {
        parentEl.removeEventListener('pointermove', updateCursor);
      };
    }, [parentRef]);

    return (
      <motion.div
        className="relative"
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={fadeIn({ direction: 'up', type: 'spring', delay: index * 0.3, duration: 0.75 })}
      >
        <div className="w-full bg-zinc-800 p-24pxr rounded-2xl foldable:w-full project-card">
          <div className="relative w-full h-320pxr">
            {/* <img className="object-cover w-full h-full rounded-2xl" src={image} alt="project" /> */}

            <div className="absolute flex justify-end inset-0pxr m-12pxr">
              <div className="flex items-center justify-center rounded-full w-40pxr h-40pxr bg-slate-700">
                <a href={projectUrl.github} target="_blank" rel="noreferrer">
                  {githubSvg}
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
