import React, { Fragment, useRef } from 'react';

import { Menu } from '@headlessui/react';
import { Link, graphql, useStaticQuery } from 'gatsby';

const TagSvg = () => (
  <svg
    className="mr-2.5 h-5 w-5 flex-none stroke-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
  </svg>
);

interface SearchFormProps {
  onClose: () => void;
}

const SearchForm = ({ onClose }: SearchFormProps) => {
  const handleSearchKeyword = (searchKeyword: string) => {
    window.open(
      // FIXME: 추후 https://lazy-dev.netlify.app 에서 검색하도록 수정 필요
      `https://www.google.com/search?q=site:lazydev.gatsbyjs.io+${encodeURIComponent(
        searchKeyword,
      )}`,
      '_blank',
      'noopener noreferrer',
    );
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
    handleSearchKeyword(e.currentTarget.search.value);
  };

  const tags = useStaticQuery<Queries.NavQuery>(graphql`
    query Nav {
      tags: allMarkdownRemark(sort: { frontmatter: { tags: ASC } }) {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `).tags.group;

  const searchInputRef = useRef<HTMLInputElement>(null);
  const firstOptionRef = useRef<HTMLElement>(null);

  return (
    <div className="shadow-black/5 ring-slate-700/10 pointer-events-auto relative z-10 w-full max-w-3xl rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-700 shadow-xl ring-1">
      <div>
        <Menu>
          {({ open }) => (
            <>
              <div className="relative flex items-center text-slate-400">
                <form onSubmit={onSubmit} className="m-0 w-full">
                  <input
                    ref={searchInputRef}
                    type="search"
                    name="search"
                    id="search"
                    className="h-8 w-full rounded-tl-lg rounded-tr-lg px-2.5 text-[0.8125rem] leading-5 text-slate-700 shadow-md transition focus-within:outline-none"
                    placeholder="포스트 검색..."
                    aria-label="Search"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        firstOptionRef.current?.focus();
                      }
                    }}
                  />
                </form>
              </div>

              <div className="border-t border-slate-400/20 px-3.5 py-3">
                <div className="mb-1.5 ml-2 text-left text-xs font-semibold text-slate-500">
                  태그로 검색
                </div>
                {!open && (
                  <Menu.Items static>
                    {tags.map((tag, index) => (
                      <Fragment key={tag.fieldValue}>
                        {index === 0 ? (
                          <Menu.Item key={tag.fieldValue} ref={firstOptionRef}>
                            {({ active }) => (
                              <Link
                                onClick={onClose}
                                to={`/tags/${tag.fieldValue}`}
                                className={`flex items-center rounded-md p-1.5 focus-within:outline-none ${
                                  active ? 'bg-primary text-white' : 'text-slate-500'
                                }`}
                              >
                                <TagSvg />
                                <span className="truncate">{tag.fieldValue}</span>
                              </Link>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item key={tag.fieldValue}>
                            {({ active }) => (
                              <Link
                                onClick={onClose}
                                to={`/tags/${tag.fieldValue}`}
                                className={`flex items-center rounded-md p-1.5 focus-within:outline-none ${
                                  active ? 'bg-primary text-white' : 'text-slate-500'
                                }`}
                              >
                                <TagSvg />
                                <span className="truncate">{tag.fieldValue}</span>
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </Fragment>
                    ))}
                  </Menu.Items>
                )}
              </div>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default SearchForm;
