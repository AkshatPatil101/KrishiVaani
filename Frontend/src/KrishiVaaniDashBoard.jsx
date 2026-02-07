import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from './contexts/AuthContext.jsx';
import OnBoarding from "./OnBoarding.jsx";
import Profile from './Profile.jsx';
import ChatInterface from './components/ChatInterface.jsx';
import WeatherModal from './components/modals/WeatherModal';
import MarketModal from './components/modals/MarketModal';
import PestModal from './components/modals/PestModal';
import SubsidiesModal from './components/modals/SubsidiesModal';
import CropCalendarModal from './components/modals/CropCalendarModal';
import SoilHealthModal from './components/modals/SoilHealthModal';
import ExpertConnectModal from './components/modals/ExpertConnectModal';
import { Toaster } from 'react-hot-toast';

import {
  Menu, X, MessageCircle, Camera, CloudSun, Gift, Sprout,
  Users, MapPin, Bell, User, Home, BarChart3, FileText,
} from 'lucide-react';

const KrishiVaaniDashboard = ({ t, logout }) => {
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState(null);
  const [onBoardingDone, setOnBoardingDone] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userEmail = currentUser?.email;
  const API_URL = '/api/KrishiVaani';

  // ================= FETCH USER DATA =================
  const fetchUserData = useCallback(async () => {
    if (!userEmail) {
      setLoadingData(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}?email=${encodeURIComponent(userEmail)}`);
      const text = await res.text();

      if (!res.ok) throw new Error(text);

      const data = JSON.parse(text);
      setUserData(data);
      setOnBoardingDone(Boolean(data.onBoarding));
    } catch (err) {
      console.error('Error fetching user data:', err);
    } finally {
      setLoadingData(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // ================= PROFILE UPDATE =================
  const handleProfileUpdate = () => {
    setActiveSection('dashboard');
    fetchUserData();
  };

  // ================= ONBOARDING =================
  const handleOnboardingComplete = async (onboardingData) => {
    setLoadingData(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Email: userEmail,
          onBoarding: true,
          ...onboardingData,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      setUserData(prev => ({ ...prev, ...onboardingData, onBoarding: true }));
      setOnBoardingDone(true);
    } catch (err) {
      console.error('Onboarding failed:', err);
    } finally {
      setLoadingData(false);
    }
  };

  // ================= EARLY RETURNS =================
  if (loadingData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!onBoardingDone) {
    return <OnBoarding onComplete={handleOnboardingComplete} />;
  }

  const user = userData || {};

  // ================= RENDER CONTENT =================
  const renderContent = () => {
    const ContentContainer = ({ children }) => (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[calc(100vh-14rem)]">
        {children}
      </div>
    );

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold">
                Welcome, {currentUser?.displayName || 'User'}!
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow border">
                <p className="text-sm">Land Area</p>
                <p className="text-xl font-bold">{user.landArea || 'N/A'} acres</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow border">
                <p className="text-sm">Crops</p>
                <p className="font-semibold">{user.cropsToPlant?.join(', ') || 'N/A'}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow border">
                <p className="text-sm">Soil</p>
                <p className="font-semibold">{user.soilType || 'N/A'}</p>
              </div>
            </div>
          </div>
        );

      case 'chatbot':
        return <ChatInterface t={t} userDataFromParent={userData} />;

      case 'profile':
        return (
          <ContentContainer>
            <Profile userEmail={user.Email} onProfileUpdate={handleProfileUpdate} />
          </ContentContainer>
        );

      case 'weather':
        return <WeatherModal isOpen onClose={() => setActiveSection('dashboard')} />;

      case 'market':
        return <MarketModal isOpen onClose={() => setActiveSection('dashboard')} />;

      case 'expert-connect':
        return (
          <ExpertConnectModal
            isOpen
            onClose={() => setActiveSection('dashboard')}
            userName={currentUser?.displayName}
            userEmail={user.Email}
          />
        );

      default:
        return null;
    }
  };

  // ================= MAIN JSX =================
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-green-600 text-white p-4">
        {['dashboard', 'chatbot', 'profile'].map(id => (
          <button
            key={id}
            className="block w-full text-left py-2"
            onClick={() => setActiveSection(id)}
          >
            {id}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-6">
        {renderContent()}
      </main>

      <Toaster />
    </div>
  );
};

export default KrishiVaaniDashboard;
