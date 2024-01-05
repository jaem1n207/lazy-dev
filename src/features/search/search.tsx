import { window } from "browser-monads-ts";
import { Link } from "gatsby";
import {
  type ChangeEvent,
  type FocusEvent,
  Fragment,
  type MouseEvent,
  useEffect,
  useRef,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Key } from "ts-key-enum";

import Anchor from "@/common/components/a/anchor";
import Kbd from "@/common/components/kbd/kbd";
import ClientOnly from "@/common/components/wrapper/client-only";
import { useBoolean } from "@/common/hooks/use-boolean";
import useCurrentState from "@/common/hooks/use-current-state";
import { useRect } from "@/common/hooks/use-rect";
import { getElements } from "@/common/utils/dom";
import { DiscussionIds, getGithubDiscussionUrl, getGithubIssueUrl } from "@/common/utils/git";

import Highlight from "./highlight";
import type { SearchResult } from "./types";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
  error: boolean;
  results: SearchResult[];
}

const isSearchItem = (el?: HTMLElement) => {
  if (!el) return false;
  return !!el.attributes.getNamedItem("data-search-anchor-item");
};

const Search = ({ value, onChange: _onChange, loading, error, results }: SearchProps) => {
  // 현재로선 search 컴포넌트는 tablet 사이즈 이하인 기기에선 보이지 않습니다.
  // 그러나 추후 tablet 사이즈 이하인 기기도 검색을 사용할 수 있도록 지원할 예정이기에 아래 조건을 추가합니다.
  const displayKbd =
    !window.__LAZY_DEV_DATA__.detectDevice.isTouch &&
    window.__LAZY_DEV_DATA__.detectDevice.isDesktop;

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLLIElement>(null);

  const ulRef = useRef<HTMLUListElement>(null);
  const { rect, setRect } = useRect();
  const [showHighlight, { on: onShowHighlight, off: onHideHighlight }] = useBoolean(false);

  const [showResults, { on: onShowResults, off: onHideResults }] = useBoolean(false);
  const renderResults = Boolean(value) && showResults;

  const [preventHover, setPreventHover, preventHoverRef] = useCurrentState(false);

  const hoverHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    if (preventHover) return;
    if (!isSearchItem(e.currentTarget)) return;

    e.currentTarget.focus();
  };

  const focusHandler = (e: FocusEvent<HTMLAnchorElement>) => {
    if (!isSearchItem(e.currentTarget)) return;

    setRect(e, () => ulRef.current);
    onShowHighlight();
  };

  const blurHandler = () => {
    onHideHighlight();
  };

  const focusTo = (child: HTMLAnchorElement) => {
    if (!isSearchItem(child)) return;
    setPreventHover(true);
    /**
     * 현재 이벤트 루프에서 발생하는 모든 동기적인 작업이 완료된 후(버블링 완료)에 호출되도록 합니다.
     * 한글을 입력 처리와 child.focus()가 동시에 발생하면, 마지막 글자가 중복으로 입력되는 문제가 있기 때문입니다.
     * @see https://github.com/jaem1n207/lazy-dev/issues/66
     */
    setTimeout(() => child.focus(), 0);
  };

  const focusElement = (direction: "next" | "prev") => {
    if (!ulRef.current) return;

    const children = Array.from(getElements<HTMLAnchorElement>("a", ulRef.current));
    if (children.length === 0) return;

    const index = children.findIndex((child) => child === document.activeElement);

    if (direction === "next") {
      if (index === -1 || index + 2 > children.length) return focusTo(children[0]);
      focusTo(children[index + 1]);
    } else {
      if (index === -1 || index - 1 < 0) return focusTo(children[children.length - 1]);
      focusTo(children[index - 1]);
    }
  };

  const focusNextElement = () => focusElement("next");
  const focusPrevElement = () => focusElement("prev");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    _onChange(value);
    value ? onShowResults() : onHideResults();
  };

  const finishSearch = () => {
    inputRef.current?.blur();
    ulRef.current?.scrollTo(0, 0);
    _onChange("");
    onHideResults();
    onHideHighlight();
  };

  // `preventHoverRef.current`는 `useRef` 훅에 의해 생성된 값입니다.
  // 이 값은 컴포넌트의 렌더링 사이에서 변경되지 않으므로 의존성 배열에 포함시키지 않습니다.
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // 키보드로 요소에 포커스를 주면, 마우스로 요소에 hover가 되지 않도록 합니다.
    const eventHandler = () => {
      if (!preventHoverRef.current) return;
      setPreventHover(false);
    };
    document.addEventListener("mousemove", eventHandler);
    return () => {
      document.removeEventListener("mousemove", eventHandler);
    };
  }, []);

  useHotkeys(`${Key.Meta} + k`, () => inputRef.current?.focus(), {
    preventDefault: true,
  });
  useHotkeys(Key.ArrowDown, focusNextElement, {
    preventDefault: true,
    enableOnFormTags: ["INPUT"],
    enabled: renderResults,
  });
  useHotkeys(Key.ArrowUp, focusPrevElement, {
    preventDefault: true,
    enableOnFormTags: ["INPUT"],
    enabled: renderResults,
  });
  useHotkeys(Key.Escape, finishSearch, {
    enableOnFormTags: ["INPUT"],
    enabled: renderResults,
  });

  return (
    <div className='relative w-256pxr tablet:hidden foldable:w-auto'>
      {renderResults && (
        <div
          className='fixed inset-0 z-10 cursor-zoom-out'
          onClick={finishSearch}
          onKeyDown={finishSearch}
          role='button'
          tabIndex={-1}
        />
      )}

      <div className='relative flex flex-none items-center gap-2pxr rounded-lg bg-gray-200 px-8pxr py-4pxr dark:bg-gray-50/10'>
        <input
          ref={inputRef}
          className='z-20 flex w-full flex-shrink flex-grow basis-auto appearance-none bg-transparent text-sm -outline-offset-2 transition-colors placeholder-shown:line-clamp-1 focus-within:outline-none focus-visible:outline-none tablet:text-base'
          value={value}
          onChange={onChange}
          placeholder='주제, 내용 검색'
        />
        <ClientOnly>
          {displayKbd && (
            <div className='select-none'>
              {value ? <Kbd>ESC</Kbd> : <Kbd keys='command'>K</Kbd>}
            </div>
          )}
        </ClientOnly>
      </div>

      {renderResults && (
        <ul
          ref={ulRef}
          className='absolute right-0 top-full z-20 mt-8pxr max-h-400pxr w-screen max-w-lg overflow-auto overscroll-contain scroll-smooth rounded-xl border border-border-primary bg-bg-primary py-10pxr shadow-xl'
        >
          {error ? (
            <div className='px-12pxr py-2pxr'>
              검색할 데이터를 가져오지 못했어요
              <br />
              문제가 계속 발생하면{" "}
              <Anchor
                className='focus-primary rounded-md bg-primary px-4pxr py-2pxr text-14pxr text-text-secondary'
                href={getGithubIssueUrl({
                  title: `검색 기능이 제대로 작동하지 않아요. 확인해주세요! (검색어: \`${value}\`)`,
                  labels: "bug",
                })}
                external
              >
                여기
              </Anchor>
              에 남겨주세요!
            </div>
          ) : loading ? (
            <div className='animate-pulse px-12pxr py-2pxr'>
              검색할 데이터를 불러오는 중이에요...
            </div>
          ) : results.length === 0 ? (
            <div className='px-12pxr py-2pxr'>
              <strong className='text-primary'>&apos;{value}&apos;</strong>에 대한 검색결과가 없어요
              <br />
              <strong className='text-primary'>&apos;{value}&apos;</strong>에 대한 내용이 궁금하다면{" "}
              <Anchor
                className='focus-primary rounded-md bg-primary px-4pxr py-2pxr text-14pxr text-text-secondary'
                href={getGithubDiscussionUrl({
                  discussionId: DiscussionIds.TopicIdea,
                })}
                external
              >
                여기
              </Anchor>
              에 남겨주세요!
            </div>
          ) : (
            <>
              <Highlight rect={rect} visible={showHighlight} />
              {results.map(({ children, id, route, prefix }) => {
                return (
                  <Fragment key={id}>
                    {prefix}
                    <li
                      ref={listRef}
                      className='mx-8pxr list-none break-words rounded-md text-gray-800 dark:text-slate-100'
                    >
                      <Link
                        to={route}
                        className='relative block scroll-m-1 px-10pxr py-8pxr transition-colors focus-visible:text-primary focus-visible:outline-none'
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
              })}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
