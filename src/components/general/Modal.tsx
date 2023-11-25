import type { RefObject } from "react";

export const ModalInner = ({
  modalRef,
  title,
  children,
}: {
  modalRef: RefObject<HTMLDialogElement>;
  title: string;
  children: React.ReactNode;
}) => {
  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div id="default-modal" tabIndex={-1}>
      <div className="relative max-h-full w-full max-w-2xl">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="space-y-4 p-4 md:p-5">{children}</div>

          <div className="flex justify-end items-center rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">
            <button
              onClick={handleClose}
              type="button"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
