import React from 'react';

import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

import SearchForm from './search-form';

interface SearchProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePostSearchKeyboardEvents = ({ isOpen, onOpen, onClose }: SearchProps) => {
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

const Search = ({ isOpen, onOpen, onClose }: SearchProps) => {
  usePostSearchKeyboardEvents({ isOpen, onOpen, onClose });

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-hidden"
        >
          <div className="flex flex-col px-4 py-8 text-center">
            <Dialog.Overlay />
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <motion.div
              className="sm:block sm:p-0 mt-48 flex min-h-screen max-w-3xl items-start justify-center px-4 text-center"
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  ease: 'easeOut',
                  duration: 0.15,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                transition: {
                  ease: 'easeIn',
                  duration: 0.15,
                },
              }}
            >
              <span
                className="sm:inline-block sm:align-middle sm:h-screen hidden"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <Dialog.Panel>
                <SearchForm onClose={onClose} />
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Search;
