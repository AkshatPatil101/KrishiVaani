import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { LogOut } from "lucide-react";
import ExpertInbox from "./components/Chat/ExpertInbox";

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();

  const expert = {
    name: currentUser?.displayName || "Expert",
    email: currentUser?.email || "expert@example.com",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-gray-800">
            KrishiVaani Expert Panel
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {expert.name}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 flex items-center"
            >
              <LogOut className="inline mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto mt-4 gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex-1 h-[70vh]">
          <ExpertInbox expert={expert} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
