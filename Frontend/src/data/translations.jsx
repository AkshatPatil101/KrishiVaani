/**
 * This object contains all the text translations for the application.
 * It is structured to allow easy switching between languages.
 */
const translations = {
  en: {
    // App and general UI
    appTitle: "Krishi Vaani",
    languageToggle: "മലയാളം",
    chatPlaceholder: "How can I help you today?",
    sendMessage: "Send",
    quickQuestions: "Quick Questions:",
    listening: "Listening...",
    voiceRecognized: "Voice recognized!",
    micOff: "Turn on your mic",
    uploadImage: "Upload Image",
    dropImageHere: "Drag and drop an image here or click to select a file",
    analyzingImage: "Analyzing image...",
    
    // Quick Actions and Modals
    weather: "Weather",
    weatherSub: "Real-time updates & forecast",
    marketPrices: "Market Prices",
    marketPricesSub: "Check latest crop prices",
    pestControl: "Pest Control",
    pestControlSub: "Diagnose and find remedies",
    subsidies: "Subsidies",
    subsidiesSub: "Check government schemes",
    cropCalendar: "Crop Calendar",
    cropCalendarSub: "Manage planting & harvesting",
    soilHealth: "Soil Health",
    soilHealthSub: "Analyze soil and get recommendations",
    expertConnect: "Expert Connect",
    expertConnectSub: "Chat with an agronomist",

    // Weather Modal
    weatherTitle: "Weather Info",
    weatherSubtitle: "Stay updated on the climate for smart farming.",
    currentWeather: "Current Weather",
    temperature: "Temperature",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    forecast7Day: "7-Day Forecast",
    smartAdvice: "Smart Farming Advice",
    adviceWeatherRain: "It's going to rain, so prepare for planting and harvesting.",
    adviceWeatherDry: "The weather is dry, so be prepared to irrigate your fields.",
    adviceWeatherDefault: "Keep an eye on the weather forecast and plan your farming activities accordingly.",

    // Market Modal
    marketTitle: "Market Prices",
    marketSubtitle: "Latest prices for key crops.",
    crop: "Crop",
    price: "Price",
    rice: "Rice",
    tomato: "Tomato",
    coconut: "Coconut",
    pepper: "Pepper",
    
    // Pest Control Modal
    pestTitle: "Pest Control",
    pestSubtitle: "Diagnose pests and find organic remedies.",
    pestDiagnosis: "AI Pest Diagnosis",
    pestList: "Common Pests & Remedies",
    pestGuideTitle: "Pest Guide: Common solutions",
    pestGuideContent: "Here are some common pests and organic solutions. You can also upload an image of your plant for an AI-powered diagnosis.",
    pests: [
      { name: "Aphids", solution: "Use a soap and water spray." },
      { name: "Caterpillars", solution: "Introduce natural predators like ladybugs." },
      { name: "Fungal Blight", solution: "Improve air circulation and apply a baking soda solution." },
    ],
    
    // Subsidies Modal
    subsidiesTitle: "Government Subsidies",
    subsidiesSubtitle: "Explore schemes to boost your agricultural income.",
    scheme: "Scheme",
    description: "Description",
    link: "Link",
    pmKisan: "PM-KISAN",
    pmKisanDesc: "Income support scheme for farmers.",
    cropInsurance: "Crop Insurance",
    cropInsuranceDesc: "Financial support for crop loss.",
    soilHealthCard: "Soil Health Card",
    soilHealthCardDesc: "Provides info on soil nutrients.",
    
    // Crop Calendar Modal
    cropCalendarTitle: "Crop Calendar",
    cropCalendarSubtitle: "Manage your planting and harvesting schedules.",
    month: "Month",
    activity: "Activity",
    status: "Status",
    statusUpcoming: "Upcoming",
    statusInProgress: "In Progress",
    statusCompleted: "Completed",

    // Soil Health Modal
    soilHealthTitle: "Soil Health Report",
    soilHealthSubtitle: "A quick analysis for better yield.",
    ph: "pH",
    organicMatter: "Organic Matter",
    nitrogen: "Nitrogen",
    phosphorus: "Phosphorus",
    potassium: "Potassium",
    soilRecommendations: "Recommendations",
    recommendationContent: "Based on the analysis, your soil has a good pH balance but could use more nitrogen. Consider using organic fertilizers like compost to boost nutrient levels.",

    // Expert Connect Modal
    expertConnectTitle: "Expert Connect",
    expertConnectSubtitle: "Speak with a certified agronomist for personalized advice.",
    connectNow: "Connect Now",
    scheduleCall: "Schedule Call",
    online: "Online",
    busy: "Busy",
    offline: "Offline",

    // Know More
    tagline: 'Empowering Farmers, Strengthening the Nation',
    heroText: 'Digital initiatives for a greener and more prosperous India. Our commitment is to the welfare and prosperity of every farmer.',
    getStarted: 'Get Started',
    knowMore: 'Know More',
    serviceTitle: 'Our Key Services',
    service1Title: 'Weather & Crop Advisory',
    service1Desc: 'Receive real-time weather forecasts and expert advice for your crops.',
    service2Title: 'Subsidies & Schemes',
    service2Desc: 'Explore and apply for various government schemes and subsidies.',
    service3Title: 'Marketplace Integration',
    service3Desc: 'Connect directly with buyers and get the best prices for your produce.',
    signUp: 'Sign Up',
    login: 'Login',

  },
  ml: {
    // App and general UI
    appTitle: "கிருஷி வாணி",
    languageToggle: "English",
    chatPlaceholder: "ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?",
    sendMessage: "അയയ്ക്കുക",
    quickQuestions: "വേഗത്തിലുള്ള ചോദ്യങ്ങൾ:",
    listening: "ശ്രദ്ധിക്കുന്നു...",
    voiceRecognized: "ശബ്ദം തിരിച്ചറിഞ്ഞു!",
    micOff: "മൈക്ക് ഓൺ ചെയ്യുക",
    uploadImage: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    dropImageHere: "ഇവിടെ ഒരു ചിത്രം വലിച്ചിടുക അല്ലെങ്കിൽ ഒരു ഫയൽ തിരഞ്ഞെടുക്കാൻ ക്ലിക്ക് ചെയ്യുക",
    analyzingImage: "ചിത്രം വിശകലനം ചെയ്യുന്നു...",

    // Quick Actions and Modals
    weather: "കാലാവസ്ഥ",
    weatherSub: "തത്സമയ അപ്ഡേറ്റുകളും പ്രവചനവും",
    marketPrices: "വിപണി വില",
    marketPricesSub: "ഏറ്റവും പുതിയ വിളകളുടെ വില പരിശോധിക്കുക",
    pestControl: "കീട നിയന്ത്രണം",
    pestControlSub: "രോഗം നിർണ്ണയിക്കുകയും പരിഹാരം കണ്ടെത്തുകയും ചെയ്യുക",
    subsidies: "സബ്സിഡികൾ",
    subsidiesSub: "സർക്കാർ പദ്ധതികൾ പരിശോധിക്കുക",
    cropCalendar: "വിള കലണ്ടർ",
    cropCalendarSub: "നടീലും വിളവെടുപ്പും നിയന്ത്രിക്കുക",
    soilHealth: "മണ്ണിന്റെ ആരോഗ്യം",
    soilHealthSub: "മണ്ണ് വിശകലനം ചെയ്യുകയും ശുപാർശകൾ നേടുകയും ചെയ്യുക",
    expertConnect: "വിദഗ്ദ്ധരുമായി ബന്ധപ്പെടുക",
    expertConnectSub: "ഒരു കാർഷിക വിദഗ്ദ്ധനുമായി സംസാരിക്കുക",

    // Weather Modal
    weatherTitle: "കാലാവസ്ഥ വിവരങ്ങൾ",
    weatherSubtitle: "മികച്ച കൃഷിക്കായി കാലാവസ്ഥ അപ്ഡേറ്റുകൾ നേടുക.",
    currentWeather: "ഇപ്പോഴത്തെ കാലാവസ്ഥ",
    temperature: "താപനില",
    humidity: "ഈർപ്പം",
    windSpeed: "കാറ്റിന്റെ വേഗത",
    forecast7Day: "7-ദിവസത്തെ പ്രവചനം",
    smartAdvice: "മികച്ച കാർഷിക ഉപദേശം",
    adviceWeatherRain: "മഴ പെയ്യും, അതിനാൽ നടീലിനും വിളവെടുപ്പിനും തയ്യാറെടുക്കുക.",
    adviceWeatherDry: "കാലാവസ്ഥ വരണ്ടതാണ്, അതിനാൽ നിങ്ങളുടെ വയലുകളിൽ നനയ്ക്കാൻ തയ്യാറാകുക.",
    adviceWeatherDefault: "കാലാവസ്ഥാ പ്രവചനം ശ്രദ്ധിക്കുകയും നിങ്ങളുടെ കാർഷിക പ്രവർത്തനങ്ങൾ അതിനനുസരിച്ച് ആസൂത്രണം ചെയ്യുകയും ചെയ്യുക.",

    // Market Modal
    marketTitle: "വിപണി വില",
    marketSubtitle: "പ്രധാന വിളകളുടെ ഏറ്റവും പുതിയ വില.",
    crop: "വിള",
    price: "വില",
    rice: "അരി",
    tomato: "തക്കാളി",
    coconut: "തേങ്ങ",
    pepper: "കുരുമുളക്",

    // Pest Control Modal
    pestTitle: "കീട നിയന്ത്രണം",
    pestSubtitle: "കീടങ്ങളെ നിർണ്ണയിക്കുകയും ജൈവ പരിഹാരങ്ങൾ കണ്ടെത്തുകയും ചെയ്യുക.",
    pestDiagnosis: "AI കീട നിർണ്ണയം",
    pestList: "സാധാരണ കീടങ്ങളും പരിഹാരങ്ങളും",
    pestGuideTitle: "കീട നിർദ്ദേശങ്ങൾ: സാധാരണ പരിഹാരങ്ങൾ",
    pestGuideContent: "ചില സാധാരണ കീടങ്ങളും ജൈവ പരിഹാരങ്ങളും ഇതാ. AI-അധിഷ്ഠിത നിർണ്ണയത്തിനായി നിങ്ങളുടെ ചെടിയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യാനും കഴിയും.",
    pests: [
      { name: "അഫിഡ്‌സ്", solution: "സോപ്പും വെള്ളവും ഉപയോഗിച്ച് സ്പ്രേ ചെയ്യുക." },
      { name: "പുഴുക്കൾ", solution: "ലേഡിബഗ്സ് പോലുള്ള സ്വാഭാവിക ശത്രുക്കളെ ഉപയോഗിക്കുക." },
      { name: "ഫംഗസ് ബ്ലൈറ്റ്", solution: "വായുസഞ്ചാരം മെച്ചപ്പെടുത്തുകയും ബേക്കിംഗ് സോഡ ലായനി പ്രയോഗിക്കുകയും ചെയ്യുക." },
    ],
    
    // Subsidies Modal
    subsidiesTitle: "സർക്കാർ സബ്സിഡികൾ",
    subsidiesSubtitle: "നിങ്ങളുടെ കാർഷിക വരുമാനം വർദ്ധിപ്പിക്കാൻ പദ്ധതികൾ പരിശോധിക്കുക.",
    scheme: "പദ്ധതി",
    description: "വിവരണം",
    link: "ലിങ്ക്",
    pmKisan: "PM-കിസാൻ",
    pmKisanDesc: "കർഷകർക്കുള്ള വരുമാന പിന്തുണ പദ്ധതി.",
    cropInsurance: "വിള ഇൻഷുറൻസ്",
    cropInsuranceDesc: "വിള നഷ്ടത്തിനുള്ള സാമ്പത്തിക സഹായം.",
    soilHealthCard: "മണ്ണ് ആരോഗ്യ കാർഡ്",
    soilHealthCardDesc: "മണ്ണിലെ പോഷകങ്ങളെക്കുറിച്ചുള്ള വിവരങ്ങൾ നൽകുന്നു.",
    
    // Crop Calendar Modal
    cropCalendarTitle: "വിള കലണ്ടർ",
    cropCalendarSubtitle: "നിങ്ങളുടെ നടീൽ, വിളവെടുപ്പ് ഷെഡ്യൂളുകൾ നിയന്ത്രിക്കുക.",
    month: "മാസം",
    activity: "പ്രവർത്തനം",
    status: "നില",
    statusUpcoming: "വരാനിരിക്കുന്നത്",
    statusInProgress: "നടന്നുകൊണ്ടിരിക്കുന്നു",
    statusCompleted: "പൂർത്തിയായി",
    
    // Soil Health Modal
    soilHealthTitle: "മണ്ണിന്റെ ആരോഗ്യ റിപ്പോർട്ട്",
    soilHealthSubtitle: "മെച്ചപ്പെട്ട വിളവിനായുള്ള ഒരു വേഗത്തിലുള്ള വിശകലനം.",
    ph: "pH",
    organicMatter: "ജൈവ പദാർത്ഥം",
    nitrogen: "നൈട്രജൻ",
    phosphorus: "ഫോസ്ഫറസ്",
    potassium: "പൊട്ടാസ്യം",
    soilRecommendations: "ശുപാർശകൾ",
    recommendationContent: "വിശകലനം അനുസരിച്ച്, നിങ്ങളുടെ മണ്ണിന് നല്ല pH ബാലൻസ് ഉണ്ട്, എന്നാൽ കൂടുതൽ നൈട്രജൻ ആവശ്യമാണ്. പോഷകങ്ങൾ വർദ്ധിപ്പിക്കാൻ കമ്പോസ്റ്റ് പോലുള്ള ജൈവവളങ്ങൾ ഉപയോഗിക്കുന്നത് പരിഗണിക്കാം.",

    // Expert Connect Modal
    expertConnectTitle: "വിദഗ്ദ്ധരുമായി ബന്ധപ്പെടുക",
    expertConnectSubtitle: "വ്യക്തിഗത ഉപദേശത്തിനായി ഒരു സർട്ടിഫൈഡ് കാർഷിക വിദഗ്ദ്ധനുമായി സംസാരിക്കുക.",
    connectNow: "ഇപ്പോൾ ബന്ധപ്പെടുക",
    scheduleCall: "കോൾ ഷെഡ്യൂൾ ചെയ്യുക",
    online: "ഓൺലൈൻ",
    busy: "തിരക്കിലാണ്",
    offline: "ഓഫ്‌ലൈൻ",

    // Know More
    tagline: 'കർഷകരെ ശാക്തീകരിക്കുക, രാജ്യത്തെ ശക്തിപ്പെടുത്തുക',
    heroText: 'കൂടുതൽ പച്ചപ്പുള്ളതും സമൃദ്ധവുമായ ഇന്ത്യക്ക് വേണ്ടിയുള്ള ഡിജിറ്റൽ സംരംഭങ്ങൾ. ഓരോ കർഷകന്റെയും ക്ഷേമത്തിനും സമൃദ്ധിക്കും വേണ്ടിയുള്ളതാണ് ഞങ്ങളുടെ പ്രതിബദ്ധത.',
    getStarted: 'തുടങ്ങുക',
    knowMore: 'കൂടുതലറിയുക',
    serviceTitle: 'ഞങ്ങളുടെ പ്രധാന സേവനങ്ങൾ',
    service1Title: 'കാലാവസ്ഥ, വിള ഉപദേശം',
    service1Desc: 'നിങ്ങളുടെ വിളകൾക്കായി തത്സമയ കാലാവസ്ഥാ പ്രവചനങ്ങളും വിദഗ്ധ ഉപദേശവും നേടുക.',
    service2Title: 'സബ്സിഡികളും പദ്ധതികളും',
    service2Desc: 'വിവിധ സർക്കാർ പദ്ധതികളും സബ്സിഡികളും കണ്ടെത്തുകയും അപേക്ഷിക്കുകയും ചെയ്യുക.',
    service3Title: 'മാർക്കറ്റ് പ്ലേസ് സംയോജനം',
    service3Desc: 'വാങ്ങുന്നവരുമായി നേരിട്ട് ബന്ധപ്പെടുകയും നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾക്ക് മികച്ച വില നേടുകയും ചെയ്യുക.',
    signUp: 'സൈൻ അപ്പ്',
    login: 'ലോഗിൻ'
  },
};

export default translations;
