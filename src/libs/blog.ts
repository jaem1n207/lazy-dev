import { MatchSorterOptions, matchSorter, rankings } from 'match-sorter';

import Post from 'Types/post';

export const filterPosts = (posts: Post[], searchString: string): Post[] => {
  if (!searchString) {
    return posts;
  }

  const options: MatchSorterOptions<Post> = {
    keys: [
      {
        threshold: rankings.CONTAINS,
        key: 'title',
      },
      {
        threshold: rankings.CONTAINS,
        key: 'tags',
      },
      {
        threshold: rankings.CONTAINS,
        key: 'category',
      },
      {
        threshold: rankings.CONTAINS,
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
      return Object.assign({}, key, { threshold: rankings.CONTAINS });
    }),
  };

  let individualWordResults = matchSorter(posts, firstWord, individualWordOptions);
  for (const word of restWords) {
    const searchResult = matchSorter(individualWordResults, word, individualWordOptions);
    individualWordResults = individualWordResults.filter((post) => searchResult.includes(post));
  }

  return Array.from(new Set([...allResults, ...individualWordResults]));
};
