import React from 'react';

import AboutCard from 'Apps/about/components/about-card';
import ProjectCardList from 'Apps/about/components/project-card-list';

const About = () => {
  return (
    <div className="select-none max-w-[1200px] mx-auto px-36pxr desktop:px-24pxr foldable:px-20pxr foldable:pt-36pxr">
      <h3 className="font-bold text-36pxr foldable:text-32pxr mb-24pxr">이재민</h3>
      <div className="max-w-[700px] w-full mx-auto pt-16pxr">
        <AboutCard />
      </div>
      <h3 className="font-bold text-36pxr foldable:text-32pxr my-24pxr">개인 프로젝트</h3>
      <ProjectCardList />
    </div>
  );
};

export default About;
