import { useEffect } from 'react';

import { motion } from 'framer-motion';
import { StaticImage } from 'gatsby-plugin-image';

import { useParentRef } from 'Apps/common/parent-ref-context/utils';
import { Typography } from 'Apps/common/typography';
import { animateVariant, fadeIn } from 'Utils/motion';

interface Tag {
  name: string;
  colorClass: string;
}

interface ProjectCardProps {
  index: number;
  name: string;
  description: string;
  tags: Tag[];
  staticImageEl: ReturnType<typeof StaticImage>;
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

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  staticImageEl,
  projectUrl,
}: ProjectCardProps) => {
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
      initial={animateVariant.hidden}
      animate={animateVariant.show}
      variants={fadeIn({ direction: 'down', type: 'spring', delay: index * 0.2 })}
    >
      <div className="project-card h-full w-full rounded-2xl border-2pxr border-slate-700 bg-bg-secondary p-24pxr tablet:p-16pxr foldable:w-full foldable:p-12pxr">
        <div className="relative h-250pxr w-full">
          <div className="h-full w-full">{staticImageEl}</div>

          {(projectUrl.live || projectUrl.github) && (
            <div
              className={`absolute inset-0pxr m-12pxr flex ${
                projectUrl.live && projectUrl.github ? 'justify-between' : 'justify-end'
              }`}
            >
              {projectUrl.github && (
                <div className="flex h-40pxr w-40pxr items-center justify-center rounded-full bg-bg-inner">
                  <a
                    href={projectUrl.github}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-primary rounded-full"
                  >
                    {githubSvg}
                  </a>
                </div>
              )}
              {projectUrl.live && (
                <div className="flex h-40pxr w-40pxr items-center justify-center rounded-full bg-bg-inner">
                  <a
                    href={projectUrl.live}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-primary rounded-full"
                  >
                    <StaticImage
                      alt="project-thumbnail"
                      src="../../../images/icons/arrow-up-right.svg"
                      width={24}
                      height={24}
                      placeholder="blurred"
                      layout="fixed"
                    />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-20pxr">
          <Typography as="h3" className="text-24pxr font-bold text-text-primary">
            {name}
          </Typography>
          <Typography as="p" className="mt-8pxr text-16pxr text-text-secondary">
            {description}
          </Typography>
        </div>

        <div className="mt-20pxr flex flex-wrap gap-8pxr">
          {tags.map((tag) => (
            <Typography as="p" className={`text-14pxr ${tag.colorClass}`} key={tag.name}>
              #{tag.name}
            </Typography>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
