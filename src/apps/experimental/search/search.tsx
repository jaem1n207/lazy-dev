// FIXME: 키보드 입력에 따라 focus 되는 항목이 변경되어야 함 (GlobalListener & Hotkey 구현되면 ㄱ), search fallback UI 구현(CLS 지표 개선)
import { ChangeEvent, FocusEvent, Fragment, MouseEvent, useRef } from 'react';

import { Transition } from '@headlessui/react';
import { window } from 'browser-monads-ts';
import { Link } from 'gatsby';

import { useBoolean } from 'Apps/about/hooks/use-boolean';
import Anchor from 'Apps/common/a/anchor';
import Kbd from 'Apps/common/kbd/kbd';
import ClientOnly from 'Apps/common/wrapper/client-only';
import { DiscussionIds, getGithubDiscussionUrl } from 'Utils/git';

import Highlight from './highlight';
import type { SearchResult } from './types';
import { useRect } from './use-rect';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
  error: boolean;
  results: SearchResult[];
}

const isSearchItem = (el?: HTMLElement) => {
  if (!el) return false;
  return !!el.attributes.getNamedItem('data-search-anchor-item');
};

const Search = ({ value, onChange: _onChange, loading, error, results }: SearchProps) => {
  const displayKbd =
    !window.__LAZY_DEV_DATA__.detectDevice.isTouch &&
    window.__LAZY_DEV_DATA__.detectDevice.isDesktop;

  const inputRef = useRef<HTMLInputElement>(null);

  const ulRef = useRef<HTMLUListElement>(null);
  const { rect, setRect } = useRect();
  const [showHighlight, { on: onShowHighlight, off: onHideHighlight }] = useBoolean(false);

  const [showResults, { on: onShowResults, off: onHideResults }] = useBoolean(false);
  const renderResults = Boolean(value) && showResults;

  const hoverHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isSearchItem(e.target as HTMLAnchorElement)) return;

    (e.target as HTMLAnchorElement).focus();
  };

  const focusHandler = (e: FocusEvent<HTMLAnchorElement>) => {
    if (!isSearchItem(e.target as HTMLAnchorElement)) return;

    setRect(e, () => ulRef.current);
    onShowHighlight();
  };

  const blurHandler = () => {
    onHideHighlight();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    _onChange(value);
    value ? onShowResults() : onHideResults();
  };

  const finishSearch = () => {
    console.log('hello');
    inputRef.current?.blur();
    ulRef.current?.scrollTo(0, 0);
    _onChange('');
    onHideResults();
    onHideHighlight();
  };

  return (
    <ClientOnly>
      <div className="relative w-256pxr foldable:w-auto">
        {renderResults && (
          <div
            className="fixed inset-0 z-10 cursor-zoom-out"
            onClick={finishSearch}
            onKeyDown={finishSearch}
            role="button"
            tabIndex={-1}
          />
        )}

        <div className="relative flex items-center">
          <input
            ref={inputRef}
            className="z-20 block w-full appearance-none rounded-lg bg-gray-200 px-12pxr py-8pxr text-sm -outline-offset-2 transition-colors placeholder-shown:line-clamp-1 dark:bg-gray-50/10 tablet:text-base"
            value={value}
            onChange={onChange}
            placeholder="주제, 내용 검색"
          />
          {displayKbd && (
            <Transition
              show={!showResults || Boolean(value)}
              as={Fragment}
              enter="transition-opacity"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute right-1">
                {value ? (
                  <Kbd className={{ wrapper: 'bg-zinc-300 dark:bg-neutral-800' }}>ESC</Kbd>
                ) : (
                  <Kbd keys="command" className={{ wrapper: 'bg-zinc-300 dark:bg-neutral-800' }}>
                    K
                  </Kbd>
                )}
              </div>
            </Transition>
          )}
        </div>

        <Transition
          show={renderResults}
          as={Transition.Child}
          leave="transition-opacity duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul
            ref={ulRef}
            className="absolute right-0 top-full z-20 mt-8pxr max-h-400pxr w-screen max-w-lg overflow-auto overscroll-contain scroll-smooth rounded-xl border border-border-primary bg-bg-primary py-10pxr shadow-xl"
          >
            <Highlight rect={rect} visible={showHighlight} />
            {error ? (
              <span>검색할 데이터를 가져오지 못했어요</span>
            ) : loading ? (
              <span>검색할 데이터를 불러오는 중이에요...</span>
            ) : results.length === 0 ? (
              <span>
                <strong>&apos;{value}&apos;</strong>에 대한 검색결과가 없어요
                <br />
                <strong>&apos;{value}&apos;</strong>에 대한 내용이 궁금하다면{' '}
                <Anchor
                  className="rounded-md bg-gray-600 px-2pxr py-4pxr text-14pxr text-text-secondary dark:bg-gray-200"
                  href={getGithubDiscussionUrl({
                    discussionId: DiscussionIds.TopicIdea,
                  })}
                  external
                >
                  여기
                </Anchor>
                에 남겨주세요!
              </span>
            ) : (
              results.map(({ children, id, route, prefix }) => {
                return (
                  <Fragment key={id}>
                    {prefix}
                    <li className="mx-8pxr list-none break-words rounded-md text-gray-800 dark:text-slate-100">
                      <Link
                        to={route}
                        className="relative block scroll-m-1 px-10pxr py-8pxr transition-colors focus-visible:text-primary focus-visible:outline-none"
                        onClick={finishSearch}
                        onMouseOver={hoverHandler}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        data-search-anchor-item
                      >
                        {children}
                      </Link>
                    </li>
                  </Fragment>
                );
              })
            )}
          </ul>
        </Transition>
      </div>
    </ClientOnly>
  );
};

export default Search;
