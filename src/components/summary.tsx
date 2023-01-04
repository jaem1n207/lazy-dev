import React from 'react';

import { FlowerCircleIcon } from './svg/svg-icon';

interface SummaryProps {
  summary: Queries.MarkdownRemarkFrontmatter['summary'];
}

const Summary = ({ summary }: SummaryProps) => {
  return (
    <div>
      <div className="relative w-full h-1pxr mt-48pxr mb-24pxr box-decoration-slice bg-gradient-to-r from-hyperlink to-primary">
        <div className="absolute -top-24pxr left-[calc(50%-2.25rem)] flex justify-center">
          <FlowerCircleIcon className="fill-primary bg-background" size={48} />
        </div>
      </div>
      <span className="font-bold">{summary}</span>
      <div className="w-full h-1pxr box-decoration-slice bg-gradient-to-r from-hyperlink to-primary mt-24pxr mb-48pxr" />
    </div>
  );
};

export default Summary;
