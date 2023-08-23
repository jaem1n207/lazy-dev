// TypeScript 컴파일러는 고유의 컴파일 규칙을 따라서 export/import 구문이 없는 파일을 모듈이 아닌 스크립트로 취급함
// 가짜 export를 넣어서 외부 모듈로 인식되게 함
export {};

declare global {
  type Theme = 'dark' | 'light' | undefined;
  interface Window {
    __theme: Theme;
    __setPreferredTheme: (theme: Theme) => void;
  }
}

declare const __PATH_PREFIX__: string;
