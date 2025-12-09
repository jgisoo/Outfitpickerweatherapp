import { useState } from 'react';
import { motion } from 'motion/react';

interface Reaction {
  emoji: string;
  label: string;
  id: string;
}

const reactions: Reaction[] = [
  { emoji: '👍', label: 'Like', id: 'like' },
  { emoji: '❤️', label: 'Love', id: 'love' },
  { emoji: '😂', label: 'Haha', id: 'haha' },
  { emoji: '😮', label: 'Wow', id: 'wow' },
  { emoji: '😢', label: 'Sad', id: 'sad' },
  { emoji: '😡', label: 'Angry', id: 'angry' },
  { emoji: '🎉', label: 'Celebrate', id: 'celebrate' },
];

export function EmojiReactionPicker() {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);

  const handleReactionClick = (reactionId: string) => {
    setSelectedReaction(reactionId === selectedReaction ? null : reactionId);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-3 flex-wrap justify-center">
        {reactions.map((reaction) => {
          const isSelected = selectedReaction === reaction.id;
          const isHovered = hoveredReaction === reaction.id;
          
          return (
            <div key={reaction.id} className="flex flex-col items-center gap-2">
              <motion.button
                onClick={() => handleReactionClick(reaction.id)}
                onHoverStart={() => setHoveredReaction(reaction.id)}
                onHoverEnd={() => setHoveredReaction(null)}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center text-3xl cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-100 to-pink-100 ring-4 ring-purple-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                whileHover={{
                  scale: 1.3,
                  rotate: [0, -10, 10, -10, 0],
                  transition: {
                    scale: {
                      duration: 0.2,
                      ease: 'easeOut',
                    },
                    rotate: {
                      duration: 0.5,
                      ease: 'easeInOut',
                    },
                  },
                }}
                whileTap={{
                  scale: 0.9,
                  rotate: 360,
                  transition: {
                    duration: 0.6,
                    ease: 'easeInOut',
                  },
                }}
                animate={
                  isSelected
                    ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                        transition: {
                          duration: 0.5,
                          ease: 'easeInOut',
                        },
                      }
                    : {}
                }
              >
                <motion.span
                  animate={
                    isHovered || isSelected
                      ? {
                          scale: [1, 1.2, 1],
                          transition: {
                            duration: 0.3,
                            repeat: isHovered ? Infinity : 0,
                            repeatDelay: 0.2,
                          },
                        }
                      : {}
                  }
                >
                  {reaction.emoji}
                </motion.span>
                
                {isSelected && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 15,
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
              
              <motion.span
                className={`text-xs transition-colors ${
                  isSelected ? 'text-purple-600' : 'text-gray-500'
                }`}
                animate={
                  isHovered
                    ? {
                        y: [0, -4, 0],
                        transition: {
                          duration: 0.3,
                        },
                      }
                    : {}
                }
              >
                {reaction.label}
              </motion.span>
            </div>
          );
        })}
      </div>
      
      {selectedReaction && (
        <motion.div
          className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 rounded-full border border-purple-200"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <p className="text-sm text-purple-700">
            You reacted with{' '}
            <span className="text-lg">
              {reactions.find((r) => r.id === selectedReaction)?.emoji}
            </span>{' '}
            {reactions.find((r) => r.id === selectedReaction)?.label}
          </p>
        </motion.div>
      )}
    </div>
  );
}
