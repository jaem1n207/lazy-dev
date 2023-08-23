import type { Variants } from 'framer-motion';

type Direction = 'left' | 'right' | 'up' | 'down';
type Type = 'tween' | 'spring' | 'just' | 'keyframes' | 'inertia' | 'decay' | 'none';

interface FadeIn {
  direction: Direction;
  type: Type;
  delay?: number;
  duration?: number;
}

export const fadeIn = ({ direction, type, delay, duration }: FadeIn): Variants => {
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
        ease: 'easeOut',
      },
    },
  };
};
