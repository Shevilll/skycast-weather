import React from 'react';
import { WeatherData, Unit } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  data: WeatherData;
  unit: Unit;
}

const Forecast: React.FC<ForecastProps> = ({ data, unit }) => {
  const { daily } = data;

  const forecastDays = daily.time.slice(1, 6).map((time, index) => {
    const originalIndex = index + 1;
    return {
      time,
      code: daily.weatherCode[originalIndex],
      max: daily.temperatureMax[originalIndex],
      min: daily.temperatureMin[originalIndex],
      prob: daily.precipitationProbability[originalIndex]
    };
  });

  const formatTemp = (temp: number) => {
    const t = unit === Unit.CELSIUS ? temp : (temp * 9/5) + 32;
    return Math.round(t);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-sky-500 rounded-full"></span>
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecastDays.map((day) => {
          const date = new Date(day.time);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          return (
            <div key={day.time} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 flex flex-col items-center justify-between gap-4 transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="text-center">
                <p className="font-bold text-gray-700 dark:text-gray-200">{dayName}</p>
                <p className="text-xs text-gray-400">{dateStr}</p>
              </div>
              
              <WeatherIcon code={day.code} size={32} />
              
              <div className="w-full flex justify-between items-center text-sm font-medium">
                 <span className="text-gray-800 dark:text-white">{formatTemp(day.max)}°</span>
                 <span className="text-gray-400">{formatTemp(day.min)}°</span>
              </div>
              
              {day.prob > 0 && (
                <div className="text-xs font-semibold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
                  {day.prob}% Rain
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
