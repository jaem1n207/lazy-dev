import * as React from 'react';

import { motion } from 'framer-motion';

import { Typography } from 'Apps/common/typography';

const keywords: string[] = [
  'DX 개선에 관심이 많은',
  '사용자 경험을 중요시하는',
  '서비스의 성장을 고민하는',
  '커뮤니케이션을 중요시하는',
  '다양한 실험을 하는',
];

const getRandomIndex = (from: number, to: number): number => {
  const index = Math.floor(Math.random() * from);
  // 랜덤으로 선택된 인덱스가 현재 인덱스와 같다면 다시 랜덤으로 선택
  return index === to ? getRandomIndex(from, to) : index;
};

const calculateOpacity = (index: number, currentIndex: number) => {
  const distance = Math.abs(index - currentIndex);
  return 1 - (distance * 0.9) / keywords.length;
};

const infiniteAnimationDuration = 3_000;

const Introduction = () => {
  const [currentKeywordIndex, setCurrentKeywordIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const index = getRandomIndex(keywords.length, currentKeywordIndex);
      setCurrentKeywordIndex(index);
    }, infiniteAnimationDuration);

    return () => {
      clearInterval(timer);
    };
  }, [currentKeywordIndex]);

  return (
    <div className="flex-1 h-full max-w-full desktop:min-w-[80vw]">
      <Typography
        as="div"
        className="h-full font-semibold tracking-tight my-8pxr text-36pxr tablet:text-30pxr"
      >
        저는
        <div className="relative w-full overflow-hidden font-bold h-56pxr">
          {keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              animate={{
                y: (index - currentKeywordIndex) * 100,
                opacity: calculateOpacity(index, currentKeywordIndex),
              }}
              initial={{
                y: (index - currentKeywordIndex) * 100,
                opacity: calculateOpacity(index, currentKeywordIndex),
              }}
              transition={{
                y: { duration: 1, ease: 'easeOut' },
                opacity: { duration: 1, ease: 'easeOut' },
              }}
              className="absolute w-full h-full"
            >
              {keyword}
            </motion.span>
          ))}
        </div>
        개발자입니다.
      </Typography>
    </div>
  );
};

export default Introduction;
