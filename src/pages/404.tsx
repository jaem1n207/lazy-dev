import React, { FC } from 'react';

import { motion } from 'framer-motion';
import { graphql, HeadFC, navigate, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { GoHome } from 'Apps/common/icon/components/svg-icon';
import Seo from 'Apps/common/seo/seo';
import { ROUTES } from 'Types/enum';
import { fadeIn } from 'Utils/motion';

const NotFoundPage: FC<PageProps<Queries.NotFoundQuery>> = () => {
  const goHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <motion.div
        className="mb-16pxr p-12pxr"
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={fadeIn({ direction: 'up', type: 'spring' })}
      >
        <StaticImage src="../images/not-found.png" alt="bunny" placeholder="blurred" width={480} />
      </motion.div>
      <motion.h1
        className="font-bold text-text-primary text-36pxr mb-12pxr"
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={fadeIn({ direction: 'up', type: 'spring', delay: 0.2 })}
      >
        앗! 죄송해요.
      </motion.h1>
      <motion.p
        className="text-center text-text-primary text-18pxr mb-16pxr"
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={fadeIn({ direction: 'up', type: 'spring', delay: 0.4 })}
      >
        요청하신 페이지를 찾을 수 없어요. <br />
        입력하신 주소가 정확한지 다시 한번 확인해주세요.
      </motion.p>
      <motion.div
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={fadeIn({ direction: 'left', type: 'spring', delay: 0.6 })}
      >
        <button
          onClick={goHome}
          className="inline-flex items-center font-medium rounded-md text-text-secondary text-16pxr bg-primary px-16pxr py-8pxr focus-primary"
        >
          <GoHome className="w-20pxr h-20pxr mr-8pxr" />
          블로그 홈으로 돌아갈게요.
        </button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <Seo title="404: Not Found" />;

export const pageQuery = graphql`
  query NotFound {
    site(siteMetadata: {}) {
      siteMetadata {
        title
      }
    }
  }
`;
