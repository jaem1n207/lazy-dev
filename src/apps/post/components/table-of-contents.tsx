import { useCallback, useEffect, useMemo } from 'react';

import { window } from 'browser-monads-ts';

import { Typography } from 'Apps/common/typography';
import { useScrollEvent } from 'Hooks/use-scroll-event';
import { addClass, getElement, getElements, removeClass } from 'Utils/dom';
import * as EventManager from 'Utils/event-manager';
import 'twin.macro';
import * as ScrollManager from 'Utils/scroll';

interface TableOfContentsProps {
  toc: Queries.MarkdownRemark['tableOfContents'];
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const THRESHOLD = useMemo(() => window.innerHeight / 2, []);

  const getHeaderElements = useCallback(() => {
    const headers = Array.from(getElements('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'));

    const headerElements = headers.map((header) => {
      const id = header.getAttribute('id');
      if (!id) return null;

      const link = getElement(`a[href="#${encodeURIComponent(id)}"]`);
      if (!link) return null;

      return {
        header,
        link,
      };
    });

    return headerElements;
  }, []);

  const onScroll = useCallback(() => {
    const headerElements = getHeaderElements();

    headerElements.forEach((headerElement) => {
      if (!headerElement) return;

      const { header, link } = headerElement;
      const { top } = header.getBoundingClientRect();
      const elementTop = top + window.scrollY;

      if (elementTop <= window.scrollY + THRESHOLD) {
        addClass(link, 'active');
      } else if (elementTop >= window.scrollY + THRESHOLD) {
        removeClass(link, 'active');
      }

      return () => {
        removeClass(link, 'active');
      };
    });
  }, [THRESHOLD, getHeaderElements]);

  useScrollEvent(() => {
    return EventManager.toFit(onScroll, {})();
  });

  // Link 클릭 시, url에 #이 붙는 것을 막기 위해 preventDefault를 사용하고, scrollTo를 사용하여 이동
  useEffect(() => {
    const headerElements = getHeaderElements();

    headerElements.forEach((headerElement) => {
      if (!headerElement) return;

      const { header, link } = headerElement;

      link.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const { top } = header.getBoundingClientRect();
        const elementTop = top + window.scrollY;

        ScrollManager.go(elementTop - 50);
      });

      return () => {
        link.removeEventListener('click', () => {});
      };
    });
  }, [getHeaderElements]);

  if (!toc) return null;

  return (
    <div className="fixed z-10 max-h-[70vh] max-w-[20vw] overflow-auto bg-transparent px-12pxr py-4pxr">
      <Typography as="h3" className="mb-12pxr text-18pxr font-bold text-all-custom-gray">
        ON THIS PAGE
      </Typography>
      <div
        className="toc-wrapper border-spacing-24pxr pl-12pxr text-13pxr font-bold tracking-normal text-all-custom-gray tablet:border-spacing-28pxr tablet:tracking-tighter"
        dangerouslySetInnerHTML={{ __html: toc }}
      />
    </div>
  );
};

export default TableOfContents;
