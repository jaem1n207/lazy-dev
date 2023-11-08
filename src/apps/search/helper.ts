export type SeedType = {
  name: string;
  url: string;
  group?: string;
};
export type SeedsType = SeedType[];

export type SearchResults = SeedType;
export type SearchResultGroup = {
  title: string;
  items: SeedsType;
};
