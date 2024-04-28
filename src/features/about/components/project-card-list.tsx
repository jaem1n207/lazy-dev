import { useEffect, useRef, type ComponentProps } from "react";
import { StaticImage } from "gatsby-plugin-image";

import ProjectCard from "./project-card";

const ProjectCardList = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const updateCursor = ({ x, y }: { x: number; y: number }) => {
      gridEl.style.setProperty("--x", `${x}`);
      gridEl.style.setProperty("--y", `${y}`);
    };

    gridEl.addEventListener("pointermove", updateCursor);

    return () => {
      gridEl.removeEventListener("pointermove", updateCursor);
    };
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-project-card-list gap-24pxr foldable:grid-cols-1">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} index={index} {...project} />
      ))}
    </div>
  );
};

const IMAGE_FOLDER_PATH = "../../../../content/blog/thumbnails";

const stacks = {
  svelte: {
    name: "Svelte",
    colorClass: "!text-red-400",
  },
  javascript: {
    name: "JavaScript",
    colorClass: "dark:!text-yellow-400 !text-yellow-600",
  },
  typescript: {
    name: "TypeScript",
    colorClass: "dark:!text-blue-400 !text-blue-600",
  },
  nextjs: {
    name: "Next.js",
    colorClass: "!text-text-primary",
  },
  prisma: {
    name: "Prisma",
    colorClass: "dark:!text-purple-400 !text-purple-600",
  },
  socketio: {
    name: "Socket.io",
    colorClass: "dark:!text-yellow-400 !text-yellow-700",
  },
  gatsby: {
    name: "Gatsby",
    colorClass: "!text-violet",
  },
  react: {
    name: "React",
    colorClass: "dark:!text-green-400 !text-green-600",
  },
  vite: {
    name: "Vite",
    colorClass: "!text-violet",
  },
};

const projects: Omit<ComponentProps<typeof ProjectCard>, "index">[] = [
  {
    name: "Dynamic Scrollbar",
    description:
      "스크롤바를 백그라운드 활동을 모니터링할 수 있는 대화형 스크롤바로 바꿔주는 브라우저 확장 프로그램입니다. 현재 개발 중입니다.",
    tags: [stacks.react, stacks.typescript, stacks.vite],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src={`${IMAGE_FOLDER_PATH}/react-profile.jpg`}
        className="h-250pxr w-full"
        placeholder="blurred"
      />
    ),
    projectUrl: {
      github: "https://github.com/jaem1n207/dynamic-scrollbar",
    },
  },
  {
    name: "Synchronize Tab Scrolling",
    description:
      "여러 탭의 스크롤 위치를 동기화하는 브라우저 확장 프로그램입니다. Chrome, Edge, Firefox, Brave 브라우저를 지원합니다.",
    tags: [stacks.svelte, stacks.typescript],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src={`${IMAGE_FOLDER_PATH}/react-profile.jpg`}
        className="h-250pxr w-full"
        placeholder="blurred"
      />
    ),
    projectUrl: {
      github: "https://github.com/jaem1n207/synchronize-tab-scrolling/tree/main",
      live: "https://chromewebstore.google.com/detail/synchronize-tab-scrolling/phceoocamipnafpgnchbfhkdlbleeafc?hl=en",
    },
  },
  {
    name: "eslint-plugin-ben",
    description: "개인적인 개발 환경에 맞는 규칙을 정의한 ESLint 플러그인입니다.",
    tags: [stacks.javascript],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src={`${IMAGE_FOLDER_PATH}/react-profile.jpg`}
        className="h-250pxr w-full"
        placeholder="blurred"
      />
    ),
    projectUrl: {
      github: "https://github.com/jaem1n207/eslint-plugin-ben",
      npm: "https://www.npmjs.com/package/eslint-plugin-ben",
    },
  },
  {
    name: "Tech Blog",
    description: "웹 개발을 하며 얻은 점을 다루는 기술 블로그입니다.",
    tags: [stacks.gatsby, stacks.typescript],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src={`${IMAGE_FOLDER_PATH}/react-profile.jpg`}
        className="h-250pxr w-full"
        placeholder="blurred"
      />
    ),
    projectUrl: {
      github: "https://github.com/jaem1n207/lazy-dev/tree/main",
    },
  },
  {
    name: "JM Wordle",
    description: "Josh Wardle의 인기 게임인 Wordle에 약간의 기능을 추가한 Wordle 입니다.",
    tags: [stacks.react, stacks.typescript],
    staticImageEl: (
      <StaticImage
        alt="project-thumbnail"
        src={`${IMAGE_FOLDER_PATH}/react-profile.jpg`}
        className="h-250pxr w-full"
        placeholder="blurred"
      />
    ),
    projectUrl: {
      github: "https://github.com/jaem1n207/jm-wordle/tree/master",
    },
  },
];

export default ProjectCardList;
