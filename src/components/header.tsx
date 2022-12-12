import * as React from 'react';

import { Link } from 'gatsby';
import tw from 'twin.macro';

type Theme = 'dark' | 'light';

const ToggleMode = () => {
  let websiteTheme: Theme;
  if (typeof window !== `undefined`) {
    websiteTheme = window.__theme;
  }
  React.useEffect(() => {
    setTheme(window.__theme);
  }, []);

  // @ts-ignore
  const [theme, setTheme] = React.useState(websiteTheme || 'dark');

  const ThemeToggle = () => {
    window.__setPreferredTheme(websiteTheme === 'dark' ? 'light' : 'dark');
    setTheme(websiteTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button className="button" onClick={ThemeToggle}>
      {theme === 'dark' ? 'dark' : 'light'}
      {/* {theme === 'dark' ? <img src={sun} alt="Light mode" /> : <img src={moon} alt="Dark mode" />} */}
    </button>
  );
};

interface Props {
  children: React.ReactNode;
  size?: 'medium' | 'large';
}

const Header = ({ children, size = 'medium' }: Props) => {
  let header = (
    <Link css={tw`no-underline text-24pxr`} to="/">
      {children}
    </Link>
  );

  if (size === 'large') {
    header = <ToggleMode />;
    // <h1 css={tw`m-0pxr text-40pxr`}>
    //   <Link to="/">{children}</Link>
    // </h1>
  }

  return <header css={tw`font-bold mb-48pxr`}>{header}</header>;
};

export default Header;
