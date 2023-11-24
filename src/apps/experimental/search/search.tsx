import { ChangeEvent, Fragment, useRef } from 'react';

import { Transition } from '@headlessui/react';
import { Link } from 'gatsby';

import { useBoolean } from 'Apps/about/hooks/use-boolean';
import Anchor from 'Apps/common/a/anchor';
import Kbd from 'Apps/common/kbd/kbd';
import { DiscussionIds, getGithubDiscussionUrl } from 'Utils/git';

import type { SearchResult } from './types';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
  error: boolean;
  results: SearchResult[];
}

const Search = ({ value, onChange: _onChange, loading, error, results }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [show, { on: onShow, off: onHide }] = useBoolean(false);
  const renderResults = Boolean(value) && show;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    _onChange(value);
    value ? onShow() : onHide();
  };

  const finishSearch = () => {
    inputRef.current?.blur();
    _onChange('');
    onHide();
  };

  const icon = (
    <Transition
      show={!show || Boolean(value)}
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
  );

  return (
    <div className="relative w-256pxr foldable:w-auto">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          className="block w-full appearance-none rounded-lg bg-gray-200 px-12pxr py-8pxr text-sm -outline-offset-2 transition-colors dark:bg-gray-50/10 tablet:text-base"
          value={value}
          onChange={onChange}
          placeholder="주제, 내용 검색"
        />
        {icon}
      </div>

      <Transition
        show={renderResults}
        as={Transition.Child}
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ul className="absolute right-0 top-full z-20 mt-8pxr max-h-400pxr w-screen max-w-lg overflow-auto overscroll-contain rounded-xl border border-border-primary bg-bg-primary py-10pxr shadow-xl">
          {error ? (
            <span>검색할 데이터를 가져오지 못했어요</span>
          ) : loading ? (
            <span>검색할 데이터를 불러오는 중이에요...</span>
          ) : results.length === 0 ? (
            <span>
              <strong>{value}</strong>에 대한 검색결과가 없어요
              <br />
              {value}에 대한 내용이 궁금하다면{' '}
              <Anchor
                className="focus-primary rounded-md bg-gray-600 px-2pxr py-4pxr text-14pxr text-text-secondary dark:bg-gray-200"
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
                  <li className="mx-8pxr list-none break-words rounded-md text-black dark:text-white">
                    <Link
                      to={route}
                      className="block scroll-m-1 px-10pxr py-8pxr"
                      onClick={finishSearch}
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
  );
};

export default Search;
