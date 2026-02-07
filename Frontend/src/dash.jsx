// src/App.js
import  { useState, useEffect } from 'react';
import {useAuth} from './contexts/AuthContext.jsx'
//Imort the OnBoarding
import OnBoarding from "./OnBoarding.jsx"
// Import all modal components
import ChatInterface from './components/ChatInterface';
import QuickActions from './components/QuickActions';
import WeatherModal from './components/modals/WeatherModal';
import MarketModal from './components/modals/MarketModal';
import PestModal from './components/modals/PestModal';
import SubsidiesModal from './components/modals/SubsidiesModal';
import CropCalendarModal from './components/modals/CropCalendarModal';
import SoilHealthModal from './components/modals/SoilHealthModal';
import ExpertConnectModal from './components/modals/ExpertConnectModal';


/**
 * The main application component that manages state and renders all child components.
 */
const DashBoard = ({t, logout}) => {
  const [openModal, setOpenModal] = useState(null);
  
  const {currentUser} = useAuth();
  const [userData, setUserData] = useState([]);
  const [onBoardingDone,setOnBoardingDone] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const API_URL = '/api/KrishiVaani';
  const userEmail = currentUser.email;
  
  //
  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const response = await fetch(`${API_URL}?email=${encodeURIComponent(userEmail)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setUserData(data);                     // if data is present load it 
        setOnBoardingDone(data.onBoarding);    // go directly to dashboard

        if(data.onBoarding){
          console.log("ye")
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
 
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [userEmail]); // The effect re-runs if the userEmail changes.useEffect
  //

  //
  const handleOnboardingComplete = async (userData) => {
    setLoadingData(true);
    const backendEndpoint = 'http://localhost:5001/api/KrishiVaani';
    
    try {
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: userEmail,
          onBoarding: true,
          phoneNumber: userData.phoneNumber,
          location: userData.location,
          landArea: userData.landArea,
          cropsToPlant: userData.cropsToPlant, // This is now an array
          soilType: userData.soilType,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);

      setUserData(userData); // loading data

      setOnBoardingDone(true); // for dashboard

    } catch (e) {
      console.error('Failed to complete onboarding:', e);
    } finally {
      setLoadingData(false);
    }
  };
  //

  // Function to open a specific modal
  const handleOpenModal = (modalName) => {
    setOpenModal(modalName);
  };

  // Function to close the currently open modal
  const handleCloseModal = () => {
    setOpenModal(null);
  };

  // Render the appropriate modal based on the state
  const renderModal = () => {
    const tFunc = (key) => t[key] || key;

    switch (openModal) {
      case 'weather':
        return <WeatherModal isOpen={true} onClose={handleCloseModal} t={tFunc} location={userData.location}/>;
      case 'market':
        return <MarketModal isOpen={true} onClose={handleCloseModal} t={t} />;
      case 'pest':
        return <PestModal isOpen={true} onClose={handleCloseModal} t={t} />;
      case 'subsidies':
        return <SubsidiesModal isOpen={true} onClose={handleCloseModal} t={t} />;
      case 'cropCalendar':
        return <CropCalendarModal isOpen={true} onClose={handleCloseModal} t={t} />;
      case 'soilHealth':
        return <SoilHealthModal isOpen={true} onClose={handleCloseModal} t={t} />;
      case 'expertConnect':
        return <ExpertConnectModal isOpen={true} onClose={handleCloseModal} t={t} />;
      default:
        return null;
    }
  };

  return (
    <>
  {loadingData ? (
    <></>
  ) : (
    onBoardingDone ? (
      <div className="max-w-7xl mx-auto py-8">
        <button onClick={logout} className='btn'>logout</button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuickActions t={t} openModal={handleOpenModal} />
          </div>
          <div className="lg:col-span-1">
            <ChatInterface t={t} userDataFromParent={userData}/>
          </div>
        </div>
        {renderModal()}
      </div>
    ) : (
      <OnBoarding 
        onComplete={handleOnboardingComplete}
      />
    )
  )}
</>
  );
};

export default DashBoard;

