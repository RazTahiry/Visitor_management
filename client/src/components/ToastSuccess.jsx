import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import PropTypes from "prop-types";

export function ToastSuccess({ severMessage }) {
  return (
    <>
      <div className="transition fixed top-4 right-4 shadow-lg z-50">
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 mr-3 text-sm font-normal">{severMessage}</div>
          <Toast.Toggle />
        </Toast>
      </div>
    </>
  );
}

ToastSuccess.propTypes = {
  severMessage: PropTypes.string.isRequired,
};
