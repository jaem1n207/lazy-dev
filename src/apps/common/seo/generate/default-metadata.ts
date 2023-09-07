import type { Metadata } from '../meta-interface';

export const createDefaultMetadata = (): Metadata => {
  return {
    title: 'Lazy Dev',
    description: '웹 프론트 개발에 대한 이야기를 다룹니다.',
    authors: [
      {
        name: '이재민',
        url: 'https://github.com/jaem1n207',
      },
    ],
    openGraph: null,
  };
};
