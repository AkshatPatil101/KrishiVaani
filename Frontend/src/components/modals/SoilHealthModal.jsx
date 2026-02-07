import React from 'react';

const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75 p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl w-full max-w-3xl transform transition-transform duration-300 scale-100 p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          ✖
        </button>
        <h2 className="text-3xl font-bold mb-1">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

const SoilHealthModal = ({ t }) => {
  const soilData = [
    { name: 'pH Level', value: 6.5, unit: '', status: 'Optimal', recommendation: t.pHRec },
    { name: 'Organic Matter', value: 2.1, unit: '%', status: 'Low', recommendation: t.organicMatterRec },
    { name: 'Nitrogen (N)', value: 180, unit: 'kg/ha', status: 'Low', recommendation: t.nitrogenRec },
    { name: 'Phosphorus (P)', value: 60, unit: 'kg/ha', status: 'High', recommendation: t.phosphorusRec },
    { name: 'Potassium (K)', value: 220, unit: 'kg/ha', status: 'Optimal', recommendation: t.potassiumRec },
  ];

  const getBarColor = (status) => {
    switch (status) {
      case 'Optimal':
        return 'bg-green-500';
      case 'High':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t.soilHealthModalTitle}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{t.soilHealthModalSub}</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base border-collapse">
          <thead>
            <tr className="text-left bg-gray-200 dark:bg-gray-700">
              <th className="p-3 rounded-tl-lg">Parameter</th>
              <th className="p-3">Value</th>
              <th className="p-3">Status</th>
              <th className="p-3 rounded-tr-lg">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {soilData.map((param, index) => (
              <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-semibold">{param.name}</td>
                <td className="p-3">
                  {param.value} {param.unit}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2 mt-1">
                    <div
                      className={`h-2 rounded ${getBarColor(param.status)}`}
                      style={{ width: `${Math.min(param.value, 100)}%` }}
                    ></div>
                  </div>
                </td>
                <td className="p-3">{param.status}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">{param.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoilHealthModal;