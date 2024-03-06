import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { MoonIcon, SunIcon } from "./icons";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme | undefined>();
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    window.__LAZY_DEV_DATA__.theme.setPreferredTheme(newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    setTheme(window.__LAZY_DEV_DATA__.theme.mode);
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      window.__LAZY_DEV_DATA__.theme.setPreferredTheme(e.matches ? "dark" : "light");
      setTheme(e.matches ? "dark" : "light");
    };

    mql.addEventListener("change", handleChange);
    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, []);

  // 초기 렌더링은 컴파일 시점에 cloud에서 발생하므로, theme에 정확한 값을 얻을 수 없습니다.
  // React가 무엇을 렌더링해야 하는지 알 때까지 렌더링을 지연시킵니다.
  // 또한 레이아웃 시프트가 발생하지 않도록 Fallback UI를 렌더합니다.
  if (!theme) return <div className="size-36pxr animate-pulse rounded-full bg-all-custom-gray" />;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-primary relative size-36pxr rounded-[50%] foldable:size-24pxr"
      aria-label={`Activate ${theme} mode`}
      title={`Activate ${theme} mode`}
    >
      <motion.div
        tabIndex={-1}
        initial={false}
        animate={{
          rotate: isDarkTheme ? 0 : 45,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileTap={{ scale: 0.95 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {isDarkTheme ? <SunIcon /> : <MoonIcon className="-rotate-45" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
