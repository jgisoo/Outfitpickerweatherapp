import { motion } from 'motion/react';
import type { OutfitItem } from '../utils/outfitLogic';

interface ClothingItemProps {
  item: OutfitItem;
  delay: number;
}

export function ClothingItem({ item, delay }: ClothingItemProps) {
  return (
    <motion.div
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-md"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      }}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center shadow-inner">
            <span className="text-5xl">{item.icon}</span>
          </div>
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-gray-800">{item.name}</h4>
            {item.warmth && (
              <span className="text-xs px-2 py-1 bg-orange-200 text-orange-800 rounded-full">
                {item.warmth}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
          <div className="flex gap-2">
            {item.colors.map((color, index) => (
              <motion.div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.3 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
