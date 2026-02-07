import React from 'react';
import { LogOut, User } from 'lucide-react';

/**
 * Renders the application header with the title, language toggle button, and auth buttons.
 *
 * @param {object} props - The component props.
 * @param {object} props.t - The translations object for the current language.
 * @param {function} props.onLanguageToggle - Function to toggle the language.
 * @param {function} props.onOpenLogin - Function to open the login modal.
 * @param {function} props.onOpenSignup - Function to open the signup modal.
 * @param {object|null} props.currentUser - The current user object from authentication state.
 * @param {function} props.logout - Function to log the user out.
 */
const Header = ({ t, onLanguageToggle, onOpenLogin, onOpenSignup, currentUser, logout }) => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };



  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[90%] lg:w-[80%]">
      <div className="flex justify-between items-center py-4 px-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full border border-gray-300 dark:border-gray-700 shadow-lg transition-colors duration-300">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text drop-shadow-sm transition-colors duration-300">
          {t.appTitle}
        </h1>

        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={onLanguageToggle}
            className="px-4 py-2 text-sm font-semibold rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {t.languageToggle}
          </button>

          {/* Auth Buttons */}
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm transition-colors duration-300">
                <User size={18} className="text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-red-500 text-white hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 border border-gray-300 dark:border-gray-700"
              >
                {t.login}
              </button>

              <button
                onClick={onOpenSignup}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                {t.signUp}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
