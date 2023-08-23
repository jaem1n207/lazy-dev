import React, { useCallback, useEffect, useMemo } from 'react';

import { window } from 'browser-monads-ts';
import tw from 'twin.macro';

import { Typography } from 'Apps/common/typography';
import { useScrollEvent } from 'Hooks/use-scroll-event';
import { addClass, getElement, getElements, removeClass } from 'Utils/dom';
import * as EventManager from 'Utils/event-manager';
import * as ScrollManager from 'Utils/scroll';

interface TableOfContentsProps {
  toc: Queries.MarkdownRemark['tableOfContents'];
}

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
    <div
      css={tw`fixed px-12pxr py-4pxr bg-transparent z-10 max-h-[70vh] max-w-[20vw] overflow-auto`}
    >
      <Typography as="h3" css={tw`font-bold text-18pxr text-all-custom-gray mb-12pxr`}>
        ON THIS PAGE
      </Typography>
      <div
        css={tw`text-13pxr text-all-custom-gray font-bold border-spacing-24pxr pl-12pxr tablet:border-spacing-28pxr tracking-normal tablet:tracking-tighter [a.active]:(text-primary transition-all)`}
        dangerouslySetInnerHTML={{ __html: toc }}
      />
    </div>
  );
};

export default TableOfContents;
