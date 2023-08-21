import React from 'react';

import ProjectCard from 'Apps/portfolio/components/project-card';

const fakeProjectCards: Omit<React.ComponentProps<typeof ProjectCard>, 'index'>[] = [
  {
    name: 'Project 1',
    description: 'This is project 1',
    tags: [
      {
        name: 'React',
        color: 'text-blue-400',
      },
      {
        name: 'TypeScript',
        color: 'text-green-400',
      },
    ],
    image: 'https://picsum.photos/seed/picsum/300',
    projectUrl: {
      github: 'https://github.com',
      live: 'https://github.com',
    },
  },
  {
    name: 'Project 2',
    description: 'This is project 2',
    tags: [
      {
        name: 'React',
        color: 'text-blue-400',
      },
      {
        name: 'TypeScript',
        color: 'text-green-400',
      },
    ],
    image: 'https://picsum.photos/seed/picsum/300',
    projectUrl: {
      github: 'https://github.com',
      live: 'https://github.com',
    },
  },
  {
    name: 'Project 3',
    description: 'This is project 3',
    tags: [
      {
        name: 'React',
        color: 'text-blue-400',
      },
      {
        name: 'TypeScript',
        color: 'text-green-400',
      },
    ],
    image: 'https://picsum.photos/seed/picsum/300',
    projectUrl: {
      github: 'https://github.com',
      live: 'https://github.com',
    },
  },
  {
    name: 'Project 4',
    description: 'This is project 4',
    tags: [
      {
        name: 'React',
        color: 'text-blue-400',
      },
      {
        name: 'TypeScript',
        color: 'text-green-400',
      },
    ],
    image: 'https://picsum.photos/seed/picsum/300',
    projectUrl: {
      github: 'https://github.com',
      live: 'https://github.com',
    },
  },
];

const portfolio = () => {
  return (
    <div className="max-w-[1500px] mx-auto px-36pxr desktop:px-24pxr foldable:px-20pxr foldable:pt-36pxr">
      <h1 className="font-bold text-36pxr foldable:text-32pxr mb-24pxr">Portfolio</h1>
      <div className="grid grid-cols-2 gap-24pxr foldable:grid-cols-1">
        {fakeProjectCards.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default portfolio;
