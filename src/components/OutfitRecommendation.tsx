import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { ClothingItem } from './ClothingItem';
import { getOutfitRecommendation, type OutfitItem } from '../utils/outfitLogic';

interface OutfitRecommendationProps {
  temperature: number;
  condition: string;
  precipitation: number;
}

export function OutfitRecommendation({ temperature, condition, precipitation }: OutfitRecommendationProps) {
  const [outfit, setOutfit] = useState<OutfitItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateOutfit = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const recommendation = getOutfitRecommendation(temperature, condition, precipitation);
      setOutfit(recommendation);
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    generateOutfit();
  }, [temperature, condition, precipitation]);

  const getWeatherMessage = () => {
    if (temperature < 5) return "It's freezing! Bundle up warm.";
    if (temperature < 15) return "It's cool outside. Layer up!";
    if (temperature < 25) return "Perfect weather for a comfy outfit.";
    return "It's warm! Keep it light and breezy.";
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-orange-50 via-yellow-50 to-amber-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-300 h-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-600" />
            <h2 className="text-gray-800">Outfit Suggestion</h2>
          </div>
          <motion.button
            onClick={generateOutfit}
            className="p-2 bg-orange-400 rounded-full hover:bg-orange-500 transition-colors"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            animate={isRefreshing ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </motion.button>
        </motion.div>

        {/* Weather Message */}
        <motion.div
          className="bg-orange-400 rounded-2xl p-4 mb-6 shadow-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-800 text-center">{getWeatherMessage()}</p>
        </motion.div>

        {/* Outfit Display */}
        <div className="space-y-6">
          {outfit.map((item, index) => (
            <ClothingItem
              key={`${item.category}-${index}`}
              item={item}
              delay={0.6 + index * 0.1}
            />
          ))}
        </div>

        {/* Style Tips */}
        <motion.div
          className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-sm text-gray-700 mb-2">Style Tips:</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            {temperature < 10 && (
              <li>• Layer up to stay warm and cozy</li>
            )}
            {precipitation > 50 && (
              <li>• Don&apos;t forget waterproof footwear</li>
            )}
            <li>• Mix and match with your favorite accessories</li>
            <li>• Comfort is key for all-day wear</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
