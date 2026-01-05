import React, { useState, useEffect } from 'react';
import { POPULAR_CITIES, ITEMS_PER_PAGE } from '../constants';
import { getCitiesWeather, getWeatherDescription } from '../services/weatherService';
import { CityTableRowData, Unit } from '../types';
import WeatherIcon from './WeatherIcon';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { TableSkeleton } from './Skeleton';

interface CityTableProps {
  unit: Unit;
}

const CityTable: React.FC<CityTableProps> = ({ unit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<CityTableRowData[]>([]);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(POPULAR_CITIES.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const citiesToFetch = POPULAR_CITIES.slice(startIndex, endIndex);
      
      const data = await getCitiesWeather(citiesToFetch);
      setPageData(data);
      setLoading(false);
    };

    fetchPageData();
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const formatTemp = (temp: number) => {
    const t = unit === Unit.CELSIUS ? temp : (temp * 9/5) + 32;
    return Math.round(t);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Global Weather</h3>
        <span className="text-xs font-medium text-gray-500 dark:text-slate-400 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
            Page {currentPage} of {totalPages}
        </span>
      </div>
      
      <div className="w-full overflow-x-auto">
        {loading ? (
            <div className="p-6">
                <div className="space-y-4 animate-pulse">
                    {[1,2,3,4,5].map(i => <div key={i} className="h-12 bg-gray-100 dark:bg-slate-700 rounded-lg w-full"></div>)}
                </div>
            </div>
        ) : (
            <table className="w-full text-left min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                <th className="px-6 py-4 font-semibold">City</th>
                <th className="px-6 py-4 font-semibold">Condition</th>
                <th className="px-6 py-4 font-semibold">Temp</th>
                <th className="px-6 py-4 font-semibold">Humidity</th>
                <th className="px-6 py-4 font-semibold">Wind</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {pageData.map((city) => (
                <tr key={city.name} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="font-semibold text-gray-800 dark:text-white">{city.name}</span>
                            <span className="text-xs text-gray-500 dark:text-slate-400">{city.country}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <WeatherIcon code={city.weatherCode} size={20} />
                            <span className="text-sm text-gray-600 dark:text-slate-300">{getWeatherDescription(city.weatherCode)}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="font-bold text-gray-800 dark:text-white">{formatTemp(city.temperature)}°</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-slate-300">
                        {city.humidity}%
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-slate-300">
                        {Math.round(city.windSpeed)} km/h
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
      </div>

      <div className="p-4 bg-gray-50 dark:bg-slate-700/50 flex justify-end gap-2 border-t border-gray-100 dark:border-slate-700">
        <button 
          onClick={handlePrev} 
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-gray-600 dark:text-gray-300"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-gray-600 dark:text-gray-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CityTable;