import { motion } from 'motion/react';

interface WeatherAnimationsProps {
  condition: string;
}

export function WeatherAnimations({ condition }: WeatherAnimationsProps) {
  const lowerCondition = condition.toLowerCase();

  // Snow Animation
  if (lowerCondition.includes('snow')) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white text-2xl opacity-80"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
            }}
            animate={{
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 3 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            ❄️
          </motion.div>
        ))}
      </div>
    );
  }

  // Rain Animation
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 bg-blue-400 opacity-40"
            style={{
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: -20 }}
            animate={{ y: window.innerHeight + 20 }}
            transition={{
              duration: Math.random() * 0.5 + 0.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    );
  }

  // Thunder/Storm Animation
  if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return (
      <>
        {/* Rain */}
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 bg-blue-300 opacity-60"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: -20 }}
              animate={{ y: window.innerHeight + 20 }}
              transition={{
                duration: Math.random() * 0.3 + 0.3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            />
          ))}
        </div>
        {/* Lightning flashes */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-20 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0, 0.3, 0] }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: Math.random() * 5 + 3,
          }}
        />
      </>
    );
  }

  // Cloudy - Floating clouds
  if (lowerCondition.includes('cloudy') || lowerCondition.includes('overcast')) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl opacity-20"
            initial={{
              x: -100,
              y: Math.random() * window.innerHeight * 0.6,
            }}
            animate={{
              x: window.innerWidth + 100,
            }}
            transition={{
              duration: Math.random() * 20 + 30,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear',
            }}
          >
            ☁️
          </motion.div>
        ))}
      </div>
    );
  }

  // Sunny - Sun rays
  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-yellow-300 opacity-10"
            style={{
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: '0',
              transformOrigin: 'top',
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    );
  }

  // Fog/Mist
  if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
    return (
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-32 bg-gray-300 opacity-20 blur-3xl"
            style={{
              top: `${i * 20}%`,
            }}
            animate={{
              x: [-100, window.innerWidth + 100],
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
