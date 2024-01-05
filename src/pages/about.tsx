import { HeadFC, HeadProps } from "gatsby";

import Seo from "@/common/components/seo/seo";

import AboutCard from "@/features/about/components/about-card";
import Introduction from "@/features/about/components/introduction";
import ProjectCardList from "@/features/about/components/project-card-list";

const About = () => {
  return (
    <div className='mx-auto max-w-[1200px] select-none px-36pxr desktop:px-24pxr foldable:px-20pxr foldable:pt-36pxr'>
      <div className='mx-auto flex max-w-[1200px] items-center gap-48pxr pt-48pxr desktop:flex-col'>
        <Introduction />
        <AboutCard />
      </div>
      <h3 className='my-24pxr text-36pxr font-bold foldable:text-32pxr'>개인 프로젝트</h3>
      <ProjectCardList />
    </div>
  );
};

export const Head: HeadFC = ({ location }: HeadProps) => (
  <Seo
    title='About Lazy Dev'
    openGraph={{
      type: "website",
      url: location.pathname,
    }}
  />
);

export default About;
