declare global {
  type Theme = "dark" | "light" | undefined;

  interface DetectDevice {
    isMacOs: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isSmartTV: boolean;
    isWearable: boolean;
    isEmbedded: boolean;
    isTouch: boolean;
  }

  interface Window {
    __LAZY_DEV_DATA__: {
      theme: {
        mode: Theme;
        setPreferredTheme: (theme: Theme) => void;
      };
      detectDevice: DetectDevice;
    };
  }
}

// TypeScript 컴파일러는 고유의 컴파일 규칙을 따라서 export/import 구문이 없는 파일을 모듈이 아닌 스크립트로 취급함
// 가짜 export를 넣어서 외부 모듈로 인식되게 함
export {};
