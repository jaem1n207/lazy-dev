export {};

type Theme = 'dark' | 'light';

declare global {
  interface Window {
    __theme: Theme;
    __setPreferredTheme: (theme: Theme) => void;
  }
}

declare const __PATH_PREFIX__: string;
