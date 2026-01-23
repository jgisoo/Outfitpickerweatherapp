import axios from 'axios';

interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    humidity: number;
    precip_mm: number;
    wind_kph: number;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
        };
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
        };
      }>;
    }>;
  };
}

// Get your free API key from https://www.weatherapi.com/
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'your-api-key-here';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchWeatherData(city: string = 'Toronto') {
  try {
    const response = await axios.get<WeatherApiResponse>(
      `${BASE_URL}/forecast.json`,
      {
        params: {
          key: API_KEY,
          q: city,
          days: 7,
          aqi: 'no',
          alerts: 'no',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export async function fetchWeatherByLocation(lat: number, lon: number) {
  try {
    const response = await axios.get<WeatherApiResponse>(
      `${BASE_URL}/forecast.json`,
      {
        params: {
          key: API_KEY,
          q: `${lat},${lon}`,
          days: 7,
          aqi: 'no',
          alerts: 'no',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data by location:', error);
    throw error;
  }
}
