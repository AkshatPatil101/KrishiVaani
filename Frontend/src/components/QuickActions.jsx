import React from 'react';

/**
 * Renders the quick action cards on the dashboard.
 *
 * @param {object} props - The component props.
 * @param {object} props.t - The translations object for the current language.
 * @param {function} props.openModal - The function to call to open a specific modal.
 */
const QuickActions = ({ t, openModal }) => {
  const actions = [
    {
      key: 'weather',
      title: t.weather,
      subtitle: t.weatherSub,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.782 2.09A4.001 4.001 0 003 15z" />
        </svg>
      )
    },
    {
      key: 'market',
      title: t.marketPrices,
      subtitle: t.marketPricesSub,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    },
    {
      key: 'pest',
      title: t.pestControl,
      subtitle: t.pestControlSub,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      key: 'subsidies',
      title: t.subsidies,
      subtitle: t.subsidiesSub,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      key: 'cropCalendar',
      title: t.cropCalendar,
      subtitle: t.cropCalendarSub,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      key: 'soilHealth',
      title: t.soilHealth,
      subtitle: t.soilHealthSub,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-1.5-3.5m-7.5-6h1.5m4-6.5l2 1.5M10.75 15.5l2-1.5M7.5 14.5l1.5 2m4 1.5l1-1m2-4l-1.5-1.5m-3-1l1.5 2m-2-1.5l2-1m-1.5 0l-1-1m-1.5 2.5l2-1.5m-1.5-1.5l-1-1m-2.5 0l1.5 1.5m0 2.5l-1.5 1.5M6.5 16.5l-2.5 2.5m4-2l1.5 1m3.5-3l1.5-1.5m-4.5-1.5l1.5-1m-1.5 1l-1.5 1.5" />
        </svg>
      )
    },
    {
      key: 'expertConnect',
      title: t.expertConnect,
      subtitle: t.expertConnectSub,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-4 lg:gap-6 mb-8">
      {actions.map((action) => (
        <button
          key={action.key}
          onClick={() => openModal(action.key)}
          className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-center w-20 h-20 rounded-full mb-4 bg-indigo-500 shadow-md transition-all duration-300 group-hover:bg-indigo-600">
            {action.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 text-center mb-1">{action.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">{action.subtitle}</p>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
