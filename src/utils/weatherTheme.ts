export interface WeatherTheme {
  background: string;
  cardBg: string;
  cardBgHover: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  buttonBg: string;
  buttonHover: string;
  iconEmoji: string;
  iconColor: string;
}

export function getWeatherTheme(condition: string, temp: number): WeatherTheme {
  const lowerCondition = condition.toLowerCase();

  // Snow Theme - Cool blues and whites
  if (lowerCondition.includes('snow')) {
    return {
      background: 'bg-gradient-to-b from-blue-200 via-blue-100 to-white',
      cardBg: 'bg-blue-200/60',
      cardBgHover: 'bg-blue-200/80',
      textPrimary: 'text-blue-900',
      textSecondary: 'text-blue-700',
      accentColor: 'bg-blue-400',
      buttonBg: 'bg-blue-500',
      buttonHover: 'bg-blue-600',
      iconEmoji: '❄️',
      iconColor: 'text-blue-400',
    };
  }

  // Thunder/Storm Theme - Dark and dramatic
  if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return {
      background: 'bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500',
      cardBg: 'bg-gray-600/60',
      cardBgHover: 'bg-gray-600/80',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-200',
      accentColor: 'bg-purple-500',
      buttonBg: 'bg-purple-600',
      buttonHover: 'bg-purple-700',
      iconEmoji: '⛈️',
      iconColor: 'text-purple-300',
    };
  }

  // Rain Theme - Blue-gray and moody
  if (lowerCondition.includes('rain')) {
    return {
      background: 'bg-gradient-to-b from-gray-400 via-blue-300 to-blue-200',
      cardBg: 'bg-blue-300/60',
      cardBgHover: 'bg-blue-300/80',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-700',
      accentColor: 'bg-blue-500',
      buttonBg: 'bg-blue-600',
      buttonHover: 'bg-blue-700',
      iconEmoji: '🌧️',
      iconColor: 'text-blue-500',
    };
  }

  // Drizzle Theme - Light blue-gray
  if (lowerCondition.includes('drizzle')) {
    return {
      background: 'bg-gradient-to-b from-gray-300 via-blue-200 to-blue-100',
      cardBg: 'bg-blue-200/50',
      cardBgHover: 'bg-blue-200/70',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-600',
      accentColor: 'bg-blue-400',
      buttonBg: 'bg-blue-500',
      buttonHover: 'bg-blue-600',
      iconEmoji: '🌦️',
      iconColor: 'text-blue-400',
    };
  }

  // Cloudy/Overcast Theme - Neutral grays
  if (lowerCondition.includes('cloudy') || lowerCondition.includes('overcast')) {
    return {
      background: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100',
      cardBg: 'bg-gray-400/50',
      cardBgHover: 'bg-gray-400/70',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-600',
      accentColor: 'bg-gray-500',
      buttonBg: 'bg-gray-600',
      buttonHover: 'bg-gray-700',
      iconEmoji: '☁️',
      iconColor: 'text-gray-500',
    };
  }

  // Fog/Mist Theme - Misty grays
  if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
    return {
      background: 'bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200',
      cardBg: 'bg-gray-300/60',
      cardBgHover: 'bg-gray-300/80',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-600',
      accentColor: 'bg-gray-500',
      buttonBg: 'bg-gray-600',
      buttonHover: 'bg-gray-700',
      iconEmoji: '🌫️',
      iconColor: 'text-gray-400',
    };
  }

  // Clear/Sunny Theme - Varies by temperature
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    if (temp > 25) {
      // Hot sunny - Orange/red theme
      return {
        background: 'bg-gradient-to-b from-orange-300 via-yellow-200 to-yellow-100',
        cardBg: 'bg-orange-300/60',
        cardBgHover: 'bg-orange-300/80',
        textPrimary: 'text-orange-900',
        textSecondary: 'text-orange-700',
        accentColor: 'bg-orange-400',
        buttonBg: 'bg-orange-500',
        buttonHover: 'bg-orange-600',
        iconEmoji: '🔥',
        iconColor: 'text-orange-500',
      };
    } else if (temp < 10) {
      // Cold sunny - Pale blue/yellow theme
      return {
        background: 'bg-gradient-to-b from-blue-200 via-yellow-100 to-yellow-50',
        cardBg: 'bg-blue-100/60',
        cardBgHover: 'bg-blue-100/80',
        textPrimary: 'text-blue-800',
        textSecondary: 'text-blue-600',
        accentColor: 'bg-blue-300',
        buttonBg: 'bg-blue-400',
        buttonHover: 'bg-blue-500',
        iconEmoji: '🌤️',
        iconColor: 'text-blue-400',
      };
    }
    // Normal sunny - Yellow theme
    return {
      background: 'bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50',
      cardBg: 'bg-yellow-400/60',
      cardBgHover: 'bg-yellow-400/80',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-700',
      accentColor: 'bg-yellow-400',
      buttonBg: 'bg-orange-400',
      buttonHover: 'bg-orange-500',
      iconEmoji: '☀️',
      iconColor: 'text-yellow-600',
    };
  }

  // Default sunny theme
  return {
    background: 'bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50',
    cardBg: 'bg-yellow-400/60',
    cardBgHover: 'bg-yellow-400/80',
    textPrimary: 'text-gray-800',
    textSecondary: 'text-gray-700',
    accentColor: 'bg-yellow-400',
    buttonBg: 'bg-orange-400',
    buttonHover: 'bg-orange-500',
    iconEmoji: '☀️',
    iconColor: 'text-yellow-600',
  };
}
