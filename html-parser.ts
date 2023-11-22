import { Element, load } from 'cheerio';

import type { StructuredData } from 'Types/types';

/**
 * 전달받은 마크다운 콘텐츠 구조를 검색에 유용한 구조화된 데이터로 추출합니다.
 */
export function extractContentByHeading(html: string): StructuredData {
  const $ = load(html);
  const contentByHeading: StructuredData = {};

  $('img, pre, input').remove();

  let isReferenceSection = false;

  // heading element의 콘텐츠를 다음 heading element를 만날 때까지 추출합니다.
  const processContent = (element: Element) => {
    let content = '';
    let nextElem = $(element).next();

    while (nextElem.length && !nextElem.is('h1, h2, h3, h4, h5, h6')) {
      content += nextElem.text() + ' ';
      nextElem = nextElem.next();
    }

    return content.trim();
  };

  $('h1, h2, h3, h4, h5, h6').each((i, element) => {
    const heading = $(element);
    const headingText = heading.text();
    const headingId = heading.attr('id');

    if (headingText.includes('참고')) {
      isReferenceSection = true;
      return; // '참고' 문자열이 포함된 heading element는 건너뜁니다.
    }

    if (isReferenceSection) {
      isReferenceSection = false;
      return;
    }

    if (headingId) {
      const key = i === 0 ? '' : `${encodeURIComponent(headingId)}#${headingId}`;
      contentByHeading[key] = processContent(element);
    }
  });

  return contentByHeading;
}
