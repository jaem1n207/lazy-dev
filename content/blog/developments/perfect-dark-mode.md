---
title: React에서 다크 모드 완벽하게 구현하기
date: "2024-04-30 16:58:30"
category: developments
tags:
  - accessibility
  - theme
  - zustand
keywords: []
authorId: jaemin
thumbnail: ../thumbnails/react.png
summary: >-
  react에서 zustand와 useSyncExternalStore 훅을 이용해 다크 모드를 완벽하게 구현하는 방법을 설명합니다. 또한 사용자가 "애니메이션 줄이기"를 선호하는지 여부를 결정하는 훅을 구현해 애니메이션을 비활성화하는 작업을 수행하는 방법을 알아봅니다.
---

## 사용자의 시스템 테마 설정 가져오기

`prefers-color-scheme` 미디어 쿼리와 `matchMedia` 를 함께 사용해 사용자의 시스템 테마가 `dark` 로 설정되어 있는지 확인합니다.

이 코드에서 핵심은 `useSyncExternalStore` 훅을 사용해 외부의 다크 모드 설정을 React 상태와 동기화한다는 것입니다. 예를 들어, 사용자가 시스템 설정을 다크 모드로 변경하면, 이를 감지해 웹앱의 테마도 다크 모드로 자동으로 전환되도록 하는 것입니다. `useSyncExternalStore` 훅을 잘 모른다면 대충 아래 두 가지 작업을 수행한다고 생각하면 됩니다:

1. 외부 저장소의 모든 변경 사항을 감지합니다.
2. React18의 동시성 렌더링에서 동일한 저장소에 대해 동일한 데이터(UI)가 렌더링되도록 합니다. - Tearing 방지

이 훅이 동작하는 방식에 대해선 [JSer.dev](http://jser.dev/2023-08-02-usesyncexternalstore) 님의 블로그를 확인해주세요.

```tsx
const MEDIA = "(prefers-color-scheme: dark)";

const subscribeSystemDark = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(MEDIA);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const getSystemDarkSnapshot = () => {
  return window.matchMedia(MEDIA).matches;
};

const getServerSnapshot = () => {
  return undefined;
};

export const useSystemDark = () => {
  return useSyncExternalStore(subscribeSystemDark, getSystemDarkSnapshot, getServerSnapshot);
};
```

## 다크모드 설정 훅

```tsx
import { isDarkMode, mergeDefaultOptions, type Options, type Theme } from "~/entities/theme/lib";
import { useSystemDark } from "~/entities/theme/model/use-system-dark";

export const useDark = (options?: Options) => {
  const { storageKey } = mergeDefaultOptions(options);

  const [theme, setTheme] = useLocalStorageState<Theme>(storageKey, {
    defaultValue: "system",
  });
  const isSystemDark = useSystemDark();

  const isDark = useMemo(() => isDarkMode(theme, isSystemDark), [theme, isSystemDark]);

  const toggleDark = () => {
    theme === "system" ? setTheme(isSystemDark ? "light" : "dark") : setTheme("system");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);

    if ((theme === "dark" && isSystemDark) || (theme === "light" && !isSystemDark)) {
      setTheme("system");
    }
  }, [isDark, isSystemDark, setTheme, theme]);

  return { isDark, toggleDark };
};
```

사용자의 시스템 테마 설정과 웹앱의 다크 모드 설정을 관리하기 위해 `useDark` 훅을 구현했습니다. 이 훅은 localStorage 상태를 사용하여 사용자가 선호하는 테마를 기억하고, 시스템의 테마 설정에 따라 자동으로 테마를 전환하는 기능을 포함하고 있었습니다. 눈치 채셨겠지만 이 훅은 여러 컴포넌트에서 사용할 때 예상과 다르게 동작하는 문제가 발생합니다. 아래 [다크모드 설정 훅 리팩토링](https://lazy-dev.netlify.app/developments/perfect-dark-mode/#%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EC%84%A4%EC%A0%95-%ED%9B%85-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81) 섹션에서 문제점과 해결 방법을 소개하겠습니다.

## 테마 커스터마이징

```tsx
export const ThemeCustomizer = () => {
  const [config, setConfig] = useLocalStorageState<Config>('config', {
    defaultValue: DEFAULT_CONFIG,
  });

  const handleConfigChange = (key: keyof Config, value: Config[keyof Config]) => {
    if (typeof value === 'string' && key === 'theme') {
      document.body.classList.remove(`theme-${config?.theme}`);
      document.body.classList.add(`theme-${value}`);
    } else if (typeof value === 'number' && key === 'radius') {
      document.body.style.setProperty('--radius', `${value}rem`);
    }

    if (config === undefined) {
      return setConfig(DEFAULT_CONFIG);
    }
    setConfig({ ...config, [key]: value });
  };
  ...
};
```

기존엔 `config` 값을 변경하는 핸들러에서 body의 속성을 함께 설정해주고 있었습니다.

## 화면 깜빡임 개선

브라우저에서 로드된 페이지 스타일이 사용자의 기본 설정과 일치하지 않는 경우 깜박임 현상이 발생합니다. 이는 페이지가 로드되기 전에 스크립트를 삽입해 첫 렌더링 시에 사용자의 설정에 맞는 테마가 표시되도록 하면 됩니다.

브라우저를 렌더링하는 과정을 이해하면 쉽게 할 수 있습니다. 브라우저는 렌더링 과정 중에 스크립트 태그를 만나면 해당 코드를 처리할 때까지 렌더링을 중단합니다. 따라서 스크립트 태그를 body 콘텐츠 앞에 삽입하면 됩니다.

```jsx
// dist/options/index.html
<!doctype html>
<html lang="en">
  <head>
    ...
    <style>
      html.dark {
        color-scheme: dark;
      }
    </style>
	  <script type="module" src="/dist/themeSync.js"></script>
  </head>
  <body>
    ...
  </body>
</html>

// /dist/themeSync.js
var e = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
  t = localStorage.getItem('theme') || 'system';
('"dark"' === t || (e && '"light"' !== t)) && document.documentElement.classList.toggle('dark', !0);

var configItem = localStorage.getItem('config');
var { theme = 'neutral', radius = 0.5 } = configItem ? JSON.parse(configItem) : {};
document.body.classList.add(`theme-${theme}`);
document.body.style.setProperty('--radius', `${radius}rem`);
```

이제 사용자는 스크립트 실행이 완료된 후 자신에게 올바른 스타일 업데이트가 적용된 화면을 보기 때문에 깜빡임 현상이 발생하지 않습니다.

## 테마 전환 애니메이션

테마가 전환될 때 색상이 부드럽게 변경되는 애니메이션과 테마 아이콘에 간단한 애니메이션을 줬습니다.

```tsx
// 테마가 전환될 때 색상이 부드럽게 변경되는 버튼
<Button className="transition-colors">
  ...
</Button>

// 회전하는 애니메이션을 가진 테마 토글 버튼
<button type="button" onClick={toggleTheme} className="flex">
	<div className="i-lucide-sun scale-100 dark:scale-0 transition-transform duration-300 rotate-0 dark:-rotate-90" />
	<div className="i-lucide-moon absolute scale-0 dark:scale-100 transition-transform duration-300 rotate-90 dark:rotate-0" />
	<span className="sr-only">Toggle theme</span>
</button>
```

애니메이션을 개발할 때 절대 잊지 말아야 할 사실이 있습니다. 애니메이션으로 인한 광과민성 간질 발작, 편두통 등이 발생할 수 있거나 눈이 쉽게 피로해지는 저시력 시각장애인 사용자처럼 일부 사용자를 위해 애니메이션 여부를 제어할 수 있도록 제공해야 합니다.

그럼 무엇을 기준으로 애니메이션을 비활성화해야 할까요? 다행히 모든 주요 OS에서는 접근성 설정에서 “애니메이션 줄이기” 설정을 사용할 수 있습니다. 이 설정을 활성화하면 모든 애니메이션(ex: MacOS에서 요술램프 지니 최소화 효과)을 비활성화합니다. Apple은 미디어 쿼리인 `prefers-reduced-motion` 을 사용해 브라우저에 해당 설정을 노출하기 시작했습니다. 이렇게 하면 웹사이트에서 이 미디어 쿼리를 이용해 명시적으로 애니메이션을 비활성화할 수 있습니다.

바람직한 멘탈 모델은 애니메이션 없이 시작하고 사용자가 원할 경우 애니메이션을 활성화하도록 CSS를 구성하는 것입니다. 또는 전역 스타일로 아래와 같이 구성할 수 있습니다:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    -webkit-animation-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    -webkit-animation-iteration-count: 1 !important;
    animation-iteration-count: 1 !important;
    -webkit-transition-duration: 0.01ms !important;
    -o-transition-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

위 코드는 애니메이션이 전적으로 CSS로 동작(eg. transitions, keyframe animations)하면 잘 실행됩니다. 하지만 JS에서 애니메이션을 실행하면 의도한 대로 동작하지 않습니다. 오히려 정반대의 효과를 가져와 애니메이션이 매우 빠르게 동작합니다. CSS를 통해서만 애니메이션을 만들 수 없는 유형이 있습니다. 예를 들어 배경 영상의 자동 재생, 커서 좌표에 따른 애니메이션 등이 있습니다.

이 경우, 사용자가 “애니메이션 줄이기” 설정 여부를 파악해서 직접 로직에서 애니메이션이 실행되지 않도록 해야 합니다. 그래서 사용자가 OS에서 “애니메이션 줄이기” 체크박스를 토글하면 콜백 함수를 실행해 React 라이프사이클에 연결하는 훅을 구현했습니다:

```tsx
const QUERY = "(prefers-reduced-motion: reduce)";

const subscribePrefersReducedMotion = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const getPrefersReducedMotionSnapshot = () => {
  return window.matchMedia(QUERY).matches;
};

const getServerSnapshot = () => {
  return undefined;
};

export const usePrefersReducedMotion = () => {
  return useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotionSnapshot,
    getServerSnapshot,
  );
};
```

그리고 이 훅으로 JS로 애니메이션을 적용한 요소도 쉽게 제어할 수 있습니다:

```tsx
export const Sidebar = ({ isOpen }) => {
  const shouldReduceMotion = usePrefersReducedMotion();
  const closedX = shouldReduceMotion ? 0 : "-100%";

  return (
    <motion.div
      animate={{
        opacity: isOpen ? 1 : 0,
        x: isOpen ? 0 : closedX,
      }}
    />
  );
};
```

그리고 화면이 모두 그려지기 전에 사용자의 OS 설정 값을 받아와 CSS로 동작하는 애니메이션을 비활성화하는 스크립트를 적용해두었습니다:

```jsx
// prefersReducedMotion.js
const handleReduceMotionChange = () => {
  const QUERY = '(prefers-reduced-motion: reduce)';
  const prefersReducedMotionQuery = window.matchMedia(QUERY);
  let styleElement = null;

  const applyStyles = () => {
    if (styleElement) return;
    styleElement = document.createElement('style');
    styleElement.textContent = \`* {-webkit-animation-duration: 0.01ms !important;animation-duration: 0.01ms !important;-webkit-animation-iteration-count: 1 !important;animation-iteration-count: 1 !important;-webkit-transition-duration: 0.01ms !important;-o-transition-duration: 0.01ms !important;transition-duration: 0.01ms !important;scroll-behavior: auto !important;}\`;
    document.head.appendChild(styleElement);
  };

  const removeStyles = () => {
    if (!styleElement) return;
    document.head.removeChild(styleElement);
    styleElement = null;
  };

  const toggleReduceMotion = (event) => {
    if (event.matches) {
      applyStyles();
    } else {
      removeStyles();
    }
  };

  prefersReducedMotionQuery.matches && applyStyles();

  prefersReducedMotionQuery.addEventListener('change', toggleReduceMotion);
};

handleReduceMotionChange();

// index.html
<html>
  <head>
    <script type="module" src="/dist/prefersReducedMotion.js"></script>
  </head>
<body>
</body>
</html>
```

`prefersReducedMotion.js` 파일은 사용자가 사용자가 “애니메이션 줄이기”를 활성화했을 때만 필요합니다. 최하단의 [렌더링 최적화](https://lazy-dev.netlify.app/developments/perfect-dark-mode/#%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94) 섹션에서 자세히 설명하겠습니다.

## 다크모드 설정 훅 리팩토링

위에서 구현한 `useDark` 훅은 여러 컴포넌트에서 사용할 때 의도한 바와 다르게 동작한다고 했습니다. 예를 들어 아래와 같이 사용하려 할 때 발생합니다:

```tsx
// theme-customizer.tsx
import { useDark } from '~/entities/theme';

export const ThemeCustomizer = () => {
  const { isDark } = useDark();

  return (
    <Button
      style={
        {
           '--theme-primary': `hsl(${theme.activeColor[isDark ? 'dark' : 'light']})`,
        }
      }
    >
      ...
    </Button>
  );
};

// appearance-switch.tsx
import { useDark } from '~/entities/theme';

export const AppearanceSwitch = () => {
  const { toggleTheme } = useDark();

  return (
    <Button onClick={toggleTheme}>...</Button>
  );
};
```

`AppearanceSwitch` 컴포넌트에서 `toggleTheme` 함수를 호출하여 `isDark` 상태를 변경하면, `ThemeCustomizer` 컴포넌트에서는 이 변경 사항을 감지하지 못하는 현상이 발생합니다.

이는 `useDark` 훅이 각 컴포넌트 인스턴스에 대해 **별도의 상태를 유지**하고 있기 때문입니다. 이는 React의 상태 관리가 컴포넌트 범위 내에서 독립적으로 이루어지기 때문에 발생하는 일반적인 문제입니다. 따라서 한 컴포넌트에서 상태를 변경해도 다른 컴포넌트의 상태는 업데이트되지 않습니다.

이 문제를 해결하기 위해 상태 관리 라이브러리인 `zustand`를 도입했습니다. `zustand`는 React 컴포넌트 범위를 넘어서 상태를 공유할 수 있는 전역 상태 관리 문제를 해결합니다. 이를 통해 모든 컴포넌트에서 동일한 상태를 참조하고, 상태 변경이 발생하면 관련된 모든 컴포넌트가 자동으로 리렌더링되도록 할 수 있습니다 [Persist](https://docs.pmnd.rs/zustand/integrations/persisting-store-data) 미들웨어를 사용하면 zustand 상태를 스토리지에 저장하여 데이터를 기억할 수 있습니다.

`useThemeStore`를 사용하여 테마 상태를 전역에서 관리하고, `useDark` 훅 내에서 이 상태를 사용하도록 변경했습니다:

```tsx
// use-theme-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Theme } from '~/entities/theme/types';

interface ThemeState {
  theme: Theme;
  isSystemDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      isSystemDark: false,
      toggleTheme: () => {
        const { theme, isSystemDark } = get();
        if (theme === 'system') {
          set({ theme: isSystemDark ? 'light' : 'dark' });
        } else {
          set({ theme: 'system' });
        }
      },
    }),
    {
      name: 'theme',
    },
  ),
);

// use-dark.ts
import { useThemeStore } from '~/entities/theme';
import { useSystemDark } from '~/entities/theme/model/use-system-dark';
import type { Theme } from '~/entities/theme/types';

const isDarkMode = (theme?: Theme | null, isSystemDark?: boolean | null) => {
  return theme === 'dark' || (!!isSystemDark && theme !== 'light');
};

export const useDark = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isSystemDark = useSystemDark();

  useEffect(() => {
    useThemeStore.setState({ isSystemDark });
  }, [isSystemDark]);

  const isDark = useMemo(() => isDarkMode(theme, isSystemDark), [theme, isSystemDark]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    if ((theme === 'dark' && isSystemDark) || (theme === 'light' && !isSystemDark)) {
      toggleTheme();
    }
  }, [isDark, theme, isSystemDark, toggleTheme]);

  return { isDark, toggleTheme };
};

```

이제 `AppearanceSwitch` 컴포넌트에서 `toggleTheme`함수를 호출하면 `ThemeCustomizer` 컴포넌트도 새로운 `isDark` 상태를 인지하고 UI를 적절히 업데이트합니다.

### 왜 zustand를 사용했을까요?

React는 기본적으로 컴포넌트 트리 전체에 데이터를 제공할 수 있는 `Context API`를 제공합니다. 이 API는 앱의 크기가 크지 않다면 매우 편하고 유용합니다. 하지만 앱이 커진다면 성능 문제가 발생할 수 있습니다. context 값에 변경 사항이 있을 때마다 useContext가 다시 렌더링합니다. 중요한 건 값의 일부가 렌더에 사용되지 않아도 발생하는 것입니다. 이는 [의도된 것](https://github.com/facebook/react/issues/14110)이며 만약 useContext가 조건부로 리렌더링을 트리거한다면 재사용할 수 없는 hook이 됩니다.

useContext 훅의 리렌더링을 방지할 수 있는 세 가지 방법이 있습니다.

간단한 예를 들어보겠습니다. `바르셀로나`와 `레알 마드리드`의 팀 멤버를 가진 객체가 있습니다:

```tsx
const initialFirstTeamMembers = {
  barca: ["messi", "suarez", "neymar"],
  madrid: ["ronaldo", "bale", "benzema"],
};
```

useReducer 훅에 전달한 reducer를 정의합니다:

```tsx
const reducer = (state: typeof initialFirstTeamMembers, action: Action): State => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        [action.team]: [...state[action.team], action.player],
      };
    case "remove":
      return {
        ...state,
        [action.team]: state[action.team].filter((player) => player !== action.player),
      };
    default:
      return state;
  }
};
```

Context Provider는 다음과 같습니다:

```tsx
const FirstTeamMembersContext = createContext(undefined);

const useFirstTeamMembers = () => {
  const context = useContext(FirstTeamMembersContext);

  if (context === undefined) {
    throw new Error("useFirstTeamMembers must be used within a FirstTeamMembersProvider");
  }

  return context;
};

const FirstTeamMembersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FirstTeamMembersContext.Provider value={value}>
      <Barca />
      <Madrid />
    </FirstTeamMembersContext.Provider>
  );
};
```

`Barca` 컴포넌트는 다음과 같이 구현됩니다:

```tsx
export const Barca = () => {
  const [state, dispatch] = useFirstTeamMembers();

  return (
    <>
      <h3>Barcelona</h3>
      <ul>
        {state.barca.map((player) => (
          <li key={player}>
            {player}
            <button onClick={() => dispatch({ type: "remove", team: "barca", player })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
```

`Madrid` 컴포넌트도 이와 유사합니다.

`madrid`의 멤버가 변경되면 `Barca`도 리렌더링되어 이전과 동일한 출력이 생성됩니다. 만약 리렌더링할 컴포넌트가 많을 경우 속도가 느려질 수 있습니다. 이 문제는 [gaearon이 제시](https://github.com/facebook/react/issues/15156#issuecomment-474590693)한 것처럼 다음 세 가지 방법으로 해결할 수 있습니다.

**1. 컨텍스트를 분할합니다**

가장 권장되는 방법입니다. 위 예제를 아래처럼 분할합니다:

```tsx
const initialBarcaState: { barca: Members } = {
  barca: ["messi", "suarez", "neymar"],
};

const initialMadridState: { madrid: Members } = {
  madrid: ["ronaldo", "bale", "modric"],
};
```

그리고 두 개의 reducer와 context를 사용하도록 변경합니다:

```tsx
import { createContext, Dispatch, useContext, useReducer, type ReactNode } from "react";

type Action = { type: "add"; player: string } | { type: "remove"; player: string };

type Members = string[];

const BarcaTeamMembersContext = createContext<[Members, Dispatch<Action>] | undefined>(undefined);

const MadridTeamMembersContext = createContext<[Members, Dispatch<Action>] | undefined>(undefined);

const initialBarcaState: { barca: Members } = {
  barca: ["messi", "suarez", "neymar"],
};

const initialMadridState: { madrid: Members } = {
  madrid: ["ronaldo", "bale", "modric"],
};

const barcaReducer = (state: typeof initialBarcaState, action: Action) => {
  switch (action.type) {
    case "add":
      return { barca: [...state.barca, action.player] };
    case "remove":
      return {
        barca: state.barca.filter((player) => player !== action.player),
      };
    default:
      return state;
  }
};

const madridReducer = (state: typeof initialMadridState, action: Action) => {
  switch (action.type) {
    case "add":
      return { madrid: [...state.madrid, action.player] };
    case "remove":
      return {
        madrid: state.madrid.filter((player) => player !== action.player),
      };
    default:
      return state;
  }
};

export const useBarcaTeamMembers = () => {
  const context = useContext(BarcaTeamMembersContext);
  if (!context) {
    throw new Error("useBarcaTeamMembers must be used within a FirstTeamMembersProvider");
  }
  return context;
};

export const useMadridTeamMembers = () => {
  const context = useContext(MadridTeamMembersContext);
  if (!context) {
    throw new Error("useMadridTeamMembers must be used within a FirstTeamMembersProvider");
  }
  return context;
};

export const BarcaTeamMembersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(barcaReducer, initialBarcaState);

  return (
    <BarcaTeamMembersContext.Provider value={[state.barca, dispatch]}>
      {children}
    </BarcaTeamMembersContext.Provider>
  );
};

export const MadridTeamMembersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(madridReducer, initialMadridState);

  return (
    <MadridTeamMembersContext.Provider value={[state.madrid, dispatch]}>
      {children}
    </MadridTeamMembersContext.Provider>
  );
};

export const FirstTeamMembersProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BarcaTeamMembersProvider>
      <MadridTeamMembersProvider>{children}</MadridTeamMembersProvider>
    </BarcaTeamMembersProvider>
  );
};
```

`Barca` 컴포넌트를 수정하겠습니다:

```tsx
import { useBarcaTeamMembers } from "./TeamProvider";

export const Barca = () => {
  const [state, dispatch] = useBarcaTeamMembers();

  return (
    <>
      <h3>Barcelona</h3>
      <ul>
        {state.map((player) => (
          <li key={player}>
            {player}
            <button onClick={() => dispatch({ type: "remove", player })}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};
```

`Madrid` 컴포넌트도 유사하게 수정하면 됩니다. 이제 Barca 멤버를 변경하면 `Barca` 컴포넌트만 리렌더링됩니다(아래에서 최적화 전/후에 대한 성능 비교를 다룹니다). 그러나 단일 상태로 유지해야 하는 경우에는 이 방법을 사용할 수 없습니다.

남은 방법을 예제와 함께 다 설명하면 길어질 것 같아 간단한 설명과 함께 마치겠습니다. 자세히 알고 싶다면 [Preventing rerenders with React.memo and useContext hook.](https://github.com/facebook/react/issues/15156#issuecomment-474590693) 토론에서 확인해주세요.

두 번재 방법은 컴포넌트를 둘로 나누고 그 사이에 `React.memo`를 사용하는 것입니다. 이 방법도 관용적으로 사용되며 처음 예제에서 Context를 변경할 필요가 없습니다. 여전히 외부 컴포넌트를 리렌더링하지만 복잡한 로직은 React.memo를 사용한 내부 컴포넌트에 있으므로 성능상 문제가 발생하지 않습니다.

세 번째 방법은 `useMemo` 훅으로 컴포넌트를 감싸고 종속성을 지정해 단일 컴포넌트로 유지하는 방법입니다. 컴포넌트는 여전히 리렌더되지만 종속성으로 지정한 값이 동일하다면 자식 컴포넌트는 리렌더되지 않습니다. 하지만 이 방법엔 훅을 쓸 수 없다는 제한 사항이 존재하므로 되도록 권장하진 않습니다.

이제 최적화 전/후 렌더링 성능을 비교해보겠습니다. 성능 비교는 다음과 같이 진행했습니다.

- 비교 대상은 처음 예제와 Context를 분할한 예제입니다.
- 렌더링 성능 비교를 위해 `Barca`와 `Madrid` 컴포넌트는 15,000개의 빈 div 컴포넌트를 자식으로 렌더링합니다.
- m1 Pro 맥북, 크롬 브라우저, 시크릿 모드에서 진행했습니다.

위 컴포넌트를 렌더링하면 아래와 같은 화면이 표시됩니다.

![렌더링 화면](/images/perfect-dark-mode/render-view.webp)

messi(barca) > suarez(barca) > ronaldo(madrid) > neymar(barca) 순서대로 `dispatch` 함수를 호출하고 FlameGraph에 전달해 성능을 측정합니다(react-developer-tools 확장 프로그램을 이용했습니다).

처음 예제의 FlameGraph부터 보겠습니다.

![trigger-rerender-context-flame-graph](/images/perfect-dark-mode/trigger-render-context-flame.gif)

위의 그래프 차트를 보면 messi(barca) 멤버를 제거하면 `Madrid` 컴포넌트는 다시 렌더링 되지 않길 원하지만 `Barca`와 `Madrid` 컴포넌트 모두 리렌더링되었습니다. 렌더링에 소요된 시간은 92.5ms입니다. 만약 복잡한 로직을 처리한다면 렌더링 속도가 훨씬 느려질 것입니다. Context API가 앱이 커지면 문제가 발생할 수 있는 이유입니다.

이제 첫 번째 방법으로 최적화한 예제의 FlameGraph를 보겠습니다.

![split-context-flame-graph](/images/perfect-dark-mode/split-context-flame.gif)

최적화 후의 차트를 보면 리렌더링이 필요한 컴포넌트만 렌더링 큐에 들어가 실행된 것을 확인할 수 있습니다. 렌더링에 소요된 시간도 41.6ms로 최적화 전에 비하면 약 55% 빠릅니다.

하지만 Context API는 위 첫 번째 최적화 예제 코드에서 볼 수 있듯 성능 작성할 코드가 적지 않습니다. Context를 이용해 작업하다 앱이 커지면 `Provider` 간의 암시적인 종속성도 생길 수 있고, 스토리북 및 단위 테스트에 대해서도 Context Provider 종속성이 발생합니다. 이는 개발자 경험에 좋지 않죠.

그렇다고 Context API를 사용하는 게 무조건 나쁘다는 것은 아닙니다. 모든 기술이 그렇듯 상황에 따라 다릅니다. [React 팀은 Context API를 A가 B의 존재에 의존하는 복합 컴포넌트에만 사용하도록 권장](https://twitter.com/sebmarkbage/status/1219836431972978689)합니다(ex: List > ListItem).

`zustand`를 사용하면 리렌더링 문제를 몇 줄 안 되는 코드로 해결할 수 있습니다. 파생 상태도 쉽게 만들 수 있고요. zustand를 사용하도록 수정해보겠습니다.

```tsx
export const useBarcaTeamStore = create<BarcaState>((set) => ({
  barca: ["messi", "suarez", "neymar"],
  addPlayer: (player) => set((state) => ({ barca: [...state.barca, player] })),
  removePlayer: (player) => set((state) => ({ barca: state.barca.filter((p) => p !== player) })),
}));

export const useMadridTeamStore = create<MadridState>((set) => ({
  madrid: ["ronaldo", "bale", "modric"],
  addPlayer: (player) => set((state) => ({ madrid: [...state.madrid, player] })),
  removePlayer: (player) => set((state) => ({ madrid: state.madrid.filter((p) => p !== player) })),
}));
```

Provider로 감쌀 필요도 없습니다. 단순히 store를 만드는 함수를 호출해 상태의 초기값과 이를 변경하는 함수를 정의하면 됩니다. 그리고 `Barca` 컴포넌트를 아래처럼 수정해줍니다.

```tsx
export const Barca = () => {
  const { barca, removePlayer } = useBarcaTeamStore();

  return (
    <>
      <h3>Barcelona</h3>
      <ul>
        {barca.map((player) => (
          <li key={player}>
            {player}
            <button onClick={() => removePlayer(player)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};
```

`Madrid` 컴포넌트도 유사하게 수정합니다. 이제 FlameGraph를 보겠습니다.

![zustand-flame-graph](/images/perfect-dark-mode/zustand-flame.gif)

리렌더링이 필요한 컴포넌트만 렌더링 큐에 들어가 실행된 것을 확인할 수 있습니다.

이처럼 zustand를 사용하면 Context API에 비해 굉장히 간결해진 코드로 좋은 성능을 낼 수 있습니다. 특히 localStorage도 활용하는 현재 문제에 `jotai` 또는 `zustand`가 적합하다 생각했습니다. 그 중 생태계가 더 활성화되어 있는 `zustand`를 선택했습니다.

## 렌더링 최적화

위에서 `prefersReducedMotion.js` 파일을 만들어 사용자가 “애니메이션 줄이기” 설정을 토글하는 걸 감지해서 활성화하면 애니메이션을 비활성화하는 스타일을 적용하도록 했습니다. 생각해보면 “애니메이션 줄이기” 설정을 비활성화한 사용자에게 `prefersReducedMotion.js` 파일을 전달하는 것은 리소스 낭비입니다. 필요할 때만 js를 로드하는 게 좋습니다.

물론 이 파일의 용량이 적고 처리하는 데 많은 시간이 걸리지 않으므로 이 최적화 작업은 필요 없을 수 있습니다. 그럼에도 하는 이유는 이러한 최적화 작업을 이렇게 작은 곳에서부터 적용해보며 익히는 것입니다. 다양한 시도를 부담없이 적용하는 데 사이드 프로젝트 만한 게 없습니다. 😎

그럼 js 파일을 필요할 때만 불러오면 어떤 이점이 있을까요? 브라우저는 HTML을 읽다가 (defer, async 속성이 없는)스크립트 태그를 만나면 스크립트를 먼저 실행해야 하므로 DOM 생성을 중단합니다. 다운받고 실행한 후에야 남은 페이지를 처리합니다. 스크립트가 굉장히 크다면 어떻게 될까요? 사용자는 스크립트가 처리되는 동안 빈 화면을 보고 있어야 합니다. 여러 가지 최적화 방법이 있습니다. 스크립트 태그에 defer 또는 async 속성을 추가한다던가, 스크립트 크기가 작은 경우엔 외부 스크립트를 인라인 스크립트로 변경해서 불필요한 네트워크 왕복을 방지한다던가, 필요할 때만 동적 로드하는 방법이 있겠네요. 간단하게 하나씩 살펴보겠습니다.

### defer 속성

`defer` 속성은 스크립트를 ‘백그라운드’에서 다운로드합니다. 따라서 스크립트를 다운로드 하는 도중에도 HTML 파싱이 멈추지 않습니다. 단, **DOM이 준비된 후에 스크립트가 실행되고 `DOMContentLoaded` 이벤트 발생 전에 실행**됩니다:

```jsx
<p>...스크립트 앞 콘텐츠...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("`defer` 스크립트가 실행된 후, DOM이 준비되었습니다!"));
</script>

<script defer src="long.js"></script>

<p>...스크립트 뒤 콘텐츠...</p>
```

1. defer 스크립트는 DOM 생성을 막지 않으므로 페이지 콘텐츠가 바로 표시됩니다.
2. `DOMContentLoaded` 이벤트는 defer 스크립트 실행을 기다립니다. 따라서 alert 창은 DOM 트리가 완성되고 defer 스크립트가 실행된 후에 나타납니다.

또한 defer 스크립트는 일반 스크립트와 마찬가지로 **HTML에 추가된 순으로 실행**됩니다:

```jsx
<script defer src="long.js"></script>
<script defer src="small.js"></script>
```

브라우저는 성능을 위해 페이지에 정의된 스크립트 태그를 모두 살펴보고 스크립트를 병렬로 받습니다. 위 예시에서도 스크립트가 병렬로 다운되었습니다. 이 때 크기가 더 작은 `small.js`가 `long.js`보다 먼저 다운로드 될 수 있습니다.

하지만 스크립트를 문서에 추가한 순서대로 실행하기 때문에 `small.js`는 `long.js`다음에 실행됩니다.

### async 속성

`async` 속성은 스크립트를 페이지와 완전히 독립적으로 동작하도록 합니다. 따라서 `defer`와 마찬가지로 스크립트를 다운로드 하는 도중에도 HTML 파싱이 멈추지 않습니다. 단, DOM이 준비되지 않았어도 실행이 됩니다(실행중에는 HTML 파싱이 멈춥니다). `DOMContentLoaded` 이벤트와 async 스크립트는 서로를 기다리지 않습니다.

이런 특징 때문에 async 스크립트가 여러 개 있다면 실행 순서를 보장할 수 없습니다. 다운로드가 먼저 끝난 스크립트가 실행됩니다:

```jsx
<p>...스크립트 앞 콘텐츠...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM이 준비 되었습니다!"));
</script>

<script async src="long.js"></script>
<script async src="small.js"></script>

<p>...스크립트 뒤 콘텐츠...</p>
```

1. async 스크립트는 DOM 생성을 막지 않으므로 페이지 콘텐츠가 바로 표시됩니다.
2. `DOMContentLoaded` 이벤트는 상황에 따라 async 스크립트 전이나 후에 실행됩니다. 정확한 순서는 예측할 수 없습니다.
3. async 스크립트는 서로를 기다리지 않습니다. `small.js`가 `long.js`보다 먼저 다운로드되었기 때문에 먼저 실행됩니다.

따라서 `async`와 `defer`를 적절히 사용하면 사용자가 오래 기다리지 않고 페이지 콘텐츠를 볼 수 있게 할 수 있습니다. 보통 `defer`의 경우 DOM 전체를 다루는 것처럼 실행 순서가 중요한 스크립트에 적용합니다. `async`는 방문자 수 카운터나 광고 관련 스크립트같이 독립적인 스크립트처럼 실행 순서가 중요하지 않은 스크립트에 적용합니다.

### 인라인 스크립트

외부 스크립트를 그냥 사용하면 JS를 가져올 때까지 브라우저는 기다립니다. 이로 인해 페이지가 렌더링 되기 전에 한 번 이상의 네트워크 왕복이 추가될 수 있습니다. 외부 스크립트의 크기가 작은 경우 스크립트를 직접 HTML 문서에 삽입하여 네트워크 요청 지연을 방지할 수 있습니다:

```jsx
// index.html
<html>
  <head>
    <script type="text/javascript" src="small.js"></script>
  </head>
  <body></body>
</html>;

// small.js
const add = (a, b) => a + b;

// 위를 아래와 같이 인라인으로 스크립트 삽입
<html>
  <head>
    <script type="text/javascript">const add = (a, b) => a + b;</script>
  </head>
  <body></body>
</html>;
```

인라인 스크립트로 변경하면 `small.js`의 외부 요청이 없어져서 브라우저에서 빠르게 첫 렌더링을 진행할 수 있게 됩니다. 하지만 동일한 스크립트를 여러 페이지에 삽입해야 한다면 이는 좋지 않은 방법입니다. `async`나 `defer`속성을 이용해 볼 수 있겠네요.

### 동적 로드

동적 로드는 `async` 스크립트처럼 동작합니다. 그 어떤 것도 기다리지 않고 그 어떤 것도 동적 스크립트를 기다리지 않죠. 실행 순서도 보장할 수 없습니다. 문서에 추가된 순서대로 실행되도록 하려면 아래처럼 생성한 스크립트 태그에 `async`속성을 false로 하면 됩니다:

```jsx
const dynamicLoadScript = (src) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = false;
  document.body.append(script);
};

// async=false이기 때문에 long.js가 먼저 실행됩니다.
loadScript("long.js");
loadScript("small.js");
```

### 현재 상황에 적용해보기

사용자가 “애니메이션 줄이기” 설정을 활성화했을 때만 `prefersReducedMotion.js` 파일을 다운로드해서 실행하도록 해보겠습니다. 또한 사용자의 “애니메이션 줄이기” 설정 변경에도 반응할 수 있도록 합니다:

```tsx
// dynamicLoadScript.js
const QUERY = "(prefers-reduced-motion: reduce)";
const prefersReducedMotionQuery = window.matchMedia(QUERY);

const handleReduceMotionChange = async () => {
  if (prefersReducedMotionQuery.matches) {
    await import("/dist/prefersReducedMotion.js");
  }
};

handleReduceMotionChange();

prefersReducedMotionQuery.addEventListener("change", handleReduceMotionChange);
```

그리고 기존 HTML 문서의 스크립트 태그를 수정합니다.

```diff
- <script type="module" src="/dist/prefersReducedMotion.js"></script>
+ <script type="module" src="/dist/dynamicLoadScript.js"></script>
```

이제 필요할 때만 스크립트 파일을 가져오므로 리소스를 절약할 수 있게 되었습니다. 아래 gif에서 “애니메이션 줄이기”를 활성화하면 필요한 js 파일을 가져오고 버튼의 색상이 천천히 전환되는 효과와 테마 버튼을 토글할 때 회전하는 애니메이션이 비활성화되는 것을 확인할 수 있습니다:

![동적 스크립트 예시](/images/perfect-dark-mode/reduced-motion.gif)

## 요약

글을 작성하다보니 전역 상태 관리나 애니메이션에 대한 접근성도 함께 다루고 싶어 생각보다 길어졌네요. React를 활용한 프로젝트에서 다크 테마를 적용하려면 신경 쓸 게 꽤 많습니다. 실무에서 부족한 개발 시간 때문에 라이브러리를 사용해 구현하던 것들을 사이드 프로젝트에서 직접 구현하면서 많은 것을 배우는 것 같습니다. 만약 막히더라도 이미 잘 구현되어 있는 라이브러리의 코드를 참고하면 되니 부담없이 도전할 수 있고요. 이런 점들이 사이드 프로젝트를 끊을 수 없는 이유인 것 같습니다.

## 참고

- https://www.joshwcomeau.com/react/prefers-reduced-motion/
- https://ko.javascript.info/script-async-defer
