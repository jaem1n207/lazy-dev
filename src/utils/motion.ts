import type { AnimationOptions, EasingDefinition, Variant } from 'framer-motion';

/**
 * 지정한 애니메이션을 실행하기 위한 variant
 */
export const animateVariant = {
  hidden: 'hidden',
  show: 'show',
} as const;

interface Orchestration {
  delay?: number;
}

interface TransformDirection {
  direction?: 'left' | 'right' | 'up' | 'down';
}

interface CustomAnimationOptions extends TransformDirection, Orchestration {
  type?: AnimationOptions<any>['type'];
  duration?: number;
  ease?: EasingDefinition;
}

type ReturnVariants = {
  [key in keyof typeof animateVariant]: Variant;
};

type FadeIn = (options?: CustomAnimationOptions) => ReturnVariants;
type TextVariant = (options?: Orchestration) => ReturnVariants;
type SlideIn = (options?: CustomAnimationOptions) => ReturnVariants;
type ZoomIn = (options?: { duration?: number; delay?: number }) => ReturnVariants;

export const fadeIn: FadeIn = (options = {}) => {
  const { direction = 'left', type = 'spring', delay, duration, ease = 'easeOut' } = options;

  return {
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: ease,
      },
    },
  };
};

export const textVariant: TextVariant = (options = {}) => {
  const { delay } = options;

  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        delay: delay,
        duration: 1.25,
      },
    },
  };
};

export const slideIn: SlideIn = (options = {}) => {
  const { direction = 'left', type = 'spring', delay, duration, ease = 'easeOut' } = options;

  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: ease,
      },
    },
  };
};

export const zoomIn: ZoomIn = (options = {}) => {
  const { delay, duration } = options;

  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay: delay,
        duration: duration,
        ease: 'easeOut',
      },
    },
  };
};
