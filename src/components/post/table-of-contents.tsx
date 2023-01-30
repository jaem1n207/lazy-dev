import React from 'react';

import tw from 'twin.macro';

import { addClass, getElement, removeClass } from 'Libs/dom';

interface TableOfContentsProps {
  toc: Queries.MarkdownRemark['tableOfContents'];
}

const TOCWrapper = tw.div`fixed right-0pxr w-1/4 px-12pxr py-4pxr overflow-y-auto bg-transparent border-l-2pxr border-custom-gray z-10 display:visually-hide`;

const TOCContent = tw.div`text-14pxr tablet:text-16pxr text-custom-gray font-bold border-spacing-24pxr tablet:border-spacing-28pxr tracking-normal tablet:tracking-tighter [a.active]:(text-[110%] text-primary transition-all)`;

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          if (!id) return;

          const link = getElement(`a[href="#${encodeURIComponent(id)}"]`);
          if (!link) return;

          const targetStaticYPos = entry.boundingClientRect.y;
          const currentYPos = entry.rootBounds?.y || 0;

          if (entry.isIntersecting) {
            addClass(link, 'active');
          } else if (currentYPos < targetStaticYPos) {
            removeClass(link, 'active');
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
      }
    );

    const targets = document.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]');
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, []);

  if (!toc) return null;

  return (
    <TOCWrapper>
      <TOCContent dangerouslySetInnerHTML={{ __html: toc }} />
    </TOCWrapper>
  );
};

export default TableOfContents;
