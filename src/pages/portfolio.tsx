import React from 'react';

import ParentRefContainer from 'Apps/common/parent-ref-context/components/parent-ref-container';
import AboutCard from 'Apps/portfolio/components/about-card';
import ProjectCard from 'Apps/portfolio/components/project-card';

const fakeProjectCards: Omit<React.ComponentProps<typeof ProjectCard>, 'index'>[] = [
  {
    name: 'Project 1',
    description: 'This is project 1',
    tags: [
      {
        name: 'React',
        colorClass: 'text-blue-400',
      },
      {
        name: 'TypeScript',
        colorClass: 'text-green-400',
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
        colorClass: 'text-blue-400',
      },
      {
        name: 'TypeScript',
        colorClass: 'text-green-400',
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
        colorClass: 'text-blue-400',
      },
      {
        name: 'TypeScript',
        colorClass: 'text-green-400',
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
        colorClass: 'text-blue-400',
      },
      {
        name: 'TypeScript',
        colorClass: 'text-green-400',
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
