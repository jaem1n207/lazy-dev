export const isNil = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

export const isEmptyString = (value: unknown): value is "" => {
  return isNil(value) || value?.toString().trim() === "";
};

export const isEmptyArray = (value: unknown): value is [] => {
  // @ts-ignore
  return isNil(value) || value?.length === 0;
};

export const arraysAreEqual = (a: unknown[], b: unknown[]): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
