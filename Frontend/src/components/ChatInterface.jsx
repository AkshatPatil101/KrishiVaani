/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';

// NOTE: In a production environment, API credentials and endpoints should be
// managed securely (e.g., using environment variables) and not hardcoded.
const API_TOKEN = '';
const API_ENDPOINT = '';
const API_MODEL = '';

const ChatInterface = ({ t = {}, currentLanguage = 'en', userDataFromParent = {} }) => {
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: "system", content: `You are a helpful agricultural assistant for a farmer. Here is some background about the farmer: - Location: ${userDataFromParent.location || 'Pune, Maharashtra, India'} - Land Area: ${userDataFromParent.landArea || '5'} acres - Crops to Plant: ${userDataFromParent.cropsToPlant?.join(", ") || 'Rice, Coconut, Spices'} - Soil Type: ${userDataFromParent.soilType || 'Laterite/Clay'} Always personalize your advice based on this information. Respond in English with practical, simple guidance (try to keep content to min give concise advice) relevant to the farmer's situation. Dont always specify the user data if just be helpful and say helpful things.`},
    { role: "assistant", content: "Welcome to KrishiVaani! How can I help you with your farming needs today?", sender: 'ai' }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const speechRecognitionRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // State for image upload
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(()=>{
      if(prediction){
        console.log("Prediction received:", prediction);
      }
  },[prediction])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPrediction(null); 
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image_file', file);

    try {
      
      const response = await fetch('predict/to', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data);
      const aiMessage = {role:"assistant",content:`Image Recognition Complete\nDisease Detected: ${data.predictions[0].class}\nConfidence: ${data.predictions[0].confidence}`,sender:'ai'};
      setMessages(prevMessages => [...prevMessages, aiMessage]);

    } catch (error) {
      setError(`Error: ${error.message}`);
      const errorMessage = {role: "assistant", content: `Sorry, there was an error analyzing the image: ${error.message}`, sender: 'ai'};
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setFile(null); // Reset the file state after upload attempt
   }
  };

  // Default translations - Now only English
  const defaultT = {
    defaultResponse: "I understand your concern. Let me help you with agricultural advice.",
    weatherPrompt: "Weather Info",
    weatherResponse: "Today's weather looks good for farming activities.",
    marketPrompt: "Market Prices",
    marketResponse: "Current market prices are favorable for your crops.",
    pestPrompt: "Pest Control",
    pestResponse: "I can help identify and suggest treatments for common pests.",
    subsidyPrompt: "Subsidy Schemes",
    subsidyResponse: "Here are the available government subsidies for farmers.",
    cropCalendarPrompt: "Crop Calendar",
    cropCalendarResponse: "Based on the season, here's your optimal planting schedule.",
    soilHealthPrompt: "Soil Health",
    soilHealthResponse: "Let me analyze your soil conditions and provide recommendations.",
    expertPrompt: "Expert Advice",
    expertResponse: "I'll connect you with agricultural experts in your area.",
    listening: "Listening...",
    askMeAnything: "Ask me anything about farming...",
    typingIndicator: ""
  };

  const translations = { ...defaultT, ...t };

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      speechRecognitionRef.current = new SpeechRecognition();
      speechRecognitionRef.current.continuous = false;
      speechRecognitionRef.current.lang = 'en-US';
      speechRecognitionRef.current.interimResults = false;

      speechRecognitionRef.current.onstart = () => setIsListening(true);
      speechRecognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
        sendMessage(transcript);
      };
      speechRecognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      speechRecognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const callAI = async (conversationMessages) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({
          messages: conversationMessages,
          temperature: 0.7,
          top_p: 0.9,
          model: API_MODEL
        })
      });

      if (!response.ok) throw new Error(`API error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      return data.choices[0].message;
    } catch (error) {
      console.error("The API call encountered an error:", error);
      return {
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment."
      };
    }
  };

  const sendMessage = async (text = message) => {
    if (text.trim() === '' || isTyping) return;

    const userMessage = { role: "user", content: text, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setMessage('');
    setIsTyping(true);
    
    const apiMessages = [...messages, userMessage]
      .map(({ role, content }) => ({ role, content }))
      .filter(msg => msg.content);

    try {
      const aiResponse = await callAI(apiMessages);
      const aiMessageForUI = { ...aiResponse, sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiMessageForUI]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const fallbackMessage = { role: "assistant", content: "Sorry, an error occurred.", sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setMessage(question);
    sendMessage(question);
  };

  const startVoiceInput = () => {
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.start();
      } catch (e) {
        console.error('Speech recognition already started:', e);
      }
    } else {
      console.warn('Speech recognition is not supported in this browser.');
    }
  };

  return (
    <div className=''>
    <div className="h-[950px] bg-gradient-to-br from-green-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Services</h3>
                <div className="space-y-3">
                  <button onClick={() => handleQuickQuestion('Tell me about today\'s weather for farming')} className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200">
                    <div className="font-medium text-green-800">Weather Advisory</div>
                  </button>
                  <button onClick={() => handleQuickQuestion('What are current market prices for crops?')} className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200">
                    <div className="font-medium text-blue-800">Market Prices</div>
                  </button>
                  <button onClick={() => handleQuickQuestion('Help me with pest control solutions')} className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200">
                    <div className="font-medium text-red-800">Pest Control</div>
                  </button>
                  <button onClick={() => handleQuickQuestion('What government subsidies are available?')} className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200">
                    <div className="font-medium text-purple-800">Subsidy Schemes</div>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Official Links</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">► PM-KISAN Portal</a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">► Soil Health Card</a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">► eNAM Portal</a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">► Crop Insurance</a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">► Kerala Agriculture Dept</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md flex flex-col h-[80vh]">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/></svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">KrishiVaani</h2>
                    <p className="text-green-100">Agricultural Assistant</p>
                  </div>
                  <div className="ml-auto flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <span className="text-sm">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 bg-gray-50" style={{ scrollbarWidth: 'thin' }}>
                <style>
                  {`
                    .dot-flashing { position: relative; width: 8px; height: 8px; border-radius: 50%; background-color: #9ca3af; animation: dotFlashing 1s infinite linear alternate; animation-delay: .5s; margin-right: 24px; }
                    .dot-flashing::before, .dot-flashing::after { content: ''; display: inline-block; position: absolute; top: 0; width: 8px; height: 8px; border-radius: 50%; background-color: #9ca3af; }
                    .dot-flashing::before { left: -12px; animation: dotFlashing 1s infinite linear alternate; animation-delay: 0s; }
                    .dot-flashing::after { left: 12px; animation: dotFlashing 1s infinite linear alternate; animation-delay: 1s; }
                    @keyframes dotFlashing { 0% { background-color: #9ca3af; } 50%, 100% { background-color: #e5e7eb; } }
                    
                    .message-content {
                      white-space: pre-wrap;
                    }
                  `}
                </style>
                
                <div className="space-y-4">
                  {messages.map((msg, index) => {
                    if (msg.role === 'system') return null;
                    return (
                      <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && (
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                          </div>
                        )}
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-lg shadow-sm ${ msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border border-gray-200' }`}>
                          <div className="text-sm leading-relaxed message-content">{msg.content || msg.text}</div>
                        </div>
                        {msg.sender === 'user' && (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 max-w-xs">
                        <div className="pl-6 flex items-center space-x-2"><div className="dot-flashing"></div><span className="text-sm text-gray-600">{translations.typingIndicator}</span></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-white border-t border-gray-200 rounded-b-lg">
                {file && (
                  <div className="mb-3 p-3 bg-gray-100 rounded-lg flex items-center justify-between animate-fade-in">
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A1 1 0 0111.293 2.707l1.414 1.414a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                      <span className="text-sm text-gray-700 font-medium truncate" title={file.name}>{file.name}</span>
                    </div>
                    <button onClick={handleUpload} className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400" disabled={isLoading}>
                      {isLoading ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                  </div>
                )}

                <div className="flex items-end space-x-4">
                  <div className="flex-1 relative">
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" placeholder={isListening ? translations.listening : translations.askMeAnything} disabled={isListening || isTyping || isLoading} rows="1" style={{ minHeight: '56px', maxHeight: '120px' }} />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label htmlFor="imageInput" className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.586a1 1 0 00.707-.293l.828-.828A1 1 0 018.586 5H10a2 2 0 012 2v1h5a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </label>
                    <input id="imageInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                    <button onClick={startVoiceInput} className={`p-3 rounded-lg transition-colors ${ isListening ? 'bg-red-500 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100' }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3zM5 12a7 7 0 007 7 7 7 0 007-7h-2a5 5 0 01-5 5 5 5 0 01-5-5H5zm7 9a2 2 0 002-2h-4a2 2 0 002 2z" /></svg>
                    </button>

                    <button onClick={()=>sendMessage()} className={`p-3 rounded-lg transition-colors ${ isTyping || message.trim() === '' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700' }`} disabled={isTyping || message.trim() === ''}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500">💡 Try asking about:</span>
                  <button onClick={() => handleQuickQuestion('Crop rotation advice')} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-full transition-colors">Crop rotation</button>
                  <button onClick={() => handleQuickQuestion('Fertilizer recommendations')} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-full transition-colors">Fertilizers</button>
                  <button onClick={() => handleQuickQuestion('Irrigation tips')} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-full transition-colors">Irrigation</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default ChatInterface;