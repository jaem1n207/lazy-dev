import React from 'react';

interface SummaryProps {
  summary: Queries.MarkdownRemarkFrontmatter['summary'];
}

const Summary = ({ summary }: SummaryProps) => {
  return (
    <div className="my-20pxr">
      <div />
      <span>{summary}</span>
      <div />
    </div>
  );
};

export default Summary;
