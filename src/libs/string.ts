export const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

export const firstLetterUppercase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
