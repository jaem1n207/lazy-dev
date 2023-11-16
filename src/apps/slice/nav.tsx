import React, { FC, startTransition, useCallback } from 'react';

import { Link, SliceComponentProps } from 'gatsby';

import ContentSpacer from 'Apps/common/layout/components/content-spacer';
import { ROUTES } from 'Types/enum';

import ThemeToggle from '../theme-toggle';

const SearchSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-search flex-none stroke-all-custom-gray"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M21 21l-6 -6" />
  </svg>
);

const Nav: FC<SliceComponentProps<{}, { title: string }>> = ({ sliceContext }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const onOpenSearch = useCallback(() => {
    startTransition(() => {
      setShowSearch(true);
    });
  }, []);
  const onCloseSearch = useCallback(() => {
    setShowSearch(false);
  }, []);

  return (
    <>
      {/* <ComboBoxModal isOpen={showSearch} onOpen={onOpenSearch} onClose={onCloseSearch} /> */}
      <ContentSpacer as="nav" className="py-32pxr foldable:py-24pxr">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-bold text-bg-inner">
          {/* <button
            aria-label="Search"
            onClick={onOpenSearch}
            className="focus-primary relative flex h-48pxr w-288pxr items-center gap-4pxr rounded-lg border border-bg-secondary px-8pxr text-14pxr shadow-md transition hover:border-primary foldable:hidden"
          >
            <ParticleComponent
              parentElementWidth={280}
              svgClassName="GOOGLE_LOGO"
              animationName="diagonalSlideFromTopParticle"
            />
            <SearchSvg />
            <span className="text-bg-inner/50 ml-12pxr flex-auto text-left">포스트 검색...</span>
            <kbd className="font-sans font-semibold text-all-custom-gray">
              <abbr
                data-platform="mac"
                title="Command"
                className="inline-flex h-20pxr w-20pxr items-center justify-center rounded-md bg-bg-secondary p-4pxr text-all-custom-gray no-underline"
              >
                ⌘
              </abbr>
              <abbr
                data-platform="win"
                title="Command"
                className="inline-flex h-20pxr w-20pxr items-center justify-center rounded-md bg-bg-secondary p-4pxr text-all-custom-gray no-underline"
              >
                Ctrl
              </abbr>{' '}
              <kbd className="inline-flex h-20pxr w-20pxr  items-center justify-center rounded-md bg-bg-secondary p-4pxr text-all-custom-gray no-underline">
                K
              </kbd>
            </kbd>
          </button> */}
          <Link
            to={ROUTES.HOME}
            className="focus-primary m-0pxr rounded-sm text-32pxr foldable:text-24pxr"
            aria-label="Blog Home"
          >
            {sliceContext.title}
          </Link>
          <div className="flex items-center gap-16pxr">
            <Link
              to={ROUTES.ABOUT}
              className="focus-primary m-0pxr rounded-sm text-28pxr foldable:text-20pxr"
              aria-label="About"
            >
              About
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </ContentSpacer>
    </>
  );
};

export default Nav;
