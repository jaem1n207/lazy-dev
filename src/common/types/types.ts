export type StructuredData = Record<string, string>;

export type SearchData = {
  [route: string]: {
    title: string;
    data: StructuredData;
  };
};
