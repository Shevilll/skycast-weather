import React, { useState, useEffect } from 'react';
import { Coordinates, WeatherData, Unit, City } from './types';
import { getWeather, getCoordinates } from './services/weatherService';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import CityTable from './components/CityTable';
import { WeatherCardSkeleton, ForecastSkeleton } from './components/Skeleton';
import { Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light';
  });
  const [unit, setUnit] = useState<Unit>(() => {
    const savedUnit = localStorage.getItem('unit');
    return (savedUnit === Unit.CELSIUS || savedUnit === Unit.FAHRENHEIT) ? (savedUnit as Unit) : Unit.CELSIUS;
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('unit', unit);
  }, [unit]);

  useEffect(() => {
    handleCurrentLocation();
  }, []);

  const fetchWeather = async (coords: Coordinates) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(coords);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city: City) => {
    fetchWeather({ 
        latitude: city.latitude, 
        longitude: city.longitude, 
        name: city.name, 
        country: city.country 
    });
  };

  const handleCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await fetchWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            name: "Current Location"
          });
          setLocationLoading(false);
        },
        (err) => {
          console.warn("Geolocation failed, falling back to London");
          fetchWeather({ latitude: 51.5074, longitude: -0.1278, name: "London" });
          setLocationLoading(false);
        }
      );
    } else {
      fetchWeather({ latitude: 51.5074, longitude: -0.1278, name: "London" });
      setLocationLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleUnit = () => {
    setUnit(prev => prev === Unit.CELSIUS ? Unit.FAHRENHEIT : Unit.CELSIUS);
  };

  return (
    <div className="min-h-screen pb-12 transition-colors duration-300">
      
      <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-700 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19"/><path d="M20.67 12.09c.27-.6.44-1.25.44-1.93 0-2.49-2.01-4.5-4.5-4.5-.47 0-.91.07-1.33.2-.6-2.58-2.9-4.5-5.63-4.5-3.18 0-5.75 2.58-5.75 5.75 0 .7.12 1.37.35 2"/></svg>
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-800 dark:from-sky-400 dark:to-white hidden sm:block">
                    SkyCast
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleUnit}
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-sky-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all font-semibold w-12 flex items-center justify-center border border-transparent dark:border-slate-700"
                    title={`Switch to ${unit === Unit.CELSIUS ? 'Fahrenheit' : 'Celsius'}`}
                >
                    {unit === Unit.CELSIUS ? '°C' : '°F'}
                </button>
                <button 
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all border border-transparent dark:border-slate-700"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <section className="flex flex-col items-center justify-center space-y-6 mt-4">
            <div className="w-full text-center space-y-2 mb-4">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Check the <span className="text-sky-500">Weather</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Get real-time updates, 5-day forecasts, and detailed global climate data.
                </p>
            </div>
            <SearchBar 
                onCitySelect={handleCitySelect} 
                onLocationRequest={handleCurrentLocation}
                isLoadingLocation={locationLoading}
            />
        </section>

        {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center max-w-xl mx-auto border border-red-100 dark:border-red-900/30">
                {error}
            </div>
        )}

        <div className="space-y-8">
            {loading || !weatherData ? (
                <>
                    <WeatherCardSkeleton />
                    <ForecastSkeleton />
                </>
            ) : (
                <>
                    <CurrentWeather data={weatherData} unit={unit} />
                    <Forecast data={weatherData} unit={unit} />
                </>
            )}
        </div>

        <div className="w-full">
            <CityTable unit={unit} />
        </div>

      </main>
    </div>
  );
};

export default App;