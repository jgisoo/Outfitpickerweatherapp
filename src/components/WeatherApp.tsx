import { useState } from 'react';
import { motion } from 'motion/react';
import { Droplets, Wind, CloudRain, RefreshCw } from 'lucide-react';
import { HourlyForecast } from './HourlyForecast';
import { WeeklyForecast } from './WeeklyForecast';
import { OutfitIllustration } from './OutfitIllustration';
import { getOutfitRecommendation } from '../utils/outfitLogic';

interface WeatherData {
  location: string;
  country: string;
  date: string;
  temperature: number;
  condition: string;
  humidity: number;
  precipitation: number;
  windSpeed: number;
}

const mockWeatherData: WeatherData = {
  location: 'Toronto',
  country: 'Canada',
  date: 'Wed, Sep 27',
  temperature: 17,
  condition: 'Sunny',
  humidity: 10,
  precipitation: 10,
  windSpeed: 10,
};

const hourlyData = [
  { time: '2pm', temp: 17, condition: 'partly-cloudy', icon: '🌤️' },
  { time: '4pm', temp: 16, condition: 'partly-cloudy', icon: '⛅' },
  { time: '6pm', temp: 15, condition: 'cloudy', icon: '☁️' },
  { time: '8pm', temp: 14, condition: 'cloudy', icon: '🌙' },
];

export function WeatherApp() {
  const [weather] = useState<WeatherData>(mockWeatherData);
  const [isAnimating, setIsAnimating] = useState(false);
  const [outfitKey, setOutfitKey] = useState(0);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleOutfitRefresh = () => {
    setOutfitKey(prev => prev + 1);
  };

  const currentOutfit = getOutfitRecommendation(
    weather.temperature,
    weather.condition,
    weather.precipitation
  );

  return (
    <div className="w-full h-full overflow-y-auto">
      <motion.div
        className="bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50 min-h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="p-4 pb-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-gray-800">
              {weather.location}, <span className="text-gray-600">{weather.country}</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">{weather.date}</p>
          </motion.div>

          {/* Main Temperature Display with Outfit */}
          <div className="flex items-start justify-between mt-4 mb-4 gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <div className="text-6xl text-gray-800">{weather.temperature}°</div>
              <p className="text-gray-700 mt-1">{weather.condition}</p>

              {/* Sun Icon */}
              <motion.div
                className="relative mt-3"
                animate={
                  isAnimating
                    ? { rotate: 360 }
                    : { rotate: 0 }
                }
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                <motion.div
                  className="cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRefresh}
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center relative">
                    {/* Sun rays */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-gray-900 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          transformOrigin: '0 0',
                          transform: `rotate(${i * 45}deg) translate(35px, -6px)`,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                    
                    {/* Sun face */}
                    <div className="text-3xl z-10">😊</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Outfit Illustration */}
            <div className="flex-1 flex flex-col items-center">
              <motion.div
                className="relative"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <OutfitIllustration 
                  key={outfitKey}
                  outfit={currentOutfit}
                  temperature={weather.temperature}
                />
                
                {/* Refresh Button */}
                <motion.button
                  onClick={handleOutfitRefresh}
                  className="absolute -top-2 -right-2 p-2 bg-orange-400 rounded-full shadow-lg hover:bg-orange-500 transition-colors z-10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9, rotate: 180 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <RefreshCw className="w-4 h-4 text-white" />
                </motion.button>
              </motion.div>
              
              <motion.p
                className="text-xs text-gray-600 mt-2 text-center px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Recommended outfit
              </motion.p>
            </div>
          </div>

          {/* Weather Stats */}
          <motion.div
            className="bg-yellow-400 rounded-2xl p-3 flex justify-between items-center shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
          >
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-gray-800" />
              <span className="text-sm text-gray-800">{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-gray-800" />
              <span className="text-sm text-gray-800">{weather.precipitation}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-gray-800" />
              <span className="text-sm text-gray-800">{weather.windSpeed}km/h</span>
            </div>
          </motion.div>

          {/* Hourly Forecast */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {hourlyData.map((hour, index) => (
              <HourlyForecast
                key={hour.time}
                time={hour.time}
                temp={hour.temp}
                icon={hour.icon}
                condition={hour.condition}
                precipitation={weather.precipitation}
                delay={0.6 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Weekly Forecast Section */}
        <motion.div
          className="px-4 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="mb-3 text-gray-800">This week&apos;s forecasts</h2>
          <WeeklyForecast />
        </motion.div>
      </motion.div>
    </div>
  );
}