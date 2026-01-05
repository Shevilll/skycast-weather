import { WEATHER_API_URL, GEOCODING_API_URL } from '../constants';
import { Coordinates, WeatherData, City, CityTableRowData } from '../types';

export const getCoordinates = async (city: string): Promise<City[]> => {
  try {
    const response = await fetch(`${GEOCODING_API_URL}?name=${encodeURIComponent(city)}&count=5&language=en&format=json`);
    if (!response.ok) throw new Error('Geocoding failed');
    const data = await response.json();
    if (!data.results) return [];

    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      country: item.country,
      admin1: item.admin1
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getWeather = async (coords: Coordinates): Promise<WeatherData> => {
  const params = new URLSearchParams({
    latitude: coords.latitude.toString(),
    longitude: coords.longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    hourly: 'temperature_2m',
    timezone: 'auto',
    forecast_days: '6'
  });

  const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
  if (!response.ok) throw new Error('Weather fetch failed');
  const data = await response.json();

  return {
    current: {
      temperature: data.current.temperature_2m,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m || 0,
      weatherCode: data.current.weather_code,
      isDay: data.current.is_day,
      time: data.current.time,
      humidity: data.current.relative_humidity_2m,
    },
    daily: {
      time: data.daily.time,
      weatherCode: data.daily.weather_code,
      temperatureMax: data.daily.temperature_2m_max,
      temperatureMin: data.daily.temperature_2m_min,
      precipitationProbability: data.daily.precipitation_probability_max,
    },
    hourly: {
      time: data.hourly.time,
      temperature_2m: data.hourly.temperature_2m,
    },
    locationName: coords.name || 'Unknown Location'
  };
};

export const getCitiesWeather = async (cities: City[]): Promise<CityTableRowData[]> => {
  const promises = cities.map(async (city) => {
    try {
      const params = new URLSearchParams({
        latitude: city.latitude.toString(),
        longitude: city.longitude.toString(),
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
        timezone: 'auto'
      });
      const res = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
      const data = await res.json();

      return {
        name: city.name,
        country: city.country,
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        condition: 'Unknown'
      };
    } catch (e) {
      return null;
    }
  });

  const results = await Promise.all(promises);
  return results.filter((r): r is CityTableRowData => r !== null);
};

export const getWeatherDescription = (code: number): string => {
  switch (code) {
    case 0: return 'Clear sky';
    case 1: return 'Mainly clear';
    case 2: return 'Partly cloudy';
    case 3: return 'Overcast';
    case 45: case 48: return 'Fog';
    case 51: case 53: case 55: return 'Drizzle';
    case 61: case 63: case 65: return 'Rain';
    case 71: case 73: case 75: return 'Snow';
    case 80: case 81: case 82: return 'Rain showers';
    case 95: case 96: case 99: return 'Thunderstorm';
    default: return 'Variable';
  }
};
