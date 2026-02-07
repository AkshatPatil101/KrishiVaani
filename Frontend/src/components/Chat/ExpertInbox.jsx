// src/components/Chat/ExpertInbox.jsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatBox from "./ChatBox";

const socket = io("http://localhost:5001");

const ExpertInbox = ({ expert }) => {
  const [farmers, setFarmers] = useState([
    { name: "Alice Farmer", email: "alice@farm.com" },
    { name: "Bob Farmer", email: "bob@farm.com" },
    { name: "Charlie Farmer", email: "charlie@farm.com" },
  ]);

  const [activeFarmer, setActiveFarmer] = useState(null);

  useEffect(() => {
    // Expert joins inbox for notifications
    socket.emit("joinExpert", { expertEmail: expert.email });

    // Listen for new farmer messages
    socket.on("newFarmerMessage", (farmerData) => {
      // Add farmer to inbox if not already there
      if (!farmers.find((f) => f.email === farmerData.email)) {
        setFarmers((prev) => [...prev, { name: farmerData.name || farmerData.email, email: farmerData.email }]);
      }
    });

    return () => {
      socket.off("newFarmerMessage");
    };
  }, [expert.email, farmers]);

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>
      <div className="space-y-2 overflow-y-auto max-h-[200px]">
        {farmers.map((farmer) => (
          <div
            key={farmer.email}
            onClick={() => setActiveFarmer(farmer)}
            className="cursor-pointer p-2 border rounded hover:bg-gray-100 flex justify-between"
          >
            <span>{farmer.name}</span>
            <span className="text-xs text-gray-500">{farmer.email}</span>
          </div>
        ))}
      </div>

      {activeFarmer && (
        <ChatBox
          expert={expert}
          currentUser={activeFarmer} // farmer object
          onClose={() => setActiveFarmer(null)}
        />
      )}
    </div>
  );
};

export default ExpertInbox;
