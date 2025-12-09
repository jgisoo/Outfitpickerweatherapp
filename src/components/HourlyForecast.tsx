import { motion } from 'motion/react';
import { getOutfitRecommendation } from '../utils/outfitLogic';

interface HourlyForecastProps {
  time: string;
  temp: number;
  icon: string;
  condition: string;
  precipitation: number;
  delay: number;
}

export function HourlyForecast({ time, temp, icon, condition, precipitation, delay }: HourlyForecastProps) {
  const outfit = getOutfitRecommendation(temp, condition, precipitation);
  const top = outfit.find(item => item.category === 'top');
  const bottom = outfit.find(item => item.category === 'bottom');
  const shoes = outfit.find(item => item.category === 'shoes');

  return (
    <motion.div
      className="bg-yellow-400 rounded-2xl p-2 flex flex-col items-center gap-1 cursor-pointer shadow-md relative overflow-hidden"
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -2, 2, 0],
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="text-xl"
        whileHover={{
          scale: [1, 1.3, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      
      {/* Mini Outfit Stack */}
      <div className="flex flex-col items-center gap-0 my-0.5">
        <motion.div 
          className="text-2xl leading-none"
          whileHover={{ scale: 1.2 }}
        >
          {top?.icon || '👕'}
        </motion.div>
        <motion.div 
          className="text-xl leading-none -mt-1"
          whileHover={{ scale: 1.2 }}
        >
          {bottom?.icon || '👖'}
        </motion.div>
        <motion.div 
          className="text-lg leading-none"
          whileHover={{ scale: 1.2 }}
        >
          {shoes?.icon || '👟'}
        </motion.div>
      </div>
      
      <div className="text-xs text-gray-800">{time}</div>
      <div className="text-xs text-gray-700">{temp}°</div>
    </motion.div>
  );
}