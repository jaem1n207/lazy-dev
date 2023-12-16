import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { MoonIcon, SunIcon } from './icons';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(undefined);

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    window.__LAZY_DEV_DATA__.theme.setPreferredTheme(isDarkMode ? 'light' : 'dark');
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const hasDarkModeClass = root.classList.contains('dark');
    hasDarkModeClass ? setTheme('dark') : setTheme('light');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        window.__LAZY_DEV_DATA__.theme.setPreferredTheme('dark');
        setTheme('dark');
      } else {
        window.__LAZY_DEV_DATA__.theme.setPreferredTheme('light');
        setTheme('light');
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  // 초기 렌더링은 컴파일 시점에 클라우드에서 발생하므로 theme는 초기에 undefined입니다.
  // 따라서 좋은 UX를 위해 React가 무엇을 렌더링해야 하는지 알 때까지 렌더링을 지연시킵니다.
  // 레이아웃 이동이 되지 않도록 Fallback UI를 렌더합니다.
  if (!theme)
    return <div className="h-36pxr w-36pxr animate-pulse rounded-full bg-all-custom-gray" />;

  return (
    <>
      <button
        onClick={toggleTheme}
        className="focus-primary relative h-36pxr w-36pxr rounded-[50%] foldable:h-24pxr foldable:w-24pxr"
        aria-label={`Activate ${isDarkMode ? 'light' : 'dark'} mode`}
        title={`Activate ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: isDarkMode ? 0 : 45,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          whileTap={{ scale: 0.95 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon className="-rotate-45" />}
        </motion.div>
      </button>
    </>
  );
};

export default ThemeToggle;
