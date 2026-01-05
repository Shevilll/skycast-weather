export interface Coordinates {
  latitude: number;
  longitude: number;
  name?: string;
  country?: string;
}

export interface CurrentWeather {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  isDay: number;
  time: string;
  humidity: number;
}

export interface DailyForecast {
  time: string[];
  weatherCode: number[];
  temperatureMax: number[];
  temperatureMin: number[];
  precipitationProbability: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast;
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  locationName: string;
}

export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export enum Unit {
  CELSIUS = '°C',
  FAHRENHEIT = '°F',
}

export interface CityTableRowData {
  name: string;
  country: string;
  temperature: number;
  condition: string;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
}
