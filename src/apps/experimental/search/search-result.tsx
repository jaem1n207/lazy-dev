// 초간단 검색 결과 표시 테스트
import React, { useState } from 'react';

import Fuse from 'fuse.js';

import type { SearchData } from 'Types/types';

import searchData from './lazy-dev-data.json';

const fuseOptions = {
  keys: ['title', 'data'],
  includeScore: true,
};

const searchItems = Object.entries(searchData as SearchData).map(([route, info]) => ({
  route,
  ...info,
}));

const fuse = new Fuse(searchItems, fuseOptions);

const SearchResults: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof searchItems>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const searchResults = fuse.search(e.target.value).map((result) => result.item);
    setResults(searchResults.slice(0, 30)); // Limit to 30 results
  };

  return (
    <div>
      <input
        className="sm:text-sm sm:leading-6 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="검색..."
      />
      <ul>
        {results.map((result) => (
          <li key={result.route}>
            <h3>{result.title}</h3>
            {Object.entries(result.data).map(([key, content]) => (
              <p key={key} className="line-clamp-2">
                {content}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
