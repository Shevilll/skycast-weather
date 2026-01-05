import React from 'react';
import { WeatherData, Unit } from '../types';
import WeatherIcon from './WeatherIcon';
import { getWeatherDescription } from '../services/weatherService';
import { Wind, Droplets, MapPin, Calendar } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: Unit;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  const { current, locationName } = data;
  
  const displayTemp = unit === Unit.CELSIUS 
    ? Math.round(current.temperature) 
    : Math.round((current.temperature * 9/5) + 32);

  const displaySpeed = Math.round(current.windSpeed);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl transition-all hover:shadow-sky-500/10 dark:hover:shadow-sky-900/10">
      <div className="flex flex-col md:flex-row justify-between md:items-start mb-8 gap-4">
        <div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-sky-200 mb-1">
                <MapPin className="w-4 h-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
                    {locationName}
                </h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                {formattedDate}
            </div>
        </div>
        <div className="px-4 py-1.5 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold self-start">
            Live
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex items-center justify-center gap-6">
            <div className="p-4 bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl shadow-lg">
                <WeatherIcon code={current.weatherCode} isDay={current.isDay} size={64} className="text-white drop-shadow-md" />
            </div>
            <div className="flex flex-col">
                <span className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 tracking-tighter">
                    {displayTemp}°
                </span>
                <span className="text-xl md:text-2xl font-medium text-gray-500 dark:text-slate-300 capitalize mt-[-8px]">
                    {getWeatherDescription(current.weatherCode)}
                </span>
            </div>
        </div>

        <div className="w-full md:w-auto flex flex-row md:flex-col gap-4 md:gap-6 justify-center bg-gray-50 dark:bg-slate-700/50 p-6 rounded-2xl">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-300">
                    <Droplets className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{current.humidity}%</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-300">
                    <Wind className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{displaySpeed} <span className="text-sm font-normal">km/h</span></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
