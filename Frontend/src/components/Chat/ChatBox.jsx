import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

const ChatBox = ({ currentUser, chatPartner, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  // ✅ Guard: wait until both users are defined
  if (!currentUser?.email || !chatPartner?.email) {
    return <div>Loading chat...</div>;
  }

  // Room ID: always sort emails for consistency
  const roomId = [currentUser.email, chatPartner.email].sort().join("-");

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    socket.on("receiveMessage", (msgData) => {
      if (msgData.roomId === roomId) {
        setMessages((prev) => [...prev, msgData]);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("chatHistory");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const msgData = {
      roomId,
      sender: currentUser.email,
      message: newMsg,
    };

    socket.emit("sendMessage", msgData);
    setNewMsg("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Chat with {chatPartner.name}</h2>
        <button onClick={onClose} className="font-bold text-xl">×</button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
        {messages.map((msg, i) => {
          const isSelf = msg.sender === currentUser.email;
          return (
            <div key={i} className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
                isSelf ? "bg-green-500 text-white rounded-br-none" : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}>
                {msg.message}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t flex">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
