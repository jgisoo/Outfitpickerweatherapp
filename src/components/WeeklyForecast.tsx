import { motion } from 'motion/react';
import { Cloud, CloudRain, Sun, CloudDrizzle, CloudSnow } from 'lucide-react';

interface DayForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: React.ReactNode;
}

const weeklyData: DayForecast[] = [
  { day: 'Monday', high: 18, low: 12, condition: 'Sunny', icon: <Sun className="w-6 h-6" /> },
  { day: 'Tuesday', high: 16, low: 11, condition: 'Partly Cloudy', icon: <Cloud className="w-6 h-6" /> },
  { day: 'Wednesday', high: 14, low: 9, condition: 'Rainy', icon: <CloudRain className="w-6 h-6" /> },
  { day: 'Thursday', high: 15, low: 10, condition: 'Drizzle', icon: <CloudDrizzle className="w-6 h-6" /> },
  { day: 'Friday', high: 17, low: 11, condition: 'Partly Cloudy', icon: <Cloud className="w-6 h-6" /> },
  { day: 'Saturday', high: 19, low: 13, condition: 'Sunny', icon: <Sun className="w-6 h-6" /> },
  { day: 'Sunday', high: 12, low: 7, condition: 'Snow', icon: <CloudSnow className="w-6 h-6" /> },
];

export function WeeklyForecast() {
  return (
    <div className="space-y-2">
      {weeklyData.map((day, index) => (
        <motion.div
          key={day.day}
          className="bg-white/40 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between cursor-pointer"
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
              className="text-yellow-600"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {day.icon}
            </motion.div>
            <div>
              <div className="text-gray-800">{day.day}</div>
              <div className="text-xs text-gray-600">{day.condition}</div>
            </div>
          </div>
          <div className="flex gap-3 text-gray-800">
            <motion.span
              whileHover={{ scale: 1.2, color: '#ef4444' }}
            >
              {day.high}°
            </motion.span>
            <span className="text-gray-500">/</span>
            <motion.span
              className="text-gray-600"
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
