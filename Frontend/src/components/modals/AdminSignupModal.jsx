import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signupAsAdmin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signupAsAdmin(email, password, name, secretCode);
      onClose(); // On successful signup, AuthContext will trigger redirect in App.jsx
    } catch (err) {
      setError(err.message); // Displays "Invalid Admin Secret Code." or other Firebase errors
      console.error(err);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm m-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1 font-bold">Admin Secret Code</label>
            <input type="password" value={secretCode} onChange={e => setSecretCode(e.target.value)} className="w-full p-2 border rounded border-red-300 focus:border-red-500" required />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-green-300"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up as Admin'}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already an admin?{' '}
            <button type="button" onClick={onSwitchToLogin} className="text-green-600 hover:underline font-semibold">
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignupModal;