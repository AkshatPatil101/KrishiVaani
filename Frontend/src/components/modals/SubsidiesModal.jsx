import React from 'react';

// Reusable Modal component
const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75 p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl w-full max-w-3xl transform transition-transform duration-300 scale-100 p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

const SubsidiesModal = ({ t }) => {
  const subsidies = [
    {
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      description: 'Provides ₹6,000 annually to small and marginal farmers in three equal installments to support their financial needs.',
      link: 'https://pmkisan.gov.in/'
    },
    {
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'Affordable crop insurance scheme covering pre-sowing to post-harvest risks, helping farmers mitigate losses due to natural calamities.',
      link: 'https://pmfby.gov.in/'
    },
    {
      name: 'Pradhan Mantri Kisan Maan-Dhan Yojana (PM-KMY)',
      description: 'Provides a pension of ₹3,000/month to small and marginal farmers after 60 years of age to ensure financial security.',
      link: 'https://pmkmy.gov.in/'
    },
    {
      name: 'Soil Health Card Scheme',
      description: 'Issues soil health cards to farmers every 2 years to promote balanced use of fertilizers and improve soil fertility.',
      link: 'https://soilhealth.dac.gov.in/'
    },
    {
      name: 'E-NAM (National Agriculture Market)',
      description: 'A pan-India electronic trading platform for agricultural commodities to ensure better price discovery and market access.',
      link: 'https://enam.gov.in/'
    },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t.subsidiesModalTitle}</h2>
      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">{t.subsidiesModalSub}</p>
      <div className="grid md:grid-cols-2 gap-6">
        {subsidies.map((scheme, index) => (
          <div
            key={index}
            className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-102 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">{scheme.name}</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">{scheme.description}</p>
            <a
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-indigo-600 dark:text-indigo-400 hover:underline font-medium text-sm md:text-base"
            >
              Check Eligibility
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubsidiesModal;