import React, { PropsWithChildren } from 'react';

import { Variants, motion } from 'framer-motion';

interface AnimateFadeContainerProps {
  key?: string;
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

const AnimateFadeContainer = ({ key, children }: PropsWithChildren<AnimateFadeContainerProps>) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      key={key ?? 'animated-fade-container'}
    >
      {children}
    </motion.div>
  );
};

export default AnimateFadeContainer;
