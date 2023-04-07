import React from 'react';

import { FlowerCircleIcon } from './svg/svg-icon';

interface SummaryProps {
  summary: Queries.MarkdownRemarkFrontmatter['summary'];
}

const Summary = ({ summary }: SummaryProps) => {
  return (
    <section>
      <div className="relative w-full h-1pxr my-48pxr box-decoration-slice bg-gradient-to-r from-primary to-gradient-cyan">
        <div className="absolute -top-24pxr left-[calc(50%-2.25rem)] flex justify-center bg-bg-primary px-12pxr">
          <FlowerCircleIcon className="fill-primary bg-bg-primary" size={48} />
        </div>
      </div>
      <p className="font-bold">{summary}</p>
      <div className="w-full h-1pxr box-decoration-slice bg-gradient-to-r from-primary to-gradient-cyan my-40pxr tablet:my-32pxr" />
    </section>
  );
};

export default Summary;
