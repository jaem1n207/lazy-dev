import React, { ReactNode, useCallback, useEffect } from 'react';

import { window } from 'browser-monads-ts';
import { Variants, useAnimation, motion } from 'framer-motion';
import { navigate } from 'gatsby';

import { useEventListener } from 'Hooks/use-event-listener';

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

interface AnimatedContainerProps {
  children: ReactNode;
}

const AnimatedContainer = ({ children }: AnimatedContainerProps) => {
  const controls = useAnimation();

  const animateOnURLChange = useCallback(async () => {
    await controls.start('hidden');
    navigate(window.location.pathname, { replace: true });
    await controls.start('visible');
  }, [controls]);

  useEventListener('popstate', animateOnURLChange);

  useEffect(() => {
    const animateOnFirstRender = async () => {
      await controls.start('visible');
    };

    animateOnFirstRender();
  }, [controls]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate={controls}>
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
