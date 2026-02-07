// src/components/ExpertConnectModal/ExpertConnectModal.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Phone, Mail, MapPin, Briefcase, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import ChatBox from "../Chat/ChatBox"; // adjust path if necessary

// Simple Portal Modal (backdrop click closes, ESC closes, body scroll locked)
const PortalModal = ({ children, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Modal container - stop backdrop click propagation */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[10000] w-[95%] max-w-3xl h-[85vh] md:h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const ExpertConnectModal = ({ t }) => {
  const { currentUser } = useAuth();
  const userEmail = currentUser?.email || "";
  const userName = currentUser?.displayName || "";

  const [selectedExpert, setSelectedExpert] = useState(null);

  const experts = [
    {
      name: "Dr. Ramesh Kumar",
      email: "rohanmache71@gmail.com",
      phone: "9876543210",
      expertise: ["Banana", "Leaf Spot", "Pesticides"],
      experience: 12,
      location: "Thrissur, Kerala",
      available: true,
      avatar: "/images/default-avatar-1.jpg",
    },
    {
      name: "Dr. Anitha Menon",
      email: "rohanmache72@gmail.com",
      phone: "9123456780",
      expertise: ["Paddy", "Soil Fertility", "Water Management"],
      experience: 8,
      location: "Palakkad, Kerala",
      available: true,
      avatar: "/images/default-avatar-2.jpg",
    },
    {
      name: "Dr. Suresh Patil",
      email: "rohanmache73@gmail.com",
      phone: "9998887776",
      expertise: ["Sugarcane", "Organic Farming"],
      experience: 15,
      location: "Pune, Maharashtra",
      available: true,
      avatar: "/images/default-avatar-3.jpg",
    },
  ];

  const handleSendEmail = async (expert) => {
    try {
      const response = await fetch("/api/experts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertEmail: expert.email,
          userName,
          userEmail,
          userIssue:
            "A farmer has been noticing small, circular, dark brown spots on tomato leaves. The spots are spreading quickly, especially after recent high humidity and rainfall. Some lower leaves are yellowing and dropping, and the farmer is worried about the harvest.",
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }
        console.error("Failed to send email:", errorData);
        toast.error(`Failed: ${errorData.error || errorData}`);
        return;
      }

      toast.success("Email Sent Successfully ✅");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Network error. Please check your server.");
    }
  };

  const getStatusColor = (isAvailable) =>
    isAvailable ? "bg-green-500" : "bg-gray-400";

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <Toaster />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {t?.expertConnectTitle ?? "Connect with an Expert"}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t?.expertConnectSub ?? "Choose an expert to message or schedule a call."}
      </p>

      <div className="space-y-4 mt-4">
        {experts.map((expert, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative flex-shrink-0">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={expert.avatar}
                alt={expert.name}
              />
              <span
                className={`absolute bottom-0 right-0 h-4 w-4 rounded-full ring-2 ring-white dark:ring-gray-700 ${getStatusColor(
                  expert.available
                )}`}
              ></span>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {expert.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {expert.expertise.map((e, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-200"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
                <div className="flex items-center space-x-1 ">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span>{expert.location}</span>
                </div>
                <div className="flex items-center space-x-1 mt-1 md:mt-0">
                  <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span>{expert.experience} years experience</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedExpert(expert)}
                className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center
                  ${
                    expert.available
                      ? "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                disabled={!expert.available}
              >
                💬 Message
              </button>

              <button
                onClick={() => handleSendEmail(expert)}
                className="py-2 px-4 rounded-xl text-sm font-medium bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-center"
              >
                <Mail className="h-4 w-4 mr-0.5" />
                {t?.scheduleCall ?? "Schedule Call"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Chat Modal via Portal */}
      {selectedExpert && (
        <PortalModal onClose={() => setSelectedExpert(null)}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <img src={selectedExpert.avatar} className="h-10 w-10 rounded-full object-cover" alt={selectedExpert.name} />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">{selectedExpert.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{selectedExpert.expertise.join(" • ")}</div>
              </div>
            </div>
            <button onClick={() => setSelectedExpert(null)} className="text-gray-600 dark:text-gray-300 hover:text-red-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat body */}
          <div className="h-[calc(100%-64px)]">
            <ChatBox
              currentUser={{ name: userName, email: userEmail }}
              chatPartner={selectedExpert}
              onClose={() => setSelectedExpert(null)}
            />
          </div>
        </PortalModal>
      )}
    </div>
  );
};

export default ExpertConnectModal;
