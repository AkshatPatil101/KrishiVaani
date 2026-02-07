import { useState } from 'react';

const citiesData = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati', 'Kurnool', 'Rajahmundry', 'Kakinada', 'Kadapa', 'Anantapur', 'Eluru', 'Ongole', 'Srikakulam', 'Vizianagaram', 'Machilipatnam', 'Chittoor'],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Pasighat', 'Naharlagun', 'Ziro'],
  'Assam': ['Guwahati', 'Tezpur', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon', 'Tinsukia', 'Sivasagar', 'Barpeta', 'Karimganj'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Arrah', 'Purnia', 'Bihar Sharif', 'Gopalganj', 'Motihari'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Bhilai', 'Rajnandgaon', 'Ambikapur', 'Raigarh', 'Dhamtari'],
  'Goa': ['Panaji', 'Vasco da Gama', 'Margao', 'Ponda', 'Mapusa', 'Bicholim'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Anand', 'Bharuch', 'Porbandar'],
  'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar', 'Karnal', 'Sonipat', 'Panchkula'],
  'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Mandi', 'Solan', 'Kullu', 'Chamba', 'Dalhousie', 'Hamirpur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Giridih', 'Deoghar', 'Ramgarh'],
  'Karnataka': ['Bengaluru', 'Mysore', 'Hubli-Dharwad', 'Mangalore', 'Belgaum', 'Davangere', 'Gulbarga', 'Shimoga', 'Tumkur', 'Hassan', 'Udupi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur', 'Alappuzha', 'Palakkad', 'Malappuram'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Kolhapur', 'Thane', 'Pimpri-Chinchwad', 'Nanded', 'Akola'],
  'Manipur': ['Imphal', 'Bishnupur', 'Thoubal', 'Churachandpur'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongpoh'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokukchung', 'Wokha'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore', 'Bhadrak'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Hoshiarpur', 'Mohali', 'Pathankot', 'Moga', 'Firozpur'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer', 'Bikaner', 'Alwar', 'Bhilwara', 'Sikar', 'Pali'],
  'Sikkim': ['Gangtok', 'Namchi', 'Mangan', 'Gyalshing'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Nagercoil'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Mahbubnagar', 'Adilabad', 'Siddipet'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Prayagraj', 'Meerut', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh', 'Haldwani', 'Roorkee', 'Rudrapur', 'Nainital'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Malda', 'Burdwan', 'Darjeeling', 'Kharagpur'],
  'Andaman and Nicobar Islands': ['Port Blair'],
  'Chandigarh': ['Chandigarh'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Silvassa'],
  'Delhi': ['New Delhi'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Kathua', 'Udhampur'],
  'Ladakh': ['Leh', 'Kargil'],
  'Lakshadweep': ['Kavaratti'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Mahé', 'Yanam']
};

const OnBoarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    phoneNumber: '',
    location: '',
    city: '',
    landArea: '',
    cropsToPlant: [],
    soilType: ''
  });

  const steps = [
    {
      title: "Contact Information",
      description: "Let's start with your contact details",
      fields: ['phoneNumber']
    },
    {
      title: "Location Details",
      description: "Where is your farm located?",
      fields: ['location']
    },
    {
      title: "City Details",
      description: "Which city or town is your farm in?",
      fields: ['city']
    },
    {
      title: "Farm Information",
      description: "Tell us about your farming area",
      fields: ['landArea']
    },
    {
      title: "Crop Planning",
      description: "What crops do you plan to grow?",
      fields: ['cropsToPlant']
    },
    {
      title: "Soil Information",
      description: "What type of soil do you have?",
      fields: ['soilType']
    }
  ];

  const handleInputChange = (field, value) => {
    setUserData(prev => {
      if (field === 'location' && prev.location !== value) {
        return {
          ...prev,
          [field]: value,
          city: ''
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const isCurrentStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => {
      if (field === 'cropsToPlant') {
        return userData[field].length > 0;
      }
      if (field === 'phoneNumber') {
        return /^\+?[0-9]{7,15}$/.test(userData.phoneNumber.trim());
      }
      if (field === 'landArea') {
        return parseFloat(userData.landArea) > 0;
      }
      return userData[field].trim() !== '';
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onComplete(userData);
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={userData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">State/Union Territory</label>
            <input
              list="locationOptions"
              type="text"
              value={userData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter your state"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <datalist id="locationOptions">
              {Object.keys(citiesData).map((state) => (
                <option key={state} value={state} />
              ))}
            </datalist>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">City/Town</label>
            <input
              list="cityOptions"
              type="text"
              value={userData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Enter your city or town"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={!userData.location || !citiesData[userData.location]}
            />
            {userData.location && citiesData[userData.location] && (
              <datalist id="cityOptions">
                {citiesData[userData.location].map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            )}
            {!userData.location && (
              <p className="text-sm text-gray-500 dark:text-gray-400">Please select a state first.</p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">Land Area (acres)</label>
            <input
              type="number"
              value={userData.landArea}
              onChange={(e) => handleInputChange('landArea', e.target.value)}
              placeholder="Enter land area in acres"
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">Crops to Plant</label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter a crop name"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const cropName = e.target.value.trim();
                      if (cropName && !userData.cropsToPlant.includes(cropName)) {
                        handleInputChange('cropsToPlant', [...userData.cropsToPlant, cropName]);
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    const cropName = input.value.trim();
                    if (cropName && !userData.cropsToPlant.includes(cropName)) {
                      handleInputChange('cropsToPlant', [...userData.cropsToPlant, cropName]);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
              </div>

              {userData.cropsToPlant.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Added crops:</p>
                  <div className="flex flex-wrap gap-2">
                    {userData.cropsToPlant.map((crop, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{crop}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newCrops = userData.cropsToPlant.filter((_, i) => i !== index);
                            handleInputChange('cropsToPlant', newCrops);
                          }}
                          className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Common crops (click to add):</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Rice', 'Wheat', 'Corn', 'Tomato', 'Potato',
                    'Cotton', 'Sugarcane', 'Onion', 'Soybean',
                    'Barley', 'Mustard', 'Millets', 'Peas'
                  ].map(crop => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => {
                        if (!userData.cropsToPlant.includes(crop)) {
                          handleInputChange('cropsToPlant', [...userData.cropsToPlant, crop]);
                        }
                      }}
                      disabled={userData.cropsToPlant.includes(crop)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        userData.cropsToPlant.includes(crop)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">Soil Type</label>
            <select
              value={userData.soilType}
              onChange={(e) => handleInputChange('soilType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select soil type</option>
              <option value="Clay">Clay</option>
              <option value="Sandy">Sandy</option>
              <option value="Loamy">Loamy</option>
              <option value="Silty">Silty</option>
              <option value="Peaty">Peaty</option>
              <option value="Chalky">Chalky</option>
              <option value="Alluvial">Alluvial</option>
              <option value="Red Soil">Red Soil</option>
              <option value="Black Soil">Black Soil</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-md">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {steps[currentStep].description}
          </p>
        </div>

        <div className="mb-6">
          {renderStepContent()}
        </div>

        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              disabled={isSubmitting}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out disabled:opacity-50"
            >
              Previous
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!isCurrentStepValid() || isSubmitting}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'
            )}
          </button>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-blue-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;