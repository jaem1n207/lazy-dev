import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, rotate: 180 },
  show: { opacity: 1, rotate: 0 },
};

const whileHover = {
  rotate: 15,
};

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={classNames('icon icon-tabler icon-tabler-sun', className)}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#1f2028"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="4" />
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={classNames('icon icon-tabler icon-tabler-moon-filled h-full w-full', className)}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#2e3039"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z"
      strokeWidth="0"
      fill="currentColor"
    />
  </svg>
);

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
        <AnimatePresence>
          {isDarkMode ? (
            <motion.div
              key="moon"
              initial="hidden"
              animate="show"
              exit="hidden"
              whileHover={whileHover}
              variants={variants}
              className="absolute inset-0pxr"
            >
              <MoonIcon />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial="hidden"
              animate="show"
              exit="hidden"
              whileHover={whileHover}
              variants={variants}
              className="absolute inset-0pxr"
            >
              <SunIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
};

export default ThemeToggle;