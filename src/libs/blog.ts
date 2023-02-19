import { matchSorter } from 'match-sorter';

import Post from 'Types/post';

export const filterPosts = (posts: Post[], searchString: string): Post[] => {
  if (!searchString) {
    return posts;
  }

  const options = {
    keys: [
      {
        threshold: matchSorter.rankings.CONTAINS,
        key: 'title',
      },
      {
        threshold: matchSorter.rankings.CONTAINS,
        key: 'tags',
      },
      {
        threshold: matchSorter.rankings.CONTAINS,
        key: 'category',
      },
      {
        threshold: matchSorter.rankings.CONTAINS,
        key: 'summary',
      },
    ],
  };

  const allResults = matchSorter(posts, searchString, options);
  const searches = new Set(searchString.split(' '));
  if (searches.size < 2) {
    return allResults;
  }

  const [firstWord, ...restWords] = searches.values();
  if (!firstWord) {
    return [];
  }
  const individualWordOptions = {
    ...options,
    keys: options.keys?.map((key) => {
      return {
        ...key,
        threshold: matchSorter.rankings.WORD_STARTS_WITH,
      };
    }),
  };

  let individualWordResults = matchSorter(posts, firstWord, individualWordOptions);
  for (const word of restWords) {
    const searchResult = matchSorter(individualWordResults, word, individualWordOptions);
    individualWordResults = individualWordResults.filter((post) => searchResult.includes(post));
  }

  return Array.from(new Set([...allResults, ...individualWordResults]));
};
