import React from 'react';

import type { PageIndex, SectionIndex } from './types';

interface SearchProps {
  indexes: { [locale: string]: [PageIndex, SectionIndex] };
  search: string;
}

const Search = ({ indexes, search }: SearchProps) => {
  return <div>Search</div>;
};

export default Search;
