import React from 'react';

import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={setIsOpen}
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
        >
          <div className="flex flex-col px-4 py-8 text-center">
            <Dialog.Overlay />
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <motion.div
              className="sm:block sm:p-0 flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center"
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

              <div
                className="sm:my-8 sm:align-middle sm:max-w-lg sm:w-full inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="sm:p-6 sm:pb-4 bg-white px-4 pb-4 pt-5">
                  <div className="sm:flex sm:items-start">
                    <div className="sm:mx-0 sm:h-10 sm:w-10 mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                      <svg
                        className="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="sm:mt-0 sm:ml-4 sm:text-left mt-3 text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                        id="modal-headline"
                      >
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        <Dialog.Description as="p" className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All of your data will be
                          permanently removed. This action cannot be undone.
                        </Dialog.Description>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:px-6 sm:flex sm:flex-row-reverse bg-gray-50 px-4 py-3">
                  <button
                    type="button"
                    tabIndex={0}
                    className="sm:ml-3 sm:w-auto sm:text-sm inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    tabIndex={0}
                    className="sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
