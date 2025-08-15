const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

type WeatherResponse = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    precip_mm: number;
  condition: {
    text: string;
    icon: string;
  };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          icon: string
        }
      };
      hour: {
        time: string;
        temp_c: number;
      }[];
    }[];
  };
};

export async function fetchWeather(city: string): Promise<WeatherResponse | null> {
  try {
    
    if (!API_KEY) {
      throw new Error('API key is not defined');
    }
    const res = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`, { cache: 'no-store' }
    );
    if (!res.ok) throw new Error('Failed to fetch weather data');
    const data: WeatherResponse = await res.json();
    return data;
  } catch (err) {
    console.error('Weather API error:', err);
    return null;
  }
}
