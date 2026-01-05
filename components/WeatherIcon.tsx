import React from 'react';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Moon,
  Wind
} from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay?: number;
  className?: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isDay = 1, className = "", size = 24 }) => {
  // WMO Weather interpretation codes
  // 0: Clear sky
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  // 45, 48: Fog
  // 51, 53, 55: Drizzle
  // 61, 63, 65: Rain
  // 71, 73, 75: Snow
  // 80, 81, 82: Rain showers
  // 95, 96, 99: Thunderstorm

  if (code === 0) {
    return isDay ? <Sun size={size} className={`text-yellow-500 ${className}`} /> : <Moon size={size} className={`text-blue-300 ${className}`} />;
  }
  if (code === 1 || code === 2) {
    return <CloudSun size={size} className={`text-yellow-400 ${className}`} />;
  }
  if (code === 3) {
    return <Cloud size={size} className={`text-gray-400 ${className}`} />;
  }
  if (code === 45 || code === 48) {
    return <CloudFog size={size} className={`text-gray-400 ${className}`} />;
  }
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return <CloudRain size={size} className={`text-blue-400 ${className}`} />;
  }
  if ([71, 73, 75].includes(code)) {
    return <CloudSnow size={size} className={`text-sky-200 ${className}`} />;
  }
  if ([95, 96, 99].includes(code)) {
    return <CloudLightning size={size} className={`text-purple-500 ${className}`} />;
  }

  return <Sun size={size} className={`text-yellow-500 ${className}`} />;
};

export default WeatherIcon;
