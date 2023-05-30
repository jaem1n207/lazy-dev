import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import NoneActiveWrapper from './common/none-active-wrapper';

const variants = {
  hidden: { opacity: 0, rotate: 180 },
  show: { opacity: 1, rotate: 0 },
};

const SunIcon: React.FC<{ className?: string; size?: number }> = ({ className, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={classNames('icon icon-tabler icon-tabler-sun', className)}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#ffec00"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="4" />
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
  </svg>
);

const MoonIcon: React.FC<{ className?: string; size?: number }> = ({ className, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={classNames('icon icon-tabler icon-tabler-moon-stars', className)}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#FFEF60"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
    <path d="M19 11h2m-1 -1v2" />
  </svg>
);

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(undefined);

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    window.__setPreferredTheme(isDarkMode ? 'light' : 'dark');
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.contains('dark') ? setTheme('dark') : setTheme('light');

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          root.classList.contains('dark') ? setTheme('dark') : setTheme('light');
        }
      }
    });

    observer.observe(root, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // 초기 렌더링은 컴파일 시점에 클라우드에서 발생하므로 theme는 초기에 undefined입니다.
  // 따라서 좋은 UX를 위해 React가 무엇을 렌더링해야 하는지 알 때까지 렌더링을 지연시킵니다.
  if (!theme) return null;

  return (
    <NoneActiveWrapper>
      <button
        onClick={toggleTheme}
        className="relative w-50pxr h-50pxr"
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
              variants={variants}
              className="absolute inset-0pxr"
            >
              <MoonIcon size={36} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={variants}
              className="absolute inset-0pxr"
            >
              <SunIcon size={36} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </NoneActiveWrapper>
  );
};

export default ThemeToggle;
