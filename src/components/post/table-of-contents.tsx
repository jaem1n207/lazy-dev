import React, { useEffect } from 'react';

import { window } from 'browser-monads-ts';
import tw from 'twin.macro';

import { useScrollEvent } from 'Hooks/use-scroll-event';
import { addClass, getElement, getElements, removeClass } from 'Libs/dom';
import * as EventManager from 'Libs/event-manager';

interface TableOfContentsProps {
  toc: Queries.MarkdownRemark['tableOfContents'];
}

const THRESHOLD = 100;

const TOCWrapper = tw.div`fixed px-12pxr py-4pxr bg-transparent border-l-2pxr border-custom-gray z-10`;

const TOCContent = tw.div`text-14pxr tablet:text-16pxr text-custom-gray font-bold border-spacing-24pxr tablet:border-spacing-28pxr tracking-normal tablet:tracking-tighter [a.active]:(text-[110%] text-primary transition-all)`;

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const getHeaderElements = () => {
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
  };

  const onScroll = () => {
    const headerElements = getHeaderElements();
    headerElements.forEach((headerElement) => {
      if (!headerElement) return;

      const { header, link } = headerElement;

      const { top } = header.getBoundingClientRect();
      const elementTop = top + window.scrollY;
      const isScrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (window.scrollY >= elementTop - THRESHOLD - 10) {
        addClass(link, 'active');
      } else if (isScrollBottom) {
        const lastHeader = headerElements[headerElements.length - 1];
        if (!lastHeader) return;

        const { link: lastLink } = lastHeader;
        addClass(lastLink, 'active');
        return;
      } else {
        removeClass(link, 'active');
      }
    });
  };

  useScrollEvent(() => {
    return EventManager.toFit(onScroll, {})();
  });

  // Link 클릭 시, url에 #이 붙는 것을 막기 위해 preventDefault를 사용하고, scrollTo를 사용하여 이동
  useEffect(() => {
    const headerElements = getHeaderElements();

    headerElements.forEach((headerElement) => {
      if (!headerElement) return;

      const { header, link } = headerElement;

      link.classList.add('focus-primary');

      link.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const { top } = header.getBoundingClientRect();
        const elementTop = top + window.scrollY;

        window.scrollTo({
          top: elementTop - THRESHOLD,
          behavior: 'smooth',
        });
      });

      return () => {
        link.removeEventListener('click', () => {});
      };
    });
  }, []);

  if (!toc) return null;

  return (
    <TOCWrapper>
      <TOCContent dangerouslySetInnerHTML={{ __html: toc }} />
    </TOCWrapper>
  );
};

export default TableOfContents;
