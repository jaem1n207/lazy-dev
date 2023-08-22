import React from 'react';

import { StaticImage } from 'gatsby-plugin-image';

import ParentRefContainer from 'Apps/common/parent-ref-context/components/parent-ref-container';
import AboutCard from 'Apps/portfolio/components/about-card';
import ProjectCard from 'Apps/portfolio/components/project-card';

const fakeProjectCards: Omit<React.ComponentProps<typeof ProjectCard>, 'index'>[] = [
  {
    name: 'Synchronize Tab Scrolling',
    description: '여러 탭의 스크롤 위치를 동기화할 수 있는 크롬 확장 프로그램',
    tags: [
      {
        name: 'React',
        colorClass: '!text-blue-400',
      },
      {
        name: 'TypeScript',
        colorClass: '!text-green-400',
      },
    ],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src="../images/skills/react.svg"
        width={500}
        height={250}
        placeholder="blurred"
        layout="fixed"
      />
    ),
    projectUrl: {
      github: 'https://github.com/jaem1n207/synchronize-tab-scrolling/tree/main',
      live: 'https://chrome.google.com/webstore/detail/synchronize-tab-scrolling/phceoocamipnafpgnchbfhkdlbleeafc/',
    },
  },
  {
    name: 'Tech Blog',
    description: '프론트엔드 웹 개발자를 위한 기술 블로그',
    tags: [
      {
        name: 'React',
        colorClass: '!text-blue-400',
      },
      {
        name: 'TypeScript',
        colorClass: '!text-green-400',
      },
    ],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src="../images/skills/react.svg"
        width={500}
        height={250}
        placeholder="blurred"
        layout="fixed"
      />
    ),
    projectUrl: {
      github: 'https://github.com/jaem1n207/lazy-dev/tree/main',
      live: 'https://lazydev.gatsbyjs.io/',
    },
  },
  {
    name: 'Quick Weather View',
    description:
      '브라우저의 기본 페이지를 날씨 정보를 보여주는 페이지로 변경해주는 크롬 확장 프로그램',
    tags: [
      {
        name: 'React',
        colorClass: '!text-blue-400',
      },
      {
        name: 'TypeScript',
        colorClass: '!text-green-400',
      },
    ],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src="../images/skills/react.svg"
        width={500}
        height={250}
        placeholder="blurred"
        layout="fixed"
      />
    ),
    projectUrl: {
      github: 'https://github.com/jaem1n207/quick-weather-view/tree/main',
    },
  },
  {
    name: 'JM Wordle',
    description: 'Josh Wardle의 인기 게임인 Wordle에 약간의 기능을 추가한 웹 사이트',
    tags: [
      {
        name: 'React',
        colorClass: '!text-blue-400',
      },
      {
        name: 'TypeScript',
        colorClass: '!text-green-400',
      },
    ],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src="../images/skills/react.svg"
        width={500}
        height={250}
        placeholder="blurred"
        layout="fixed"
      />
    ),
    projectUrl: {
      github: 'https://github.com/jaem1n207/jm-wordle/tree/master',
      live: 'https://jmwordlemain.gatsbyjs.io/',
    },
  },
];

const portfolio = () => {
  return (
    <div className="select-none max-w-[1200px] mx-auto px-36pxr desktop:px-24pxr foldable:px-20pxr foldable:pt-36pxr">
      <h3 className="font-bold text-36pxr foldable:text-32pxr mb-24pxr">About</h3>
      <div className="max-w-[700px] w-full mx-auto pt-16pxr">
        <AboutCard />
      </div>
      <h3 className="font-bold text-36pxr foldable:text-32pxr my-24pxr">Projects</h3>
      <ParentRefContainer className="grid grid-cols-2 gap-24pxr foldable:grid-cols-1">
        {fakeProjectCards.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </ParentRefContainer>
    </div>
  );
};

export default portfolio;
