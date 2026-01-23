import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Droplets, Wind, CloudRain, RefreshCw, MapPin } from 'lucide-react';
import { HourlyForecast } from './HourlyForecast';
import { WeeklyForecast } from './WeeklyForecast';
import { OutfitIllustration } from './OutfitIllustration';
import { WeatherAnimations } from './WeatherAnimations';
import { getOutfitRecommendation } from '../utils/outfitLogic';
import { fetchWeatherData, fetchWeatherByLocation, getCurrentLocation } from '../services/weatherService';
import { getWeatherTheme } from '../utils/weatherTheme';

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

interface HourlyData {
  time: string;
  temp: number;
  condition: string;
  icon: string;
}

interface WeeklyData {
  day: string;
  high: number;
  low: number;
  condition: string;
}

export function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [outfitKey, setOutfitKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const getWeatherIcon = (condition: string, theme: any): string => {
    return theme.iconEmoji;
  };

  const loadWeatherData = async (useLocation: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);

      let data;
      if (useLocation) {
        const location = await getCurrentLocation();
        data = await fetchWeatherByLocation(location.lat, location.lon);
      } else {
        data = await fetchWeatherData('Toronto');
      }

      // Set current weather
      setWeather({
        location: data.location.name,
        country: data.location.country,
        date: formatDate(data.location.localtime),
        temperature: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        precipitation: Math.round(data.current.precip_mm * 10), // Convert to percentage-like value
        windSpeed: Math.round(data.current.wind_kph),
      });

      // Set hourly data (next 4 hours)
      if (data.forecast?.forecastday[0]) {
        const currentHour = new Date().getHours();
        const hours = data.forecast.forecastday[0].hour;
        const nextHours = hours.slice(currentHour, currentHour + 4);
        
        setHourlyData(
          nextHours.map((hour) => ({
            time: new Date(hour.time).toLocaleTimeString('en-US', {
              hour: 'numeric',
              hour12: true,
            }),
            temp: Math.round(hour.temp_c),
            condition: hour.condition.text,
            icon: hour.condition.text.includes('snow') ? '❄️' : hour.condition.text.includes('rain') ? '🌧️' : hour.condition.text.includes('sunny') ? '☀️' : '🌤️',
          }))
        );
      }

      // Set weekly data
      if (data.forecast?.forecastday) {
        setWeeklyData(
          data.forecast.forecastday.map((day) => ({
            day: formatDate(day.date).split(',')[0],
            high: Math.round(day.day.maxtemp_c),
            low: Math.round(day.day.mintemp_c),
            condition: day.day.condition.text,
          }))
        );
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Error loading weather:', err);
      setError('Failed to load weather data. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const handleRefresh = () => {
    setIsAnimating(true);
    loadWeatherData();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleLocationRefresh = async () => {
    setIsAnimating(true);
    await loadWeatherData(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleOutfitRefresh = () => {
    setOutfitKey((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <RefreshCw className="w-12 h-12 text-orange-400" />
        </motion.div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50 p-4">
        <p className="text-gray-800 mb-4 text-center">{error || 'No weather data available'}</p>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentOutfit = getOutfitRecommendation(
    weather.temperature,
    weather.condition,
    weather.precipitation
  );

  const theme = getWeatherTheme(weather.condition, weather.temperature);
  const weatherIcon = getWeatherIcon(weather.condition, theme);

  return (
    <div className="w-full h-full overflow-y-auto relative">
      <WeatherAnimations condition={weather.condition} />
      <motion.div
        className={`${theme.background} min-h-full relative z-0`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={weather.condition}
      >
        {/* Header Section */}
        <div className="p-4 pb-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className={theme.textPrimary}>
                  {weather.location}, <span className={theme.textSecondary}>{weather.country}</span>
                </h1>
                <p className={`${theme.textSecondary} text-sm mt-1`}>{weather.date}</p>
              </div>
              <motion.button
                onClick={handleLocationRefresh}
                className={`p-2 ${theme.buttonBg} rounded-full hover:${theme.buttonHover} transition-colors`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </motion.div>

          {/* Main Temperature Display with Outfit */}
          <div className="flex items-start justify-between mt-4 mb-4 gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <div className={`text-6xl ${theme.textPrimary}`}>{weather.temperature}°</div>
              <p className={`${theme.textPrimary} mt-1`}>{weather.condition}</p>

              {/* Weather Icon */}
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
                  <div className={`w-20 h-20 ${theme.accentColor} rounded-full flex items-center justify-center relative`}>
                    {/* Icon rays */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-3 h-3 ${theme.accentColor} rounded-full`}
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
                    
                    {/* Weather Icon Emoji */}
                    <div className="text-3xl z-10">{weatherIcon}</div>
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
                  className={`absolute -top-2 -right-2 p-2 ${theme.buttonBg} rounded-full shadow-lg hover:${theme.buttonHover} transition-colors z-10`}
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
                className={`text-xs ${theme.textSecondary} mt-2 text-center px-2`}
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
            className={`${theme.accentColor} rounded-2xl p-3 flex justify-between items-center shadow-lg`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
          >
            <div className="flex items-center gap-2">
              <Droplets className={`w-4 h-4 ${theme.textPrimary}`} />
              <span className={`text-sm ${theme.textPrimary}`}>{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className={`w-4 h-4 ${theme.textPrimary}`} />
              <span className={`text-sm ${theme.textPrimary}`}>{weather.precipitation}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className={`w-4 h-4 ${theme.textPrimary}`} />
              <span className={`text-sm ${theme.textPrimary}`}>{weather.windSpeed}km/h</span>
            </div>
          </motion.div>

          {/* Hourly Forecast */}
          {hourlyData.length > 0 && (
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
                  theme={theme}
                />
              ))}
            </div>
          )}
        </div>

        {/* Weekly Forecast Section */}
        {weeklyData.length > 0 && (
          <motion.div
            className="px-4 pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h2 className={`mb-3 ${theme.textPrimary}`}>This week&apos;s forecasts</h2>
            <WeeklyForecast data={weeklyData} theme={theme} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}