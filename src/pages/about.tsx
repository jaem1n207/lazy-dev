import React from 'react';

import { HeadFC, HeadProps } from 'gatsby';

import AboutCard from 'Apps/about/components/about-card';
import Introduction from 'Apps/about/components/introduction';
import ProjectCardList from 'Apps/about/components/project-card-list';
import Seo from 'Apps/common/seo/seo';

const About = () => {
  return (
    <div className="select-none max-w-[1200px] mx-auto px-36pxr desktop:px-24pxr foldable:px-20pxr foldable:pt-36pxr">
      <div className="max-w-[1200px] mx-auto pt-48pxr gap-48pxr flex items-center desktop:flex-col">
        <Introduction />
        <AboutCard />
      </div>
      <h3 className="font-bold text-36pxr foldable:text-32pxr my-24pxr">개인 프로젝트</h3>
      <ProjectCardList />
    </div>
  );
};

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo title="About" pathname={location.pathname} />
);

export default About;
