import { motion } from 'framer-motion';
import { graphql, HeadFC, navigate, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { GoHome } from 'Apps/common/icon/components/svg-icon';
import Seo from 'Apps/common/seo/seo';
import { ROUTES } from 'Types/enum';
import { animateVariant, textVariant } from 'Utils/motion';

const NotFoundPage = (_props: PageProps<Queries.NotFoundQuery>) => {
  const goHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex select-none flex-col items-center justify-center">
      <motion.div
        className="mb-16pxr p-12pxr"
        initial={animateVariant.hidden}
        animate={animateVariant.show}
        variants={textVariant()}
      >
        <StaticImage src="../images/not-found.png" alt="bunny" placeholder="blurred" width={480} />
      </motion.div>
      <motion.h1
        className="mb-12pxr text-36pxr font-bold text-text-primary"
        initial={animateVariant.hidden}
        animate={animateVariant.show}
        variants={textVariant({ delay: 0.2 })}
      >
        앗! 죄송해요.
      </motion.h1>
      <motion.p
        className="mb-16pxr text-center text-18pxr text-text-primary"
        initial={animateVariant.hidden}
        animate={animateVariant.show}
        variants={textVariant({ delay: 0.4 })}
      >
        요청하신 페이지를 찾을 수 없어요. <br />
        입력하신 주소가 정확한지 다시 한번 확인해주세요.
      </motion.p>
      <motion.div
        initial={animateVariant.hidden}
        animate={animateVariant.show}
        variants={textVariant({ delay: 0.6 })}
      >
        <button
          onClick={goHome}
          className="focus-primary inline-flex items-center rounded-md bg-primary px-16pxr py-8pxr text-16pxr font-medium text-text-secondary"
        >
          <GoHome className="mr-8pxr h-20pxr w-20pxr" />
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
