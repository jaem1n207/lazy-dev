import { motion } from 'framer-motion';
import { StaticImage } from 'gatsby-plugin-image';

import Anchor from '@/common/components/a/anchor';
import { ChromeIcon } from '@/common/components/icon/chrome-icon';
import { GithubIcon } from '@/common/components/icon/github-icon';
import { Typography } from '@/common/components/typography';
import { animateVariant, fadeIn } from '@/common/utils/motion';

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

const ProjectCard = ({ index, name, description, tags, projectUrl }: ProjectCardProps) => {
  return (
    <motion.div
      className="relative"
      initial={animateVariant.hidden}
      animate={animateVariant.show}
      variants={fadeIn({ direction: 'down', type: 'spring', delay: index * 0.2 })}
    >
      <div className="project-card h-full w-full rounded-2xl border-2pxr border-slate-700 bg-bg-secondary p-24pxr tablet:p-16pxr foldable:w-full foldable:p-12pxr">
        <div className="relative h-auto w-full">
          {/* <div className="relative h-250pxr w-full"> */}
          {/* <div className="h-full w-full">{staticImageEl}</div> */}

          {(projectUrl.live || projectUrl.github) && (
            <div
              className={`flex ${
                projectUrl.live && projectUrl.github ? 'justify-between' : 'justify-end'
              }`}
            >
              {projectUrl.github && (
                <div className="flex items-center justify-center rounded-full">
                  <Anchor
                    href={projectUrl.github}
                    external
                    className="rounded-full text-text-primary"
                  >
                    <GithubIcon />
                  </Anchor>
                </div>
              )}
              {projectUrl.live && (
                <div className="flex items-center justify-center rounded-full">
                  <Anchor href={projectUrl.live} external className="rounded-full">
                    <ChromeIcon className="h-32pxr w-32pxr fill-black stroke-white dark:fill-white dark:stroke-black" />
                  </Anchor>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-8pxr">
          <Typography as="h3" prose className="text-24pxr font-bold text-text-primary">
            {name}
          </Typography>
          <Typography as="p" prose className="mt-8pxr text-16pxr text-text-primary">
            {description}
          </Typography>
        </div>

        <div className="mt-20pxr flex flex-wrap gap-8pxr">
          {tags.map((tag) => (
            <Typography as="p" prose className={`text-14pxr ${tag.colorClass}`} key={tag.name}>
              #{tag.name}
            </Typography>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
