import React from 'react';

import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = 'full', height = 'full' }) => {
  const loadingVariants = {
    initial: {
      x: '-100%',
      opacity: 0.5,
    },
    animate: {
      x: '100%',
      opacity: 1,
    },
  };

  const transition = {
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear',
  };

  return (
    <motion.div
      className={`w-${width} h-${height} absolute top-0 left-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300`}
      variants={loadingVariants}
      initial="initial"
      animate="animate"
      transition={transition}
    />
  );
};

export default Skeleton;
