import { City } from './types';

// Using Open-Meteo API (No Key Required for basic usage)
export const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
export const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const POPULAR_CITIES: City[] = [
  { id: 1, name: "New York", latitude: 40.7128, longitude: -74.0060, country: "USA" },
  { id: 2, name: "London", latitude: 51.5074, longitude: -0.1278, country: "UK" },
  { id: 3, name: "Tokyo", latitude: 35.6895, longitude: 139.6917, country: "Japan" },
  { id: 4, name: "Paris", latitude: 48.8566, longitude: 2.3522, country: "France" },
  { id: 5, name: "Berlin", latitude: 52.5200, longitude: 13.4050, country: "Germany" },
  { id: 6, name: "Sydney", latitude: -33.8688, longitude: 151.2093, country: "Australia" },
  { id: 7, name: "Dubai", latitude: 25.2048, longitude: 55.2708, country: "UAE" },
  { id: 8, name: "Singapore", latitude: 1.3521, longitude: 103.8198, country: "Singapore" },
  { id: 9, name: "Los Angeles", latitude: 34.0522, longitude: -118.2437, country: "USA" },
  { id: 10, name: "Mumbai", latitude: 19.0760, longitude: 72.8777, country: "India" },
  { id: 11, name: "Toronto", latitude: 43.6510, longitude: -79.3470, country: "Canada" },
  { id: 12, name: "Shanghai", latitude: 31.2304, longitude: 121.4737, country: "China" },
  { id: 13, name: "São Paulo", latitude: -23.5505, longitude: -46.6333, country: "Brazil" },
  { id: 14, name: "Mexico City", latitude: 19.4326, longitude: -99.1332, country: "Mexico" },
  { id: 15, name: "Cairo", latitude: 30.0444, longitude: 31.2357, country: "Egypt" },
  { id: 16, name: "Istanbul", latitude: 41.0082, longitude: 28.9784, country: "Turkey" },
  { id: 17, name: "Moscow", latitude: 55.7558, longitude: 37.6173, country: "Russia" },
  { id: 18, name: "Bangkok", latitude: 13.7563, longitude: 100.5018, country: "Thailand" },
  { id: 19, name: "Seoul", latitude: 37.5665, longitude: 126.9780, country: "South Korea" },
  { id: 20, name: "Rome", latitude: 41.9028, longitude: 12.4964, country: "Italy" },
  { id: 21, name: "Madrid", latitude: 40.4168, longitude: -3.7038, country: "Spain" },
  { id: 22, name: "Lagos", latitude: 6.5244, longitude: 3.3792, country: "Nigeria" },
  { id: 23, name: "Jakarta", latitude: -6.2088, longitude: 106.8456, country: "Indonesia" },
  { id: 24, name: "Karachi", latitude: 24.8607, longitude: 67.0011, country: "Pakistan" },
  { id: 25, name: "Buenos Aires", latitude: -34.6037, longitude: -58.3816, country: "Argentina" },
];

export const ITEMS_PER_PAGE = 5;
