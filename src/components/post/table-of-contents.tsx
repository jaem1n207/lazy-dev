import React from 'react';

import tw from 'twin.macro';

interface TableOfContentsProps {
  toc: Queries.MarkdownRemark['tableOfContents'];
}

const TOCWrapper = tw.div`fixed top-100pxr right-0pxr w-1/4 tablet:w-1/4 overflow-y-auto bg-transparent border-l-0pxr border-custom-gray shadow-2xl z-10 display:visually-hide`;

const TOCContent = tw.div`text-14pxr tablet:text-16pxr text-custom-gray font-bold border-spacing-24pxr tablet:border-spacing-28pxr tracking-normal tablet:tracking-tighter [a.active]:(text-[110%] text-primary transition-all)`;

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');

          if (!id) return;
          const link = document.querySelector(`a[href="#${encodeURIComponent(id)}"]`);

          const targetStaticYPos = entry.boundingClientRect.y;
          const currentYPos = entry.rootBounds?.y || 0;

          if (entry.isIntersecting) {
            link?.classList.add('active');
          } else if (currentYPos < targetStaticYPos) {
            link?.classList.remove('active');
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
