import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomePage from "./HomePage.jsx";
import KrishiVaaniDashBoard from "./KrishiVaaniDashBoard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignUpModal";
import AdminLoginModal from "./components/modals/AdminLoginModal";
import AdminSignupModal from "./components/modals/AdminSignupModal";

function AppContent() {
  const { currentUser, loading,logout } = useAuth(); // ✅ no need to pull logout here
  const [openModal, setOpenModal] = useState(null);

  // --- Modal Handlers ---
  const handleCloseModal = () => setOpenModal(null);
  const handleOpenLogin = () => setOpenModal("login");
  const handleOpenSignup = () => setOpenModal("signup");
  const handleOpenAdminLogin = () => setOpenModal("adminLogin");
  const handleOpenAdminSignup = () => setOpenModal("adminSignup");
  const handleSwitchToLogin = () => setOpenModal("login");
  const handleSwitchToAdminLogin = () => setOpenModal("adminLogin");

  // --- Render Modals ---
  const renderModal = () => {
    if (currentUser) return null;
    switch (openModal) {
      case "login":
        return (
          <LoginModal
            isOpen={true}
            onClose={handleCloseModal}
            onSwitchToSignup={() => setOpenModal("signup")}
          />
        );
      case "signup":
        return (
          <SignupModal
            isOpen={true}
            onClose={handleCloseModal}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      case "adminLogin":
        return (
          <AdminLoginModal
            isOpen={true}
            onClose={handleCloseModal}
            onSwitchToSignup={handleOpenAdminSignup}
          />
        );
      case "adminSignup":
        return (
          <AdminSignupModal
            isOpen={true}
            onClose={handleCloseModal}
            onSwitchToLogin={handleSwitchToAdminLogin}
          />
        );
      default:
        return null;
    }
  };

  // --- Render Pages ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="h-screen flex items-center justify-center font-bold text-xl">
          Loading KrishiVaani...
        </div>
      );
    }

    if (!currentUser) {
      return (
        <HomePage
          onOpenLogin={handleOpenLogin}
          onOpenSignup={handleOpenSignup}
          onOpenAdminLogin={handleOpenAdminLogin}
          onOpenAdminSignup={handleOpenAdminSignup}
        />
      );
    }

    // ✅ Role-based routing
    if (currentUser.role === "admin") {
      return <AdminDashboard />; // no logout prop needed
    }

    return <KrishiVaaniDashBoard 
            logout={logout}
    />;
  };

  return (
    <div className="min-h-screen">
      {renderModal()}
      {renderContent()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
