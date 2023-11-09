import * as React from 'react';

import { motion } from 'framer-motion';

import { Typography } from 'Apps/common/typography';

import { useNonRepeatingRandomIndex } from '../hooks/use-non-repeating-random-index';

const keywords: string[] = [
  '최적화 이전에 좋은 코드를 생각하는',
  'DX 개선에 관심이 많은',
  '사용자 경험을 중요시하는',
  '서비스의 성장을 고민하는',
  '다양한 실험을 하는',
];

const Introduction = () => {
  const [currentKeywordIndex, generateRandomIndex] = useNonRepeatingRandomIndex(keywords.length);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      generateRandomIndex();
    }, 3_000);

    return () => clearInterval(intervalId);
  }, [generateRandomIndex]);

  return (
    <div className="h-full max-w-full flex-1 desktop:min-w-[80vw]">
      <Typography
        as="div"
        className="my-8pxr h-full text-36pxr font-semibold tracking-tight tablet:text-30pxr"
      >
        저는
        <div className="relative h-56pxr w-full overflow-hidden font-bold">
          {keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              animate={{
                translateY: (index - currentKeywordIndex) * 56 * 2,
              }}
              initial={{
                translateY: (index - currentKeywordIndex) * 56 * 2,
              }}
              transition={{
                translateY: { duration: 1, ease: 'linear' },
              }}
              className="absolute h-full w-full"
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
