import React from 'react';
import { Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast,{Toaster} from 'react-hot-toast';

const ExpertConnectModal = ({t}) => {
  const {currentUser} = useAuth();
  const userEmail = currentUser.email;
  const userName = currentUser.displayName;
  const experts = [
    {
      name: "Dr. Ramesh Kumar",
      email: "ramesh.kumar@agrihelp.com",
      phone: "9876543210",
      expertise: ["Banana", "Leaf Spot", "Pesticides"],
      experience: 12,
      location: "Thrissur, Kerala",
      available: true,
      avatar: "/images/default-avatar-1.jpg" // Using a local default image
    },
    {
      name: "Dr. Anitha Menon",
      email: "anitha.menon@agrihelp.com",
      phone: "9123456780",
      expertise: ["Paddy", "Soil Fertility", "Water Management"],
      experience: 8,
      location: "Palakkad, Kerala",
      available: true,
      avatar: "/images/default-avatar-2.jpg" // Using another local default image
    },
    {
      name: "Dr. Suresh Patil",
      email: "suresh.patil@agrihelp.com",
      phone: "9998887776",
      expertise: ["Sugarcane", "Organic Farming"],
      experience: 15,
      location: "Pune, Maharashtra",
      available: true,
      avatar: "/images/default-avatar-3.jpg" // Using a third local default image
    },
  ];

  const handleSendEmail = async (expert) => {
    try {
      const response = await fetch('/api/experts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expertEmail: expert.email,
          userName: userName,
          userEmail: userEmail,
          userIssue: "A farmer has been noticing small, circular, dark brown spots on the leaves of their tomato plants. The spots are starting to grow and merge, and some of the lower leaves have begun to yellow and drop off. The farmer is concerned because this is happening just as the fruit is starting to ripen, and they are worried it will affect their harvest. This seems to be spreading quickly through the field, especially after a recent period of high humidity and rainfall.",
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          // This catch block handles the JSON.parse error.
          // The error message is not needed for the final output,
          // but logging it can be helpful for debugging.
          console.error("Failed to parse JSON response:", jsonError); 
          errorData = await response.text();
        }
        console.error("Failed to send email:", errorData);
        alert(`Failed to send request. Server responded with: ${errorData.error || errorData}`);
        return;
      }

      //console.log("Email sent successfully:", data.message);
      toast.success("Emai Sent Successfully");

    } catch (error) {
      console.error("An error occurred while sending the request:", error);
      alert('An error occurred. Please check your network connection and server status.');
    }
  };

  const getStatusColor = (isAvailable) => {
    return isAvailable ? 'bg-green-500' : 'bg-gray-400';
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.expertConnectTitle}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.expertConnectSub}</p>
        </div>
      </div>
      <div className="space-y-4">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:shadow-lg"
          >
            {/* Expert Avatar and Status */}
            <div className="relative flex-shrink-0">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={expert.avatar}
                alt={expert.name}
              />
              <span className={`absolute bottom-0 right-0 h-4 w-4 rounded-full ring-2 ring-white dark:ring-gray-700 ${getStatusColor(expert.available)}`}></span>
            </div>

            {/* Expert Info */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{expert.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {expert.expertise.map((item, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-200"
                  >
                    {item}
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

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center
                  ${expert.available ? 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={!expert.available}
              >
                <Phone className="h-4 w-4 mr-0.5" />
                {t.connectNow}
              </button>
              <button
                onClick={() => handleSendEmail(expert)}
                className="py-2 px-4 rounded-xl text-sm font-medium bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-center"
              >
                <Mail className="h-4 w-4 mr-0.5" />
                {t.scheduleCall}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertConnectModal;