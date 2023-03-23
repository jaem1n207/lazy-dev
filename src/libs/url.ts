import { ROUTES } from 'Types/enum';

export const checkRootPath = (path: string): boolean => {
  return path === ROUTES.HOME || path === '';
};
