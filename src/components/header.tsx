import React, { ReactNode, useEffect, useState } from 'react';

import { window } from 'browser-monads-ts';
import { Link } from 'gatsby';
import Switch from 'react-switch';
import tw from 'twin.macro';

import { ROUTES } from 'Types/enum';

import { ContentSpacer } from './common';

type Theme = 'dark' | 'light';

const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-moon-stars"
    width="24"
    height="24"
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

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-sun"
    width="24"
    height="24"
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

const ToggleMode = () => {
  let websiteTheme: Theme;
  websiteTheme = window.__theme;
  useEffect(() => {
    setTheme(window.__theme);
  }, []);

  // @ts-ignore
  const [theme, setTheme] = useState(websiteTheme || 'dark');

  const ThemeToggle = () => {
    window.__setPreferredTheme(websiteTheme === 'dark' ? 'light' : 'dark');
    setTheme(websiteTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <label htmlFor={theme}>
      <Switch
        width={50}
        height={24}
        activeBoxShadow="0 0 2px 3px #ffa7c4"
        onColor="#1A202C"
        offColor="#0F1114"
        onChange={ThemeToggle}
        checked={theme === 'dark'}
        checkedIcon={<Moon />}
        uncheckedIcon={<Sun />}
        id={theme}
        aria-label="Toggle dark mode"
      />
    </label>
  );
};

interface Props {
  children: ReactNode;
  size?: 'medium' | 'large';
}

const Header = ({ children, size = 'medium' }: Props) => {
  let header = (
    <Link css={tw`no-underline text-24pxr`} to={ROUTES.HOME}>
      {children}
    </Link>
  );

  if (size === 'large') {
    header = (
      <h1 css={tw`m-0pxr text-40pxr`}>
        <Link to={ROUTES.HOME}>{children}</Link>
      </h1>
    );
  }

  return (
    <ContentSpacer as="header" className="my-48pxr">
      <div className="flex items-center justify-between mx-auto font-bold max-w-7xl text-neutral-900 dark:text-white">
        {header}
        <ToggleMode />
      </div>
    </ContentSpacer>
  );
};

export default Header;
