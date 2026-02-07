import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

// A more comprehensive Icon component
const WeatherIcon = ({ condition, className = "text-2xl" }) => {
  const lowerCaseCondition = condition?.toLowerCase();
  let icon = "❓"; // Default unknown icon

  if (lowerCaseCondition?.includes("clear") || lowerCaseCondition?.includes("sun")) {
    icon = "☀️"; // Sun
  } else if (lowerCaseCondition?.includes("cloud") && lowerCaseCondition?.includes("partly")) {
    icon = "⛅"; // Partly cloudy
  } else if (lowerCaseCondition?.includes("cloud")) {
    icon = "☁️"; // Cloud
  } else if (lowerCaseCondition?.includes("rain") || lowerCaseCondition?.includes("drizzle")) {
    icon = "🌧️"; // Rain
  } else if (lowerCaseCondition?.includes("thunder")) {
    icon = "⛈️"; // Thunderstorm
  } else if (lowerCaseCondition?.includes("snow") || lowerCaseCondition?.includes("sleet")) {
    icon = "🌨️"; // Snow
  } else if (lowerCaseCondition?.includes("fog") || lowerCaseCondition?.includes("mist")) {
    icon = "🌫️"; // Fog/Mist
  } else if (lowerCaseCondition?.includes("hail")) {
    icon = "🧊"; // Hail
  }

  return <span className={className}>{icon}</span>;
};

const WeatherDashboard = ({ t = (key) => key ,locationF}) => {
  const [query, setQuery] = useState(locationF);
  const [location, setLocation] = useState(locationF);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  const fetchWeatherData = async (loc) => {
    const apiKey = "1ea283d4d5b44d568d6132555251709"; // Replace with your actual API key
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${loc}&days=5&aqi=yes`;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const transformedData = {
        currentTemp: data.current.temp_c,
        currentTempF: data.current.temp_f,
        condition: data.current.condition.text,
        highTemp: data.forecast.forecastday[0].day.maxtemp_c,
        highTempF: data.forecast.forecastday[0].day.maxtemp_f,
        lowTemp: data.forecast.forecastday[0].day.mintemp_c,
        lowTempF: data.forecast.forecastday[0].day.mintemp_f,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        visibility: data.current.vis_km,
        forecast: data.forecast.forecastday.map((day) => ({
          date: new Date(day.date).toLocaleDateString("en-GB", {
            weekday: "short",
          }),
          tempC: day.day.avgtemp_c,
          tempF: day.day.avgtemp_f,
          condition: day.day.condition.text, // Ensure forecast also has condition for icons
        })),
        advice: "It's a great day for planting! Ensure you have proper irrigation systems in place for the coming week.",
      };
      setWeatherData(transformedData);
    } catch (e) {
      console.error("Error fetching weather data:", e);
      setError("Could not fetch weather data. Please try again later.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) fetchWeatherData(location);
  }, [location]);

  useEffect(() => {
    if (!canvasRef.current || !weatherData) return;
    if (chartInstance.current) chartInstance.current.destroy();
    const labels = weatherData.forecast.map((day) => day.date);
    const temperatures = weatherData.forecast.map((day) => (isCelsius ? day.tempC : day.tempF));
    const ctx = canvasRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `Temperature (${isCelsius ? "°C" : "°F"})`,
            data: temperatures,
            borderColor: "#4f46e5", // Blue-600
            backgroundColor: "rgba(79, 70, 229, 0.2)", // Blue-600 with opacity
            borderWidth: 2,
            pointBackgroundColor: "#4f46e5",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#6b7280" } }, // Gray-500 for ticks
          y: { grid: { color: "rgba(0,0,0,0.1)" }, ticks: { color: "#6b7280" } },
        },
        plugins: { legend: { display: false } },
      },
    });
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [weatherData, t, isCelsius]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center text-gray-800">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl w-full">
        {/* Header and Search */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600">Weather Dashboard</h1>
          {/* <div className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setLocation(query);
              }}
              placeholder="Enter city or zip code"
              className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setLocation(query)}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200"
            >
              {t("Search")}
            </button>
          </div> */}
        </div>

        {loading && <div className="text-center text-lg text-gray-600">Loading...</div>}
        {error && <div className="text-center text-lg text-red-500">{error}</div>}
        {weatherData && !loading && !error && (
          <>
            {/* Main Weather Info */}
            <div className="flex flex-col md:flex-row md:space-x-8 mb-8">
              <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-6 shadow-md text-gray-800">
                <h2 className="text-xl font-semibold mb-2">{location}</h2>
                <div className="flex items-start justify-between">
                  <span className="text-6xl font-bold">
                    {Math.round(isCelsius ? weatherData.currentTemp : weatherData.currentTempF)}°
                  </span>
                  <button
                    onClick={() => setIsCelsius(!isCelsius)}
                    className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium hover:bg-gray-300 transition"
                  >
                    {isCelsius ? "°C" : "°F"}
                  </button>
                </div>
                {/* Condition with Icon */}
                <div className="flex items-center text-lg capitalize mb-4">
                  <WeatherIcon condition={weatherData.condition} className="text-4xl mr-2" />
                  <span className="text-gray-700">{weatherData.condition}</span>
                </div>
                <div className="flex space-x-4 text-sm font-light text-gray-600">
                  <span>H: {Math.round(isCelsius ? weatherData.highTemp : weatherData.highTempF)}°</span>
                  <span>L: {Math.round(isCelsius ? weatherData.lowTemp : weatherData.lowTempF)}°</span>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-6 shadow-md mt-4 md:mt-0">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Weather Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-medium">{weatherData.humidity}%</span>
                    <span className="text-sm text-gray-500">Humidity</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-medium">{weatherData.windSpeed} km/h</span>
                    <span className="text-sm text-gray-500">Wind</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-medium">{weatherData.visibility} km</span>
                    <span className="text-sm text-gray-500">Visibility</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast small cards */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-8">
              {weatherData.forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center bg-white border border-gray-200 p-4 rounded-xl shadow transition-all duration-200 hover:scale-105"
                >
                  <span className="text-sm font-medium text-gray-500">{day.date}</span>
                  <WeatherIcon condition={day.condition} className="text-3xl mt-1 mb-1" />
                  <span className="text-xl font-bold">{Math.round(isCelsius ? day.tempC : day.tempF)}°</span>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mt-8 h-64 bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <canvas ref={canvasRef}></canvas>
            </div>

            {/* Smart Farming Advice */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 mt-6">
              <h4 className="text-xl font-semibold mb-2 text-green-600">Smart Farming Advice 🌱</h4>
              <p className="text-sm text-gray-600">{weatherData.advice}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;