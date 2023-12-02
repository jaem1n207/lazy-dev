import type { ValueAnimationOptions, EasingDefinition, Variant } from 'framer-motion';

/**
 * 지정한 애니메이션을 실행하기 위한 variant
 */
export const animateVariant = {
  hidden: 'hidden',
  show: 'show',
} as const;

interface DurationOptions {
  duration?: number;
}
interface Orchestration {
  delay?: number;
}

interface CustomAnimationOptions extends Orchestration, DurationOptions {
  type?: ValueAnimationOptions<any>['type'];
  ease?: EasingDefinition;
  direction?: 'left' | 'right' | 'up' | 'down';
}
interface TimingAnimationOptions extends Orchestration, DurationOptions {}

type ReturnVariants = {
  [key in keyof typeof animateVariant]: Variant;
};

type FadeIn = (options?: CustomAnimationOptions) => ReturnVariants;
type TextVariant = (options?: TimingAnimationOptions) => ReturnVariants;
type SlideIn = (options?: CustomAnimationOptions) => ReturnVariants;
type ZoomIn = (options?: TimingAnimationOptions) => ReturnVariants;

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
  const { delay, duration = 1.25 } = options;

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
        duration: duration,
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
