import { useRef, type ComponentProps, useEffect } from 'react';

import { StaticImage } from 'gatsby-plugin-image';

import ProjectCard from './project-card';

const ProjectCardList = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const updateCursor = ({ x, y }: { x: number; y: number }) => {
      gridEl.style.setProperty('--x', x + '');
      gridEl.style.setProperty('--y', y + '');
    };

    gridEl.addEventListener('pointermove', updateCursor);

    return () => {
      gridEl.removeEventListener('pointermove', updateCursor);
    };
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-3 gap-24pxr foldable:grid-cols-1">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} index={index} {...project} />
      ))}
    </div>
  );
};

const IMAGE_FOLDER_PATH = '../../../../content/blog/thumbnails';

const projects: Omit<ComponentProps<typeof ProjectCard>, 'index'>[] = [
  {
    name: 'Synchronize Tab Scrolling',
    description: '여러 탭의 스크롤 위치를 동기화할 수 있는 크롬 확장 프로그램',
    tags: [
      {
        name: 'React',
        colorClass: '!text-green-400',
      },
      {
        name: 'TypeScript',
        colorClass: '!text-blue-400',
      },
    ],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src={`${IMAGE_FOLDER_PATH}/react-profile.jpg`}
        className="h-250pxr w-full"
        placeholder="blurred"
      />
    ),
    projectUrl: {
      github: 'https://github.com/jaem1n207/synchronize-tab-scrolling/tree/main',
      live: 'https://chrome.google.com/webstore/detail/synchronize-tab-scrolling/phceoocamipnafpgnchbfhkdlbleeafc/',
    },
  },
  {
    name: 'Party Cinema',
    description:
      '온라인에서 친구들과 함께 동영상을 시청하고, 채팅하고 즐겁게 놀 수 있는 공간입니다.',
    tags: [
      {
        name: 'Next.js',
        colorClass: '!text-text-primary',
      },
      {
        name: 'TypeScript',
        colorClass: '!text-blue-400',
      },
      {
        name: 'Prisma',
        colorClass: '!text-purple-400',
      },
      {
        name: 'Socket.io',
        colorClass: '!text-yellow-400',
      },
    ],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src={`${IMAGE_FOLDER_PATH}/react-profile.jpg`}
        className="h-250pxr w-full"
        placeholder="blurred"
      />
    ),
    projectUrl: {
      github: 'https://github.com/jaem1n207/party-cinema/tree/main',
    },
  },
  {
    name: 'Tech Blog',
    description: '프론트엔드 웹 개발자를 위한 기술 블로그',
    tags: [
      {
        name: 'Gatsby',
        colorClass: '!text-violet',
      },
      {
        name: 'TypeScript',
        colorClass: '!text-blue-400',
      },
    ],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src={`${IMAGE_FOLDER_PATH}/react-profile.jpg`}
        className="h-250pxr w-full"
        placeholder="blurred"
      />
    ),
    projectUrl: {
      github: 'https://github.com/jaem1n207/lazy-dev/tree/main',
    },
  },
  {
    name: 'JM Wordle',
    description: 'Josh Wardle의 인기 게임인 Wordle에 약간의 기능을 추가한 웹 사이트',
    tags: [
      {
        name: 'React',
        colorClass: '!text-green-400',
      },
      {
        name: 'TypeScript',
        colorClass: '!text-blue-400',
      },
    ],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src={`${IMAGE_FOLDER_PATH}/react-profile.jpg`}
        className="h-250pxr w-full"
        placeholder="blurred"
      />
    ),
    projectUrl: {
      github: 'https://github.com/jaem1n207/jm-wordle/tree/master',
    },
  },
];

export default ProjectCardList;
