/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout } from "lucide-react";

// Array of images with a more natural, earthy tone for the slider
const sliderImages = [
  "https://i.pinimg.com/736x/93/25/ae/9325ae5a8e9ae115844aa2e7208ef201.jpg",
  "https://www.shutterstock.com/image-photo/november112017traditional-kerala-agriculture-farming-palakkad-260nw-1812291547.jpg",
  "https://live.staticflickr.com/333/17993704494_f30b2feb68_b.jpg",
  "https://media.istockphoto.com/id/1145439237/photo/farmers-working-in-rice-field.jpg?s=612x612&w=0&k=20&c=Op0ZwIR0wTgD5g5Suhnr_U0_2bmQk_UFv8oAt6xAJs4="
];

// Reusable component for the service cards
const ServiceCard = ({ icon, title, description, darkMode }) => (
  <motion.div
    className={`bg-white/10 rounded-3xl p-8 flex flex-col items-center text-center transform transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-200/50 border border-green-500/20 backdrop-blur-md`}
    whileHover={{ scale: 1.05 }}
  >
    <div className="mb-6 inline-block p-5 rounded-full bg-green-100 text-green-600">
      {icon}
    </div>
    <h3 className={`text-2xl font-bold mb-2 text-white`}>
      {title}
    </h3>
    <p className={`leading-relaxed text-gray-200`}>
      {description}
    </p>
  </motion.div>
);

const HomePage = ({ onOpenLogin, onOpenSignup, onOpenAdminLogin, onOpenAdminSignup }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'ml' for Malayalam
  const [userMode, setUserMode] = useState('user'); // State for user/admin mode

  // Refs for smooth scrolling
  const heroRef = useRef(null);
  const solutionsRef = useRef(null);
  const aboutUsRef = useRef(null);
  const contactRef = useRef(null);

  // Set the automatic image slider interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % sliderImages.length
      );
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu on click
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ml' : 'en');
  };

  // Framer Motion variants for section animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // English Translations
  const translationsEn = {
    tagline: "Empowering Farmers, Strengthening the Nation",
    heroText: "Digital initiatives for a greener and more prosperous India. Our commitment is to the welfare and prosperity of every farmer.",
    getStarted: "Get Started",
    knowMore: "Know More",
    serviceTitle: "Our Farming Solutions",
    service1Title: "Soil Health Monitoring",
    service1Desc: "Gain deep insights into your soil's composition to optimize crop growth and nutrient use.",
    service2Title: "Water Management",
    service2Desc: "Smart irrigation systems that conserve water while ensuring your crops get what they need.",
    service3Title: "Crop Yield Prediction",
    service3Desc: "Use our AI-powered forecasts to make better decisions and maximize your harvest.",
    ourMission: "Our Mission",
    aboutUsText1: "Founded on the belief that technology can transform traditional farming, Krishivaani is dedicated to empowering a new generation of growers. We provide innovative, data-driven solutions to help farmers increase their yields, conserve resources, and build a more sustainable future for agriculture.",
    aboutUsText2: "Our team of agricultural experts and tech innovators works tirelessly to develop tools that are both powerful and easy to use, ensuring every farmer has the means to succeed in a changing climate.",
    signUpTitle: "Join the Community",
    signUpText: "Join thousands of farmers already using our platform to boost productivity and ensure a sustainable future.",
    startTrial: "Get Started",
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    footerDesc: "Empowering farmers with smart, sustainable, and profitable agricultural solutions for a greener future.",
    allRightsReserved: "All Rights Reserved",
    home: "Home",
    solutions: "Solutions",
    aboutUs: "About Us",
    contact: "Contact",
    login: "Login",
    signup: "Sign Up",
    adminLogin: "Admin Login",
    adminSignup: "Admin Sign Up",
  };

  // Malayalam Translations
  const translationsMl = {
    tagline: "കർഷകരെ ശാക്തീകരിക്കുക, രാഷ്ട്രത്തെ ശക്തിപ്പെടുത്തുക",
    heroText: "കൂടുതൽ പച്ചപ്പുള്ളതും അഭിവൃദ്ധിയുള്ളതുമായ ഇന്ത്യക്കുവേണ്ടിയുള്ള ഡിജിറ്റൽ സംരംഭങ്ങൾ. ഓരോ കർഷകന്റെയും ക്ഷേമത്തിനും സമൃദ്ധിക്കും വേണ്ടിയുള്ളതാണ് ഞങ്ങളുടെ പ്രതിബദ്ധത.",
    getStarted: "ആരംഭിക്കുക",
    knowMore: "കൂടുതൽ അറിയുക",
    serviceTitle: "ഞങ്ങളുടെ കാർഷിക പരിഹാരങ്ങൾ",
    service1Title: "മണ്ണിന്റെ ആരോഗ്യ നിരീക്ഷണം",
    service1Desc: "വിളകളുടെ വളർച്ചയും പോഷക ഉപയോഗവും ഒപ്റ്റിമൈസ് ചെയ്യുന്നതിന് നിങ്ങളുടെ മണ്ണിന്റെ ഘടനയെക്കുറിച്ച് ആഴത്തിലുള്ള ഉൾക്കാഴ്ച നേടുക.",
    service2Title: "ജല മാനേജ്മെന്റ്",
    service2Desc: "നിങ്ങളുടെ വിളകൾക്ക് ആവശ്യമുള്ളത് ലഭിക്കുമ്പോൾ ജലം സംരക്ഷിക്കുന്ന സ്മാർട്ട് ജലസേചന സംവിധാനങ്ങൾ.",
    service3Title: "വിളവ് പ്രവചനം",
    service3Desc: "മികച്ച തീരുമാനങ്ങൾ എടുക്കുന്നതിനും നിങ്ങളുടെ വിളവ് പരമാവധി വർദ്ധിപ്പിക്കുന്നതിനും ഞങ്ങളുടെ AI-യുടെ സഹായത്തോടെയുള്ള പ്രവചനങ്ങൾ ഉപയോഗിക്കുക.",
    ourMission: "ഞങ്ങളുടെ ലക്ഷ്യം",
    aboutUsText1: "സാങ്കേതികവിദ്യക്ക് പരമ്പരാഗത കൃഷിയെ പരിവർത്തനം ചെയ്യാൻ കഴിയുമെന്ന് വിശ്വസിച്ചുകൊണ്ട്, പുതിയൊരു തലമുറയിലെ കർഷകരെ ശാക്തീകരിക്കുന്നതിന് കൃഷിവാണി സമർപ്പിതമാണ്. കർഷകർക്ക് വിളവ് വർദ്ധിപ്പിക്കുന്നതിനും വിഭവങ്ങൾ സംരക്ഷിക്കുന്നതിനും കൃഷിയുടെ കൂടുതൽ സുസ്ഥിരമായ ഭാവി കെട്ടിപ്പടുക്കുന്നതിനും സഹായിക്കുന്ന നൂതനമായ, ഡാറ്റാ-അധിഷ്ഠിത പരിഹാരങ്ങൾ ഞങ്ങൾ നൽകുന്നു.",
    aboutUsText2: "ഞങ്ങളുടെ കാർഷിക വിദഗ്ദ്ധരുടെയും സാങ്കേതിക കണ്ടുപിടുത്തക്കാരുടെയും ടീം, മാറിക്കൊണ്ടിരിക്കുന്ന കാലാവസ്ഥയിൽ ഓരോ കർഷകനും വിജയിക്കാൻ ആവശ്യമായ മാർഗ്ഗങ്ങൾ ഉണ്ടെന്ന് ഉറപ്പാക്കാൻ, ശക്തവും എളുപ്പത്തിൽ ഉപയോഗിക്കാൻ കഴിയുന്നതുമായ ടൂളുകൾ വികസിപ്പിക്കാൻ അശ്രാന്തമായി പരിശ്രമിക്കുന്നു.",
    signUpTitle: "കമ്മ്യൂണിറ്റിയിൽ ചേരുക",
    signUpText: "ഉൽപ്പാദനക്ഷമത വർദ്ധിപ്പിക്കാനും സുസ്ഥിരമായ ഒരു ഭാവി ഉറപ്പാക്കാനും ഞങ്ങളുടെ പ്ലാറ്റ്‌ഫോം ഉപയോഗിക്കുന്ന ആയിരക്കണക്കിന് കർഷകർക്കൊപ്പം ചേരുക.",
    startTrial: "നിങ്ങളുടെ സൗജന്യ ട്രയൽ ആരംഭിക്കുക",
    quickLinks: "പ്രധാന ലിങ്കുകൾ",
    followUs: "ഞങ്ങളെ പിന്തുടരുക",
    footerDesc: "സ്മാർട്ട്, സുസ്ഥിരവും ലാഭകരവുമായ കാർഷിക പരിഹാരങ്ങൾ നൽകി കർഷകരെ ശാക്തീകരിച്ച് കൂടുതൽ പച്ചപ്പുള്ള ഭാവിക്കായി പ്രവർത്തിക്കുന്നു.",
    allRightsReserved: "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം",
    home: "Home",
    solutions: "പരിഹാരങ്ങൾ",
    aboutUs: "ഞങ്ങളെക്കുറിച്ച്",
    contact: "ബന്ധപ്പെടുക",
    login: "ലോഗിൻ",
    signup: "സൈൻ അപ്പ്",
    adminLogin: "അഡ്മിൻ ലോഗിൻ",
    adminSignup: "അഡ്മിൻ സൈൻ അപ്പ്",
  };

  const translations = language === 'en' ? translationsEn : translationsMl;

  return (
    <main className={`${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-800'} min-h-screen transition-colors duration-500`}>
      {/* HERO SECTION with merged NAVBAR */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center text-white text-center overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Navbar */}
        <motion.nav
          className="absolute top-0 left-0 w-full z-20 bg-black/30 backdrop-blur-sm py-4 px-4 md:px-8 lg:px-12"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
            {/* Brand/Logo */}
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-white">Krishivaani</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 items-center">
              <a onClick={() => handleScrollTo(heroRef)} className="cursor-pointer text-gray-200 hover:text-white font-semibold transition-colors">{translations.home}</a>
              <a onClick={() => handleScrollTo(solutionsRef)} className="cursor-pointer text-gray-200 hover:text-white font-semibold transition-colors">{translations.solutions}</a>
              <a onClick={() => handleScrollTo(aboutUsRef)} className="cursor-pointer text-gray-200 hover:text-white font-semibold transition-colors">{translations.aboutUs}</a>
              <a onClick={() => handleScrollTo(contactRef)} className="cursor-pointer text-gray-200 hover:text-white font-semibold transition-colors">{translations.contact}</a>

              <div className="h-6 w-px bg-gray-400"></div>

              <div className="flex items-center bg-white/10 rounded-full border border-gray-500 p-1 text-sm">
                <button onClick={() => setUserMode('user')} className={`py-1 px-4 rounded-full transition-colors ${userMode === 'user' ? 'bg-green-600 text-white' : 'text-gray-200'}`}>User</button>
                <button onClick={() => setUserMode('admin')} className={`py-1 px-4 rounded-full transition-colors ${userMode === 'admin' ? 'bg-green-600 text-white' : 'text-gray-200'}`}>Admin</button>
              </div>

              {userMode === 'user' ? (
                <>
                  <motion.button onClick={onOpenLogin} className="py-2 px-6 rounded-full text-white font-semibold hover:bg-white/10 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{translations.login}</motion.button>
                  <motion.button onClick={onOpenSignup} className="py-2 px-6 rounded-full bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{translations.signup}</motion.button>
                </>
              ) : (
                <>
                  <motion.button onClick={onOpenAdminLogin} className="py-2 px-6 rounded-full text-white font-semibold hover:bg-white/10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{translations.adminLogin}</motion.button>
                  <motion.button onClick={onOpenAdminSignup} className="py-2 px-6 rounded-full bg-green-600 text-white font-semibold shadow-md hover:bg-green-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{translations.adminSignup}</motion.button>
                </>
              )}
              
              <button onClick={toggleLanguage} className="py-2 px-4 rounded-full text-white font-semibold hover:bg-white/10 transition-colors">{language === 'en' ? 'മലയാളം' : 'English'}</button>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-white rounded-full transition-transform hover:scale-110">{darkMode ? '☀️' : '🌙'}</button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggleLanguage} className="py-2 px-4 rounded-full text-white font-semibold hover:bg-white/10 transition-colors">{language === 'en' ? 'മലയാളം' : 'English'}</button>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-white rounded-full transition-transform hover:scale-110">{darkMode ? '☀️' : '🌙'}</button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-200 hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 space-y-2 bg-black/30 backdrop-blur-sm rounded-lg p-2"
              >
                <a onClick={() => handleScrollTo(heroRef)} className="cursor-pointer block py-2 px-4 text-sm font-semibold text-gray-200 hover:bg-white/10 rounded-lg">{translations.home}</a>
                <a onClick={() => handleScrollTo(solutionsRef)} className="cursor-pointer block py-2 px-4 text-sm font-semibold text-gray-200 hover:bg-white/10 rounded-lg">{translations.solutions}</a>
                <a onClick={() => handleScrollTo(aboutUsRef)} className="cursor-pointer block py-2 px-4 text-sm font-semibold text-gray-200 hover:bg-white/10 rounded-lg">{translations.aboutUs}</a>
                <a onClick={() => handleScrollTo(contactRef)} className="cursor-pointer block py-2 px-4 text-sm font-semibold text-gray-200 hover:bg-white/10 rounded-lg">{translations.contact}</a>
                <div className="h-px w-full bg-gray-600"></div>
                <div className="flex items-center justify-center bg-white/10 rounded-full mx-2 my-2 p-1 text-sm">
                    <button onClick={() => setUserMode('user')} className={`w-full py-1 px-4 rounded-full transition-colors ${userMode === 'user' ? 'bg-green-600 text-white' : 'text-gray-200'}`}>User</button>
                    <button onClick={() => setUserMode('admin')} className={`w-full py-1 px-4 rounded-full transition-colors ${userMode === 'admin' ? 'bg-green-600 text-white' : 'text-gray-200'}`}>Admin</button>
                </div>
                {userMode === 'user' ? (
                  <>
                    <button onClick={onOpenLogin} className="w-full text-left py-2 px-4 text-sm font-semibold text-white hover:bg-white/10 rounded-lg">{translations.login}</button>
                    <button onClick={onOpenSignup} className="w-full text-left py-2 px-4 text-sm font-semibold bg-green-600 text-white hover:bg-green-700 rounded-lg">{translations.signup}</button>
                  </>
                ) : (
                  <>
                    <button onClick={onOpenAdminLogin} className="w-full text-left py-2 px-4 text-sm font-semibold text-white hover:bg-white/10 rounded-lg">{translations.adminLogin}</button>
                    <button onClick={onOpenAdminSignup} className="w-full text-left py-2 px-4 text-sm font-semibold bg-green-600 text-white hover:bg-green-700 rounded-lg">{translations.adminSignup}</button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={sliderImages[currentImageIndex]}
              alt="Farming and Technology"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/60"></div>
          {/* New gradient overlay for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8 pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-24 md:pb-32">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-md">
              {translations.tagline}
            </h1>
            <p className="text-xl sm:text-2xl text-green-100 mb-10 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
              {translations.heroText}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                onClick={onOpenSignup}
                className="py-4 px-10 rounded-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {translations.getStarted}
              </motion.button>
              <motion.button
                onClick={() => handleScrollTo(solutionsRef)}
                className="py-4 px-10 rounded-full border-2 border-green-600 text-white text-lg font-semibold hover:bg-green-50/10 transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {translations.knowMore}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* SOLUTIONS HEADING SECTION */}
      <motion.section
        ref={solutionsRef}
        className={`${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-800'} py-20 sm:py-24 px-4 md:px-8 text-center transition-colors duration-500`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {translations.serviceTitle}
          </h2>
          <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Our cutting-edge solutions are designed to optimize every stage of your farming cycle, from soil to harvest, ensuring maximum efficiency and sustainability.
          </p>
        </div>
      </motion.section>

      {/* SOIL HEALTH MONITORING SECTION */}
      <motion.section
        className={`relative py-20 sm:py-24 px-4 md:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-500`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {translations.service1Title}
            </h2>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {translations.service1Desc}
            </p>
            <p className={`mt-4 text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our advanced soil sensors and analytics provide real-time data on your soil's composition, moisture, and nutrient levels, allowing you to make informed decisions and reduce waste.
            </p>
          </div>
          <div className="md:w-1/2">
            <motion.img
              src="https://sense.digitalmatter.com/hubfs/Soil-min.jpeg"
              alt="Soil Health Monitoring"
              className="rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </motion.section>

      {/* WATER MANAGEMENT SECTION */}
      <motion.section
        className={`relative py-20 sm:py-24 px-4 md:px-8 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-500`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {translations.service2Title}
            </h2>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {translations.service2Desc}
            </p>
            <p className={`mt-4 text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our smart irrigation systems use weather forecasts and soil moisture data to schedule watering precisely when and where it's needed, saving water and improving crop health.
            </p>
          </div>
          <div className="md:w-1/2">
            <motion.img
              src="https://www.thestatesman.com/wp-content/uploads/2022/11/Sprinkler-irrigation-system-smart-water-conservation-technique-farmsio.jpg"
              alt="Water Management"
              className="rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </motion.section>
      
      {/* CROP YIELD PREDICTION SECTION */}
      <motion.section
        className={`relative py-20 sm:py-24 px-4 md:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-500`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <motion.img
              src="https://www.itcinfotech.com/wp-content/uploads/2020/11/agrigator-digital-farming-platform-pic-ds1.jpg"
              alt="Crop Yield Prediction"
              className="rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {translations.service3Title}
            </h2>
            <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {translations.service3Desc}
            </p>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our cutting-edge predictive models use satellite imagery, historical data, and real-time weather information to provide highly accurate yield forecasts, helping you optimize resource allocation and financial planning.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ABOUT US SECTION */}
      <motion.section
        ref={aboutUsRef}
        className={`relative py-20 sm:py-24 px-4 md:px-8 bg-cover bg-center transition-colors duration-500`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {translations.ourMission}
            </h2>
            <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {translations.aboutUsText1}
            </p>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {translations.aboutUsText2}
            </p>
          </div>
          <div className="md:w-1/2">
            <motion.img
              src="https://soiloptix.com/wp-content/uploads/2023/06/Digital-farming-Solutions-scaled.jpg"
              alt="About Us"
              className="rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </motion.section>

      
      {/* CONTACT SECTION */}
      <motion.section
        ref={contactRef}
        className={`${darkMode ? 'bg-gray-900' : 'bg-gray-200'} py-20 px-4 md:px-8 text-center transition-colors duration-500`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="relative max-w-screen-xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {translations.signUpTitle}
          </h2>
          <p className={`text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {translations.signUpText}
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={onOpenSignup}
              className="py-4 px-10 rounded-full bg-green-600 text-white text-lg font-semibold shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {translations.startTrial}
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className={`${darkMode ? 'bg-gray-950 text-gray-300' : 'bg-gray-800 text-gray-200'} py-16 px-4 md:px-8 transition-colors duration-500`}>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">Krishivaani</span>
            </div>
            <p className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              {translations.footerDesc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">{translations.quickLinks}</h4>
            <ul className="space-y-3">
              <li><a onClick={() => handleScrollTo(heroRef)} className="cursor-pointer text-gray-400 hover:text-green-400 transition-colors">{translations.home}</a></li>
              <li><a onClick={() => handleScrollTo(solutionsRef)} className="cursor-pointer text-gray-400 hover:text-green-400 transition-colors">{translations.solutions}</a></li>
              <li><a onClick={() => handleScrollTo(aboutUsRef)} className="cursor-pointer text-gray-400 hover:text-green-400 transition-colors">{translations.aboutUs}</a></li>
              <li><a onClick={() => handleScrollTo(contactRef)} className="cursor-pointer text-gray-400 hover:text-green-400 transition-colors">{translations.contact}</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-6">{translations.followUs}</h4>
            <ul className="flex space-x-6">
              <li>
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-2.1 1.6-4 2.1c-.8.2-1.6.4-2.4.5-1-.2-2.1-.3-3.2-.3-2 0-3.9.7-5.5 2.1-1.6 1.4-2.6 3.4-2.9 5.6C3.9 14.1 2.8 15 1.5 15.6c.5-.1 1-.2 1.5-.3 1.3-.2 2.5-.5 3.7-1a8.5 8.5 0 0 1-5.6-7.5c.3.5.7.9 1.1 1.3 1.2 1.2 2.7 2.1 4.4 2.6C12 17.6 15 18 18 18c-1.5 1.5-3.5 2.4-5.6 2.6-1.5.2-3.1 0-4.6-.3-2.1.2-4.1-.1-6.1-.8-1.7-.6-3.3-1.4-4.8-2.5 1.8.8 3.7 1.3 5.6 1.5 1.7.2 3.4.2 5.1 0 1.7-.2 3.3-.7 4.9-1.5 1.4-.7 2.7-1.6 3.9-2.6 1.1-1 2-2.2 2.8-3.4.7-1.3 1.1-2.6 1.1-4 0-.6-.1-1.2-.2-1.8 1.4-.8 2.5-1.9 3.4-3.2-.8.4-1.6.8-2.5 1.1-1.2.5-2.5.8-3.9 1 1.4-1.2 2.4-2.8 2.7-4.7z"></path></svg>
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={`text-center pt-8 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-300'}`}>
          &copy; {new Date().getFullYear()} Krishivaani. {translations.allRightsReserved}
        </div>
      </footer>
    </main>
  );
};

export default HomePage;