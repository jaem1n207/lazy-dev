import React, { FC } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { graphql, HeadFC, navigate, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Seo from 'Components/seo';
import Layout from 'Layout/layout';
import { isBrowser } from 'Libs/environment';
import { ROUTES } from 'Types/enum';

const NotFoundPage: FC<PageProps<Queries.NotFoundQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title || null;

  const goBack = () => {
    if (isBrowser && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <Layout location={location} title={siteTitle}>
      <div className="flex flex-col items-center justify-center select-none">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="mb-16pxr"
        >
          <StaticImage
            src="../images/not-found.png"
            alt="Not Found Blog URL"
            placeholder="blurred"
            layout="constrained"
            width={512}
            className="overflow-hidden"
          />
        </motion.div>
        <motion.h1
          className="font-bold text-text text-36pxr mb-16pxr"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          앗! 죄송해요.
        </motion.h1>
        <motion.p
          className="text-center text-text text-18pxr mb-32pxr"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          요청하신 페이지를 찾을 수 없어요. <br />
          입력하신 주소가 정확한지 다시 한번 확인해주세요.
        </motion.p>
        <div>
          <button
            onClick={goBack}
            className="inline-flex items-center font-medium text-white rounded-md text-16pxr bg-primary px-16pxr py-8pxr focus-primary"
          >
            <ArrowLeftIcon className="w-20pxr h-20pxr mr-8pxr" />
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    </Layout>
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
