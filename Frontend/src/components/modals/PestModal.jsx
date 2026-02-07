import React, { useState } from 'react';

// A simple placeholder for the reusable Modal component.
// In a real project, you would import this from '../Modal.jsx'
const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75 bg-opacity-75 p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl w-full max-w-2xl transform transition-transform duration-300 scale-100 p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

const PestModal = ({ isOpen, onClose, t }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        // You would typically send this file to an API for analysis here.
        // For now, this just updates the preview.
        console.log("Image uploaded for analysis.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.pestModalTitle} subtitle={t.pestModalSub}>
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl">
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        {imagePreview ? (
          <img src={imagePreview} alt="Uploaded preview" className="max-h-64 object-contain rounded-lg mb-4" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L15 16m-2-4l-4 4m0 0l-4 4m4-4h.01M19 18l-4.586-4.586a2 2 0 00-2.828 0L7 18" />
          </svg>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.dragAndDrop}</p>
        <label htmlFor="imageInput" className="mt-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer">
          {t.uploadImage}
        </label>
      </div>
      <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition-colors">
        {t.viewDetails}
      </button>
    </Modal>
  );
};

export default PestModal;
