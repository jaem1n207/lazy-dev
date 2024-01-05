import { motion } from "framer-motion";
import { StaticImage } from "gatsby-plugin-image";

import Anchor from "@/common/components/a/anchor";
import { ChromeIcon } from "@/common/components/icon/chrome-icon";
import { GithubIcon } from "@/common/components/icon/github-icon";
import { Typography } from "@/common/components/typography";
import { animateVariant, fadeIn } from "@/common/utils/motion";

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
      className='project-card relative row-span-4 row-end-auto grid grid-rows-subgrid gap-2 rounded-2xl bg-gray-200 p-6 tablet:p-4 foldable:p-3 dark:bg-bg-secondary'
      initial={animateVariant.hidden}
      animate={animateVariant.show}
      variants={fadeIn({ direction: "down", type: "spring", delay: index * 0.2 })}
    >
      <div
        className={`flex ${
          projectUrl.live && projectUrl.github ? "justify-between" : "justify-end"
        }`}
      >
        {projectUrl.live && (
          <div className='flex items-center justify-center rounded-full'>
            <Anchor href={projectUrl.live} external className='rounded-full'>
              <ChromeIcon className='size-32pxr fill-black stroke-white dark:fill-white dark:stroke-black' />
            </Anchor>
          </div>
        )}
        {projectUrl.github && (
          <div className='flex items-center justify-center rounded-full'>
            <Anchor href={projectUrl.github} external className='rounded-full text-text-primary'>
              <GithubIcon />
            </Anchor>
          </div>
        )}
      </div>
      <Typography as='h3' prose className='text-24pxr font-bold text-text-primary'>
        {name}
      </Typography>
      <Typography as='p' prose className='mt-1 text-16pxr text-text-primary'>
        {description}
      </Typography>
      <div className='mt-1 flex flex-wrap gap-8pxr'>
        {tags.map((tag) => (
          <Typography as='p' prose className={`text-14pxr ${tag.colorClass}`} key={tag.name}>
            #{tag.name}
          </Typography>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
