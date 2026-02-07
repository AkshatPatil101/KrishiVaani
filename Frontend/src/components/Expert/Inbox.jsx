import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Inbox = () => {
  const { currentUser } = useAuth(); // expert info
  const expertId = currentUser.email; // we'll use email as ID
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/messages/${expertId}`);
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch messages.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Inbox</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="p-4 border rounded shadow-sm bg-gray-50">
              <p><span className="font-semibold">{msg.senderName}:</span> {msg.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inbox;
