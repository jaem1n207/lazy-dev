import React, { PropsWithChildren } from 'react';

import { Variants, motion } from 'framer-motion';

interface AnimatedFadeContainerProps {
  className?: string;
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const AnimateFadeContainer = ({
  children,
  className,
}: PropsWithChildren<AnimatedFadeContainerProps>) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateFadeContainer;
