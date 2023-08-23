import React from 'react';

import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { Tilt } from 'react-tilt';

import UnderlineLink from 'Apps/common/a/components/underlineLink';
import { Typography } from 'Apps/common/typography';

import { useBio } from '../hooks/useBio';

const AboutCard = () => {
  const bio = useBio();

  return (
    <Tilt
      options={{
        max: 15,
        scale: 1,
        speed: 450,
      }}
      className="flex flex-col content-between h-full transition-colors aspect-video rounded-2xl about-card-bg-gradient p-32pxr border-slate-700 border-2pxr foldable:p-16pxr"
    >
      <div className="flex items-center gap-8pxr">
        <GatsbyImage
          className="object-cover rounded-full !w-40pxr !h-40pxr foldable:!w-28pxr foldable:!h-28pxr"
          image={bio.profileImage?.gatsbyImageData!}
          alt="profile"
        />

        <div className="flex-1 overflow-hidden">
          <Typography as="p" className="font-bold leading-6 truncate text-20pxr tablet:text-16pxr">
            {bio.author?.name}
          </Typography>
          <Typography
            as="p"
            prose={false}
            textColorClassName="text-primary"
            className="font-bold truncate text-14pxr tablet:text-12pxr before:content-['@']"
          >
            {bio.author?.githubName}
          </Typography>
        </div>

        <StaticImage
          alt="javascript"
          src="../../../images/skills/javascript.svg"
          width={32}
          height={32}
          placeholder="blurred"
          layout="fixed"
        />
        <StaticImage
          alt="react"
          src="../../../images/skills/react.svg"
          width={32}
          height={32}
          placeholder="blurred"
          layout="fixed"
        />
        <StaticImage
          alt="vite"
          src="../../../images/skills/vite.svg"
          width={32}
          height={32}
          placeholder="blurred"
          layout="fixed"
        />
      </div>

      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center justify-center w-4/5 mx-auto font-extrabold tracking-tight text-transparent -mt-24pxr gap-8pxr from-violet via-pink-600 to-primary bg-gradient-to-r bg-clip-text">
          <p className="text-40pxr tablet:text-[4vw]">Front-end</p>
          <p className="text-48pxr tablet:text-[6vw]">web Developer</p>
        </div>
      </div>

      <div className="flex justify-center font-bold gap-20pxr text-12pxr text-slate-400">
        <div className="flex items-center font-bold gap-8pxr">
          <StaticImage
            alt="email"
            src="../../../images/icons/gmail.svg"
            width={24}
            height={24}
            placeholder="blurred"
            layout="fixed"
          />
          <Typography className="select-all">{bio.author?.email}</Typography>
        </div>
        <div className="opacity-50 border-r-1pxr border-slate-500" />
        <UnderlineLink
          external
          url={bio.author?.github!}
          className="flex items-center justify-center font-bold gap-8pxr rounded-sm !text-text-primary !shadow-none"
        >
          <StaticImage
            alt="github"
            src="../../../images/icons/github-dark.svg"
            width={24}
            height={24}
            placeholder="blurred"
            layout="fixed"
          />
          <Typography className="leading-6">GitHub</Typography>
        </UnderlineLink>
      </div>
    </Tilt>
  );
};

export default AboutCard;
