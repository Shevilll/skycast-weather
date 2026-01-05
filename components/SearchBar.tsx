import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { getCoordinates } from '../services/weatherService';
import { City } from '../types';

interface SearchBarProps {
  onCitySelect: (city: City) => void;
  onLocationRequest: () => void;
  isLoadingLocation?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect, onLocationRequest, isLoadingLocation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setIsSearching(true);
        const cities = await getCoordinates(query);
        setResults(cities);
        setIsSearching(false);
        setShowDropdown(true);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: City) => {
    setQuery('');
    setShowDropdown(false);
    onCitySelect(city);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto z-50">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-12 py-3 rounded-full bg-white dark:bg-slate-800 border-2 border-transparent focus:border-sky-500 focus:outline-none shadow-lg text-gray-700 dark:text-gray-200 transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        
        <button 
          onClick={onLocationRequest}
          disabled={isLoadingLocation}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Use current location"
        >
          {isLoadingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
        </button>
      </div>

      {showDropdown && (
        <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden max-h-80 overflow-y-auto border border-gray-100 dark:border-slate-700">
            {isSearching ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Searching...
                </div>
            ) : results.length > 0 ? (
                <ul>
                    {results.map((city) => (
                        <li key={city.id}>
                            <button
                                onClick={() => handleSelect(city)}
                                className="w-full text-left px-6 py-3 hover:bg-sky-50 dark:hover:bg-slate-700 transition-colors flex flex-col"
                            >
                                <span className="font-medium text-gray-800 dark:text-gray-200">{city.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No results found
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
