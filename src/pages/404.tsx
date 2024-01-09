import { window } from "browser-monads-ts";
import { motion } from "framer-motion";
import { HeadFC, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Anchor from "@/common/components/a/anchor";
import { LoginIcon } from "@/common/components/icon/login-icon";
import Seo from "@/common/components/seo/seo";
import ClientOnly from "@/common/components/wrapper/client-only";
import { ROUTES } from "@/common/const";
import { getGithubIssueUrl } from "@/common/utils/git";
import { animateVariant, textVariant } from "@/common/utils/motion";

const NotFoundPage = () => {
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
        <StaticImage src="../assets/not-found.webp" alt="bunny" placeholder="blurred" width={480} />
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
        className="flex items-center gap-2 foldable:flex-col"
      >
        <button
          type="button"
          onClick={goHome}
          className="focus-primary inline-flex items-center rounded-md bg-primary px-16pxr py-8pxr text-16pxr font-medium text-text-secondary"
        >
          <LoginIcon className="mr-8pxr size-20pxr" />
          블로그 홈으로 돌아갈게요.
        </button>
        <ClientOnly>
          <Anchor
            className="focus-primary rounded-md bg-bg-inner px-16pxr py-8pxr text-16pxr font-medium text-text-secondary"
            href={getGithubIssueUrl({
              title: `깨져있던 \`${window.location.pathname}\` 경로를 발견했어요. 확인해주세요!`,
              labels: "bug",
            })}
            external
          >
            해당 문제를 여기에 알려주세요!
          </Anchor>
        </ClientOnly>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <Seo title="404: Not Found" />;
