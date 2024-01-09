import { load, type Element } from "cheerio";

import type { StructuredData } from "@/common/types/types";

/**
 * 전달받은 마크다운 콘텐츠 구조를 검색에 유용한 구조화된 데이터로 추출합니다.
 */
export function extractContentByHeading(html: string): StructuredData {
  const $ = load(html);
  const contentByHeading: StructuredData = {};

  $("img, pre, input").remove();

  let isReferenceSection = false; // '참고' 섹션 여부
  // eslint-disable-next-line unused-imports/no-unused-vars
  let hasFirstHeadingFound = false; // 첫 heading 요소 발견 여부

  // 첫 heading 요소 이전의 콘텐츠를 처리합니다.
  const processPreHeadingContent = () => {
    let content = "";
    const bodyChildren = $("body").children();
    for (let i = 0; i < bodyChildren.length; i++) {
      const child = bodyChildren[i];
      if (!$(child).is("h1, h2, h3, h4, h5, h6")) {
        content += `${$(child).text()} `;
      } else {
        break;
      }
    }
    return content.trim();
  };

  // heading 요소의 콘텐츠를 다음 heading 요소를 만날 때까지 추출합니다.
  const processContent = (element: Element) => {
    let content = "";
    let nextElem = $(element).next();

    while (nextElem.length && !nextElem.is("h1, h2, h3, h4, h5, h6")) {
      content += `${nextElem.text()} `;
      nextElem = nextElem.next();
    }

    return content.trim();
  };

  // 첫 heading 요소 이전의 콘텐츠를 처리합니다.
  contentByHeading[""] = processPreHeadingContent();

  $("h1, h2, h3, h4, h5, h6").each((i, element) => {
    const heading = $(element);
    const headingText = heading.text();
    const headingId = heading.attr("id");

    if (headingText.includes("참고")) {
      isReferenceSection = true;
      return; // '참고' 문자열이 포함된 heading 요소는 건너뜁니다.
    }

    if (isReferenceSection) {
      isReferenceSection = false;
      return;
    }

    hasFirstHeadingFound = true;

    if (headingId) {
      const key = `${encodeURIComponent(headingId)}#${headingId}`;
      contentByHeading[key] = processContent(element);
    }
  });

  return contentByHeading;
}
