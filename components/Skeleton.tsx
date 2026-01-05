import React from 'react';

export const WeatherCardSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl animate-pulse">
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-3">
          <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
        </div>
        <div className="h-10 w-24 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          <div className="h-20 w-32 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
        </div>
        <div className="space-y-4 w-full md:w-auto">
            <div className="h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
            <div className="h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
            <div className="h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export const ForecastSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1,2,3,4,5].map(i => (
                <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm animate-pulse flex flex-col items-center gap-3">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-700"></div>
                    <div className="h-6 w-12 bg-gray-200 dark:bg-slate-700 rounded"></div>
                </div>
            ))}
        </div>
    )
}

export const TableSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded mb-6"></div>
        <div className="space-y-4">
            {[1,2,3,4,5].map(i => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-slate-700 last:border-0">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded"></div>
                </div>
            ))}
        </div>
    </div>
  )
}
