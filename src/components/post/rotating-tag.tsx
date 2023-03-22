import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { isEmptyArray } from 'Libs/assertions';

interface RotatingTagProps {
  tags: (string | null)[];
  interval: number;
  rotationDuration: number;
}

const getRandomIndex = (length: number, currentIndex: number) => {
  let newIndex = currentIndex;
  while (newIndex === currentIndex) {
    newIndex = Math.floor(Math.random() * length);
  }
  return newIndex;
};

const RotatingTag = ({ tags, interval, rotationDuration }: RotatingTagProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => getRandomIndex(tags.length, prevIndex));
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval, tags.length]);

  const calculateOpacity = (index: number, currentIndex: number) => {
    const distance = Math.abs(index - currentIndex);
    return 1 - (distance * 0.9) / tags.length;
  };

  if (isEmptyArray(tags)) return null;

  return (
    <div className="relative overflow-hidden font-bold min-w-[10em] h-[1.2em] mobile:w-[9em]">
      {tags.map((tag, index) => (
        <motion.span
          key={tag}
          animate={{
            y: (index - currentIndex) * 100,
            opacity: calculateOpacity(index, currentIndex),
          }}
          transition={{
            y: { duration: rotationDuration, ease: 'easeOut' },
            opacity: { duration: rotationDuration, ease: 'easeOut' },
          }}
          className="absolute"
        >
          {tag?.toUpperCase()}
        </motion.span>
      ))}
    </div>
  );
};

export default RotatingTag;
