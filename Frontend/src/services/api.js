/**
 * This file contains mock functions that simulate API calls for various services.
 * In a real application, these functions would be replaced with actual fetch requests
 * to a backend server or external APIs.
 */

/**
 * Fetches mock weather data.
 * @returns {Promise<Object>} A promise that resolves with the mock weather data.
 */
export const fetchWeatherData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        temperature: 28,
        humidity: 75,
        windSpeed: 15,
        forecast: [
          { day: 'Mon', high: 30, low: 22 },
          { day: 'Tue', high: 28, low: 20 },
          { day: 'Wed', high: 25, low: 18 },
          { day: 'Thu', high: 26, low: 19 },
          { day: 'Fri', high: 27, low: 20 },
          { day: 'Sat', high: 29, low: 21 },
          { day: 'Sun', high: 30, low: 22 },
        ],
      });
    }, 500); // Simulate network delay
  });
};

/**
 * Fetches mock market price data.
 * @returns {Promise<Object>} A promise that resolves with the mock market price data.
 */
export const fetchMarketPrices = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { crop: 'rice', price: '₹45/kg' },
        { crop: 'tomato', price: '₹20/kg' },
        { crop: 'coconut', price: '₹35/nut' },
        { crop: 'pepper', price: '₹550/kg' },
      ]);
    }, 500); // Simulate network delay
  });
};

/**
 * Simulates an AI pest diagnosis based on an image.
 * @param {string} base64Image The base64-encoded image data.
 * @returns {Promise<Object>} A promise that resolves with a diagnosis result.
 */
export const diagnosePest = async (base64Image) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const isPest = base64Image.length > 1000; // Mock check
      if (isPest) {
        resolve({
          success: true,
          diagnosis: "Fungal Blight",
          recommendation: "Apply a baking soda solution every 3 days. Improve air circulation around the plant.",
          imageAnalysis: "Analysis of the image shows white, powdery patches on the leaves, consistent with Fungal Blight."
        });
      } else {
        resolve({
          success: false,
          diagnosis: "No Pests Detected",
          recommendation: "Your plant appears healthy. Continue to monitor and provide proper care.",
          imageAnalysis: "The image does not show any signs of pests or disease."
        });
      }
    }, 1500); // Longer delay to simulate AI processing
  });
};

/**
 * Simulates getting a response from an AI chatbot.
 * @param {string} query The user's query.
 * @returns {Promise<string>} A promise that resolves with a simulated AI response.
 */
export const getAIResponse = async (query) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes("weather")) {
        resolve("The current weather is mostly sunny with a chance of afternoon rain. The temperature is 28°C. Consider waiting for the rain to subside before heading out for field work.");
      } else if (lowerQuery.includes("pest") || lowerQuery.includes("disease")) {
        resolve("Pest control is crucial for a healthy harvest. Common organic remedies include neem oil and soap water spray. For a specific diagnosis, please upload an image of your plant in the pest control section.");
      } else if (lowerQuery.includes("market") || lowerQuery.includes("price")) {
        resolve("The latest market price for rice is ₹45/kg. Prices can vary daily, so please check the market prices section for real-time updates.");
      } else if (lowerQuery.includes("soil")) {
        resolve("Soil health is the foundation of good farming. You can get your soil tested to check its pH and nutrient levels. This will help you decide on the right fertilizer or organic compost.");
      } else if (lowerQuery.includes("subsidies") || lowerQuery.includes("schemes")) {
        resolve("There are several government schemes available for farmers, such as PM-KISAN and the Crop Insurance scheme. You can find more details and eligibility criteria in the subsidies section.");
      } else if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
        resolve("Hello! I am your AI farmer assistant. How can I help you today?");
      } else {
        resolve("I'm sorry, I couldn't find a specific answer for that. Please try rephrasing your question or check the quick-access cards for relevant information.");
      }
    }, 1000); // Simulate AI response time
  });
};