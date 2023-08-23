import React, { useCallback, useEffect, useMemo } from 'react';

import { window } from 'browser-monads-ts';
import tw from 'twin.macro';

import { useScrollEvent } from 'Hooks/use-scroll-event';
import { addClass, getElement, getElements, removeClass } from 'Utils/dom';
import * as EventManager from 'Utils/event-manager';

interface TableOfContentsProps {
  toc: Queries.MarkdownRemark['tableOfContents'];
}

const TOCWrapper = tw.div`fixed px-12pxr py-4pxr bg-transparent border-l-2pxr border-all-custom-gray z-10 max-h-[70vh] max-w-[20vw] overflow-auto`;

const TOCContent = tw.div`text-16pxr text-all-custom-gray font-bold border-spacing-24pxr tablet:border-spacing-28pxr tracking-normal tablet:tracking-tighter [a.active]:(text-[110%] text-primary transition-all)`;

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const THRESHOLD = useMemo(() => window.innerHeight / 2, []);

  const getHeaderElements = useCallback(() => {
    const headers = getElements('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
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

      addClass(link, 'focus-primary');

      link.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const { top } = header.getBoundingClientRect();
        const elementTop = top + window.scrollY;

        window.scrollTo({
          top: elementTop - 50,
          behavior: 'smooth',
        });
      });

      return () => {
        link.removeEventListener('click', () => {});
      };
    });
  }, [getHeaderElements]);

  if (!toc) return null;

  return (
    <TOCWrapper>
      <TOCContent dangerouslySetInnerHTML={{ __html: toc }} />
    </TOCWrapper>
  );
};

export default TableOfContents;
