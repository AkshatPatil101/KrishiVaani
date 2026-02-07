import React from 'react';

/**
 * A reusable modal component.
 * It provides a consistent wrapper for all the specific modals in the application.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - The function to call when the modal is closed.
 * @param {string} props.title - The title to display at the top of the modal.
 * @param {string} props.subtitle - An optional subtitle for the modal.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 */
const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl w-full max-w-2xl transform transition-transform duration-300 scale-100 p-6 relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {title && <h2 className="text-2xl font-bold mb-1">{title}</h2>}
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
