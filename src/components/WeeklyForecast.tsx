import { motion } from 'motion/react';
import { Cloud, CloudRain, Sun, CloudDrizzle, CloudSnow } from 'lucide-react';
import { WeatherTheme } from '../utils/weatherTheme';

interface DayForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
}

interface WeeklyForecastProps {
  data: DayForecast[];
  theme: WeatherTheme;
}

const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('sun') || lowerCondition.includes('clear'))
    return <Sun className="w-6 h-6" />;
  if (lowerCondition.includes('rain')) return <CloudRain className="w-6 h-6" />;
  if (lowerCondition.includes('drizzle')) return <CloudDrizzle className="w-6 h-6" />;
  if (lowerCondition.includes('snow')) return <CloudSnow className="w-6 h-6" />;
  return <Cloud className="w-6 h-6" />;
};

export function WeeklyForecast({ data, theme }: WeeklyForecastProps) {
  return (
    <div className="space-y-2">
      {data.map((day, index) => (
        <motion.div
          key={day.day}
          className={`${theme.cardBg} backdrop-blur-sm rounded-xl p-4 flex items-center justify-between cursor-pointer`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2 + index * 0.1 }}
          whileHover={{
            scale: 1.02,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4 flex-1">
            <motion.div
              className={`${theme.iconColor}`}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {getWeatherIcon(day.condition)}
            </motion.div>
            <div>
              <div className={`${theme.textPrimary}`}>{day.day}</div>
              <div className={`text-xs ${theme.textSecondary}`}>{day.condition}</div>
            </div>
          </div>
          <div className={`flex gap-3 ${theme.textPrimary}`}>
            <motion.span whileHover={{ scale: 1.2, color: '#ef4444' }}>
              {day.high}°
            </motion.span>
            <span className="text-gray-500">/</span>
            <motion.span
              className={`${theme.textSecondary}`}
              whileHover={{ scale: 1.2, color: '#3b82f6' }}
            >
              {day.low}°
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
