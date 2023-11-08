import React, { useState, useMemo, useDeferredValue, useRef } from 'react';

import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Fuse from 'fuse.js';
import { Link, graphql, useStaticQuery } from 'gatsby';

import ParticleComponent from 'Apps/common/animation/particles';
import { useAutoScroller } from 'Hooks/use-auto-scroller';
import { ROUTES } from 'Types/enum';

const handleSearchKeyword = (searchKeyword: string) => {
  window.open(
    `https://www.google.com/search?q=site:lazy-dev.netlify.app+${encodeURIComponent(
      searchKeyword,
    )}`,
    '_blank',
    'noopener noreferrer',
  );
};

interface ComboBoxModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

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

const usePostSearchKeyboardEvents = ({ isOpen, onOpen, onClose }: ComboBoxModalProps) => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onOpen, onClose]);
};

const ComboBoxModal: React.FC<ComboBoxModalProps> = ({ isOpen, onOpen, onClose }) => {
  usePostSearchKeyboardEvents({ isOpen, onOpen, onClose });

  const [searchTerm, setSearchTerm] = useState('');
  const defferedSearchTerm = useDeferredValue(searchTerm);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const resetData = () => {
    setSearchTerm('');
    setSelectedIndex(-1);
  };

  const handleCloseModal = () => {
    onClose();
    resetData();
  };

  const searchData = useStaticQuery<Queries.SearchDataQuery>(graphql`
    query SearchData {
      allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `).allMarkdownRemark.group;
  console.log(JSON.stringify(searchData));

  const tags = searchData.map((data) => data);
  const filteredTags = useMemo(() => {
    if (searchTerm.length > 0) {
      const fuse = new Fuse(tags, { keys: ['fieldValue'] });
      return fuse.search(searchTerm).map((result) => result.item);
    } else {
      return [];
    }
  }, [searchTerm, tags]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (selectedIndex < filteredTags.length) {
          // Prevent going beyond the last item
          setSelectedIndex((prevIndex) => prevIndex + 1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (selectedIndex > 0) {
          // Prevent going above the first item
          setSelectedIndex((prevIndex) => prevIndex - 1);
        }
        break;
      case 'Enter':
        handleCloseModal();
        if (selectedIndex > 0) {
          window.location.href = ROUTES.TAG.toUrl(filteredTags[selectedIndex - 1].fieldValue!);
        } else if (selectedIndex === 0) {
          handleSearchKeyword(searchTerm);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mx-auto max-h-800pxr min-h-320pxr w-full max-w-md rounded-lg bg-white p-6"
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
              }}
            >
              <SearchBar
                searchTerm={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                showTagIcon={selectedIndex > 0}
              />
              <hr className="my-4" />
              <SearchList
                tags={[{ fieldValue: searchTerm, totalCount: 0 }, ...filteredTags]}
                selectedIndex={selectedIndex}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
};

interface SearchBarProps {
  searchTerm: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  showTagIcon: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onChange, onKeyDown, showTagIcon }) => {
  return (
    <div className="flex items-center">
      <span className="relative p-2">
        {showTagIcon ? <TagSvg /> : <SearchSvg />}{' '}
        <ParticleComponent
          parentElementWidth={40}
          svgClassName="GOOGLE_LOGO"
          animationName="diagonalSlideFromTopParticle"
        />
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="flex-1 p-2"
        placeholder="주제, 태그 검색"
      />
    </div>
  );
};

interface SearchListProps {
  tags: Queries.NavQuery['tags']['group'];
  selectedIndex: number;
}

const SearchList: React.FC<SearchListProps> = ({ tags, selectedIndex }) => {
  // FIXME: tags가 빈 배열일 때 selectedIndex가 이전 값으로 남아 있는 현상 해결 필요
  console.log('🚀 ~ file: search-combobox.tsx:211 ~ selectedIndex:', selectedIndex);
  const containerRef = useRef<HTMLUListElement>(null);
  const separatorClassName = useAutoScroller({
    containerRef,
    selectedIndex: selectedIndex,
    itemCount: tags.length,
    separatorCount: 1,
  });

  if (tags.length === 1 && tags[0].fieldValue === '') return null;

  return (
    <ul
      ref={containerRef}
      className="max-h-40 overflow-y-auto"
      role="listbox"
      aria-labelledby="search-label"
    >
      {tags.map((tag, index) => (
        <React.Fragment key={index}>
          <motion.li
            initial={{ backgroundColor: '#ffffff' }}
            animate={{ backgroundColor: index === selectedIndex ? '#e2e8f0' : '#ffffff' }}
            transition={{ duration: 0.3 }}
            className={`cursor-pointer p-2`}
            role="option"
            aria-selected={index === selectedIndex}
            tabIndex={-1}
          >
            {index === 0 ? (
              <button
                tabIndex={-1}
                data-render-type="search-keyword"
                onClick={() => handleSearchKeyword(tag.fieldValue!)}
              >
                {tag.fieldValue}
              </button>
            ) : (
              <Link
                className="inline-block w-full"
                to={ROUTES.TAG.toUrl(tag.fieldValue!)}
                tabIndex={-1}
                data-render-type="search-tag"
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            )}
          </motion.li>

          {index === 0 && tags.length > 1 && (
            <div className={`${separatorClassName} border-b border-slate-400/20`}></div>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ComboBoxModal;
