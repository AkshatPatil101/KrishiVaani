import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const GEMINI_API_KEY = "AIzaSyD1SYGPfg6IZeiQVMLcZDVepQZLx4Te_u4"; // Replace with your actual key
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getMonthNumber = (monthName) => monthNames.indexOf(monthName);
const getMonthName = (monthNumber) => monthNames[monthNumber];

const CropCalendarModal = ({ location = "Kerala", userCrop = "Rice" }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [seasonsData, setSeasonsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeasonsData = async () => {
      setLoading(true);
      setSeasonsData([]);
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      
      const prompt = `Provide all major cultivation seasons for ${userCrop} in ${location}.
      Format the response as a single JSON array of objects.
      Each object should have keys: "name" (string), "sowing_start_month" (string), "sowing_end_month" (string), 
      "harvesting_start_month" (string), "harvesting_end_month" (string).
      For year-round crops, use "All Year".
      Ensure the response is ONLY the JSON array, with no extra text or markdown.`;
      
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        const jsonString = response.text().replace(/```json|```/g, '').trim();
        const parsedData = JSON.parse(jsonString);

        if (Array.isArray(parsedData)) {
            setSeasonsData(parsedData);
        } else {
            console.error("Gemini returned non-array data:", parsedData);
            setSeasonsData([]);
        }

      } catch (error) {
        console.error("Error fetching or parsing season data from Gemini:", error);
        setSeasonsData([]);
      } finally {
        setLoading(false);
      }
    };

    if (userCrop) {
      fetchSeasonsData();
    }
  }, [userCrop, location]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getStartingDay = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const startingDay = getStartingDay(currentDate.getFullYear(), currentDate.getMonth());
  const monthDisplay = getMonthName(currentDate.getMonth());
  const yearDisplay = currentDate.getFullYear();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  // Corrected function to handle four month string parameters
  const checkMonthRange = (sowingStart, sowingEnd, harvestStart, harvestEnd, monthNum) => {
    const sowingStartNum = getMonthNumber(sowingStart);
    const sowingEndNum = getMonthNumber(sowingEnd);
    const harvestStartNum = getMonthNumber(harvestStart);
    const harvestEndNum = getMonthNumber(harvestEnd);
  
    if (sowingStart === "All Year") {
      return { isSowing: true, isHarvesting: true };
    }
  
    const isSowing = sowingStartNum <= sowingEndNum
      ? (monthNum >= sowingStartNum && monthNum <= sowingEndNum)
      : (monthNum >= sowingStartNum || monthNum <= sowingEndNum);
    
    const isHarvesting = harvestStartNum <= harvestEndNum
      ? (monthNum >= harvestStartNum && monthNum <= harvestEndNum)
      : (monthNum >= harvestStartNum || monthNum <= harvestEndNum);
  
    return { isSowing, isHarvesting };
  };

  const renderDays = () => {
    const dayElements = [];
    const blankDays = startingDay === 0 ? 6 : startingDay - 1;

    for (let i = 0; i < blankDays; i++) {
      dayElements.push(<div key={`blank-${i}`} className="p-2"></div>);
    }

    if (loading) {
        dayElements.push(<div key="loading" className="col-span-7 text-center p-4 text-gray-500">Loading crop data...</div>);
    } else if (seasonsData.length === 0) {
        dayElements.push(<div key="no-data" className="col-span-7 text-center p-4 text-red-500">Could not find data for this crop.</div>);
    } else {
        for (let i = 1; i <= daysInMonth; i++) {
            const hasSowing = seasonsData.some(season => 
              checkMonthRange(season.sowing_start_month, season.sowing_end_month, season.harvesting_start_month, season.harvesting_end_month, currentDate.getMonth()).isSowing
            );
            const hasHarvesting = seasonsData.some(season => 
              checkMonthRange(season.sowing_start_month, season.sowing_end_month, season.harvesting_start_month, season.harvesting_end_month, currentDate.getMonth()).isHarvesting
            );

            let dayClass = "p-2 rounded-full";
            let tooltip = "";
            let hasEvent = false;

            seasonsData.forEach(season => {
              const { isSowing, isHarvesting } = checkMonthRange(
                season.sowing_start_month, season.sowing_end_month, 
                season.harvesting_start_month, season.harvesting_end_month, 
                currentDate.getMonth()
              );

              if (isSowing || isHarvesting) {
                  hasEvent = true;
                  tooltip += `${season.name}: ${isSowing ? 'Sowing' : ''}${isSowing && isHarvesting ? ' & ' : ''}${isHarvesting ? 'Harvesting' : ''}\n`;
              }
            });
            
            if (hasEvent) {
                dayClass += ` relative font-bold text-white transition-all duration-200`;
                dayClass += hasSowing && hasHarvesting ? ' bg-green-500' : hasSowing ? ' bg-blue-500' : ' bg-yellow-500';
            } else {
                dayClass += ' text-gray-800 hover:bg-gray-100';
            }

            dayElements.push(
                <div 
                    key={i} 
                    className={dayClass}
                    title={tooltip}
                >
                    {i}
                </div>
            );
        }
    }
    return dayElements;
  };

  return (
    <div className="flex-1 bg-white rounded-2xl shadow p-6 mr-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-green-600">
          Crop Calendar for {location}
        </h1>
        <div className="flex space-x-2">
            <button onClick={handlePrevMonth} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                &lt;
            </button>
            <h2 className="text-xl font-semibold w-36 text-center">{monthDisplay} {yearDisplay}</h2>
            <button onClick={handleNextMonth} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                &gt;
            </button>
        </div>
      </div>
      <hr className="mb-4" />
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500 mb-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {renderDays()}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
        <h3 className="text-xl font-bold mb-4 text-green-700">Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-800">
            <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div> Sowing
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div> Harvesting
            </div>
            <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div> Both Sowing & Harvesting
            </div>
        </div>
        
        {seasonsData.length > 0 && (
            <div className="mt-4">
                <h4 className="text-lg font-bold text-gray-700 mb-2">Seasons for {userCrop} in {location}:</h4>
                <ul className="list-disc list-inside text-gray-600">
                    {seasonsData.map((season, index) => (
                        <li key={index}>
                            <span className="font-semibold">{season.name}:</span>
                            <span className="ml-1">
                                Sowing: {season.sowing_start_month} - {season.sowing_end_month}, 
                                Harvesting: {season.harvesting_start_month} - {season.harvesting_end_month}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
      </div>
    </div>
  );
};

export default CropCalendarModal;