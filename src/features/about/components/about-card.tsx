import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { Tilt } from 'react-tilt';

import Anchor from '@/common/components/a/anchor';
import { GithubIcon } from '@/common/components/icon/github-icon';
import { GmailIcon } from '@/common/components/icon/gmail-icon';
import { Typography } from '@/common/components/typography';

import { useBio } from '../hooks/use-bio';

const AboutCard = () => {
  const bio = useBio();

  return (
    <Tilt
      options={{
        max: 30,
        scale: 1,
        speed: 450,
      }}
      className="about-card-bg-gradient flex aspect-video h-full flex-col content-between rounded-2xl border-2pxr border-slate-700 p-32pxr transition-colors foldable:w-full foldable:p-16pxr"
    >
      <div className="flex items-center gap-8pxr">
        <GatsbyImage
          className="!h-40pxr !w-40pxr rounded-full object-cover foldable:!h-28pxr foldable:!w-28pxr"
          image={bio.profileImage?.gatsbyImageData!}
          alt="profile"
        />

        <div className="flex-1 overflow-hidden">
          <Typography as="p" className="truncate text-20pxr font-bold leading-6 tablet:text-16pxr">
            {bio.author?.name}
          </Typography>
          <Typography
            as="p"
            prose={false}
            className="truncate text-14pxr font-bold text-primary before:content-['@'] tablet:text-12pxr"
          >
            {bio.author?.githubName}
          </Typography>
        </div>

        <StaticImage
          alt="javascript"
          src="../../../assets/skills/javascript.svg"
          width={32}
          height={32}
          placeholder="blurred"
          layout="fixed"
        />
        <StaticImage
          alt="react"
          src="../../../assets/skills/react.svg"
          width={32}
          height={32}
          placeholder="blurred"
          layout="fixed"
        />
        <StaticImage
          alt="vite"
          src="../../../assets/skills/vite.svg"
          width={32}
          height={32}
          placeholder="blurred"
          layout="fixed"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="gradient-text mx-auto -mt-24pxr flex w-full items-center justify-center gap-8pxr font-extrabold tracking-tight text-transparent">
          <p className="text-40pxr tablet:text-[4vw]">Front-end</p>
          <p className="text-48pxr tablet:text-[6vw]">web Developer</p>
        </div>
      </div>

      <div className="flex justify-center gap-20pxr text-12pxr font-bold text-slate-400">
        <div className="flex items-center gap-8pxr font-bold">
          <GmailIcon />
          <Typography className="select-all">{bio.author?.email}</Typography>
        </div>
        <div className="border-r-1pxr border-slate-500 opacity-50" />
        <Anchor
          external
          href={bio.author?.github!}
          className="flex items-center justify-center gap-8pxr rounded-sm font-bold !text-text-primary !shadow-none"
        >
          <GithubIcon />
          <Typography className="leading-6 mobile:hidden">GitHub</Typography>
        </Anchor>
      </div>
    </Tilt>
  );
};

export default AboutCard;
