import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Leaf, BarChart3, Activity } from 'lucide-react';

const MarketDashboard = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Hardcoded market data with price trends
  const marketData = [
    { 
      crop: 'Tomatoes', 
      currentPrice: 45, 
      change: 12.5, 
      trend: 'up',
      unit: 'kg',
      priceHistory: [32, 35, 38, 42, 45],
      category: 'Vegetables'
    },
    { 
      crop: 'Onions', 
      currentPrice: 28, 
      change: -8.2, 
      trend: 'down',
      unit: 'kg',
      priceHistory: [35, 32, 30, 29, 28],
      category: 'Vegetables'
    },
    { 
      crop: 'Potatoes', 
      currentPrice: 22, 
      change: 3.1, 
      trend: 'up',
      unit: 'kg',
      priceHistory: [20, 21, 21, 22, 22],
      category: 'Vegetables'
    },
    { 
      crop: 'Rice (Basmati)', 
      currentPrice: 85, 
      change: 0.0, 
      trend: 'stable',
      unit: 'kg',
      priceHistory: [85, 85, 85, 85, 85],
      category: 'Grains'
    },
    { 
      crop: 'Wheat', 
      currentPrice: 32, 
      change: -5.9, 
      trend: 'down',
      unit: 'kg',
      priceHistory: [38, 36, 34, 33, 32],
      category: 'Grains'
    },
    { 
      crop: 'Carrots', 
      currentPrice: 35, 
      change: 16.7, 
      trend: 'up',
      unit: 'kg',
      priceHistory: [25, 28, 30, 33, 35],
      category: 'Vegetables'
    },
    { 
      crop: 'Spinach', 
      currentPrice: 18, 
      change: -10.0, 
      trend: 'down',
      unit: 'kg',
      priceHistory: [22, 21, 20, 19, 18],
      category: 'Leafy Greens'
    },
    { 
      crop: 'Cauliflower', 
      currentPrice: 40, 
      change: 25.0, 
      trend: 'up',
      unit: 'kg',
      priceHistory: [28, 30, 35, 38, 40],
      category: 'Vegetables'
    }
  ];

  // Generate time series data for charts
  const timeLabels = ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Today'];
  const chartData = timeLabels.map((label, index) => {
    const dataPoint = { time: label };
    marketData.forEach(item => {
      dataPoint[item.crop] = item.priceHistory[index];
    });
    return dataPoint;
  });

  // Category data for pie chart
  const categoryData = marketData.reduce((acc, item) => {
    const existing = acc.find(cat => cat.name === item.category);
    if (existing) {
      existing.value += item.currentPrice;
      existing.count += 1;
    } else {
      acc.push({ 
        name: item.category, 
        value: item.currentPrice, 
        count: 1,
        avgPrice: item.currentPrice 
      });
    }
    return acc;
  }, []).map(cat => ({ ...cat, avgPrice: Math.round(cat.value / cat.count) }));

  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend, change) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Market Prices Dashboard</h1>
                <p className="text-gray-600">Live agricultural commodity prices</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last Updated</div>
              <div className="text-lg font-semibold text-gray-800">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex space-x-4">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'trends', label: 'Price Trends', icon: BarChart3 },
              { id: 'categories', label: 'Categories', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedView === id 
                    ? 'bg-green-100 text-green-700 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Grid */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {marketData.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">{item.crop}</h3>
                  {getTrendIcon(item.trend)}
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{item.currentPrice}
                    <span className="text-sm font-normal text-gray-500">/{item.unit}</span>
                  </div>
                  <div className={`text-sm font-medium ${getTrendColor(item.trend, item.change)}`}>
                    {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}% from yesterday
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Price Trends Chart */}
        {selectedView === 'trends' && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Price Trends (Last 5 Days)</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #ccc',
                      borderRadius: '8px'
                    }}
                  />
                  {marketData.slice(0, 6).map((item, index) => (
                    <Line
                      key={item.crop}
                      type="monotone"
                      dataKey={item.crop}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Categories View */}
        {selectedView === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Price Distribution by Category</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, value}) => `${name}: ₹${Math.round(value/categoryData.find(c => c.name === name).count)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Bar Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Average Prices by Category</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #ccc',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="avgPrice" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Market Summary */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Market Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {marketData.filter(item => item.trend === 'up').length}
              </div>
              <div className="text-sm text-gray-600">Commodities Up</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">
                {marketData.filter(item => item.trend === 'down').length}
              </div>
              <div className="text-sm text-gray-600">Commodities Down</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600 mb-2">
                ₹{Math.round(marketData.reduce((sum, item) => sum + item.currentPrice, 0) / marketData.length)}
              </div>
              <div className="text-sm text-gray-600">Average Price/kg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;