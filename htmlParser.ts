import { Element, load } from 'cheerio';

import type { StructuredData } from 'Types/types';

/**
 * 전달받은 마크다운 콘텐츠 구조를 반영한 구조화된 데이터를 추출합니다.
 */
export function extractContentByHeading(html: string): StructuredData {
  const $ = load(html);
  const contentByHeading: StructuredData = {};

  $('img, pre, input').remove();

  const bodyContent: string[] = [];
  let reachedHeading = false;

  // 첫 번째 heading 태그를 만날 때까지 body의 내용을 bodyContent에 추가합니다.
  const processNode = (elem: Element) => {
    if (!reachedHeading && !$(elem).is('h1, h2, h3, h4, h5, h6')) {
      bodyContent.push($(elem).text());
    } else {
      reachedHeading = true;
    }
  };

  $('body')
    .children()
    .each((_, elem) => processNode(elem));

  // bodyContent에 추가된 내용을 contentByHeading의 첫 번째 값으로 추가합니다.
  contentByHeading[''] = bodyContent.join(' ').trim();

  $('h1, h2, h3, h4, h5, h6').each((_, element) => {
    const heading = $(element);
    let content = '';

    let nextElem = heading.next();
    // 다음 element가 존재하고 heading 태그가 아닐 때까지 텍스트를 추가합니다.
    while (nextElem.length && !nextElem.is('h1, h2, h3, h4, h5, h6')) {
      content += nextElem.text() + ' ';
      nextElem = nextElem.next();
    }

    const headingId = heading.attr('id');
    if (headingId) {
      contentByHeading[`${encodeURIComponent(headingId)}#${headingId}`] = content.trim();
    }
  });

  return contentByHeading;
}
