import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { usePrevious } from 'Hooks/use-previous';
import { isEmptyArray, arraysAreEqual } from 'Utils/assertions';

interface RotatingTagProps {
  tags: (string | null)[];
  interval: number;
  rotationDuration: number;
}

const getRandomIndex = (from: number, to: number): number => {
  const index = Math.floor(Math.random() * from);
  // 랜덤으로 선택된 인덱스가 현재 인덱스와 같다면 다시 랜덤으로 선택
  return index === to ? getRandomIndex(from, to) : index;
};

const RotatingTag = ({ tags, interval, rotationDuration }: RotatingTagProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevTags = usePrevious(tags);

  useEffect(() => {
    if (prevTags && !isEmptyArray(tags)) {
      if (!arraysAreEqual(prevTags, tags)) {
        const index = getRandomIndex(tags.length, currentIndex);
        setCurrentIndex(index);
      }
    }

    const timer = setInterval(() => {
      const index = getRandomIndex(tags.length, currentIndex);
      setCurrentIndex(index);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [prevTags, tags, currentIndex, interval]);

  const calculateOpacity = (index: number, currentIndex: number) => {
    const distance = Math.abs(index - currentIndex);
    return 1 - (distance * 0.9) / tags.length;
  };

  if (isEmptyArray(tags)) return null;

  return (
    <div className="relative w-full overflow-hidden font-bold">
      {tags.map((tag, index) => (
        <motion.span
          key={tag}
          animate={{
            y: (index - currentIndex) * 100,
            opacity: calculateOpacity(index, currentIndex),
          }}
          initial={{
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
