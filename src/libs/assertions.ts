export const isNil = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

export const isEmptyString = (value: unknown): value is '' => {
  return isNil(value) || value?.toString().trim() === '';
};

export const isEmptyArray = (value: unknown): value is [] => {
  // @ts-ignore
  return isNil(value) || value?.length === 0;
};
