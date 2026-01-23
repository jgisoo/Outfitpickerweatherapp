import { motion } from 'motion/react';
import type { OutfitItem } from '../utils/outfitLogic';

interface OutfitIllustrationProps {
  outfit: OutfitItem[];
  temperature: number;
}

export function OutfitIllustration({ outfit, temperature }: OutfitIllustrationProps) {
  const hasAccessory = outfit.some(item => item.category === 'accessory');
  const top = outfit.find(item => item.category === 'top');
  const bottom = outfit.find(item => item.category === 'bottom');
  const shoes = outfit.find(item => item.category === 'shoes');
  const accessory = outfit.find(item => item.category === 'accessory');

  return (
    <motion.div
      className="relative w-44 h-56 bg-gradient-to-b from-orange-50 to-yellow-50 rounded-2xl p-3 shadow-lg border-2 border-orange-200 overflow-hidden"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Outfit Stack */}
      <div className="flex flex-col items-center justify-center h-full relative overflow-hidden">
        {/* Hat/Beanie (if cold) */}
        {hasAccessory && accessory?.icon === '🧢' && (
          <motion.div
            className="text-5xl mb-1 flex-shrink-0"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {accessory.icon}
          </motion.div>
        )}

        {/* Head */}
        <motion.div
          className="w-12 h-12 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full mb-1 flex-shrink-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        />

        {/* Scarf (if exists) */}
        {accessory?.icon === '🧣' && (
          <motion.div
            className="text-5xl absolute top-[80px] z-20"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 }}
          >
            {accessory.icon}
          </motion.div>
        )}

        {/* Top/Jacket */}
        <motion.div
          className="relative z-10 flex-shrink-0 max-w-full"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-6xl leading-none">
            {top?.icon || '👕'}
          </div>
        </motion.div>

        {/* Gloves (if exists) */}
        {accessory?.icon === '🧤' && (
          <motion.div
            className="flex gap-16 absolute top-[110px] z-5"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-4xl">🧤</span>
            <span className="text-4xl">🧤</span>
          </motion.div>
        )}

        {/* Pants/Bottoms */}
        <motion.div
          className="text-5xl -mt-2 flex-shrink-0 leading-none"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {bottom?.icon || '👖'}
        </motion.div>

        {/* Shoes */}
        <motion.div
          className="text-4xl -mt-1 flex-shrink-0 leading-none"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {shoes?.icon || '👟'}
        </motion.div>

        {/* Umbrella (if rainy) */}
        {accessory?.icon === '☂️' && (
          <motion.div
            className="text-6xl absolute -right-2 top-6"
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ☂️
          </motion.div>
        )}
      </div>

      {/* Color Palette */}
      <motion.div
        className="absolute bottom-2 left-2 right-2 flex gap-1 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {outfit.slice(0, 3).map((item, index) => (
          <div key={index} className="flex gap-1">
            {item.colors.slice(0, 2).map((color, colorIndex) => (
              <motion.div
                key={colorIndex}
                className="w-3 h-3 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.3 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}