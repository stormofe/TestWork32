'use client';

import { useEffect } from 'react';
import { useWeatherStore } from '@store/useWeatherStore';
import WeatherCard from '@ui/WeatherCard';

export default function FavoriteWeatherList() {
	const hydrated = useWeatherStore((state) => state.hydrated);
	const favorites = useWeatherStore((state) => state.favorites);
	const weatherData = useWeatherStore((state) => state.weatherData);
	const fetchWeather = useWeatherStore((state) => state.fetchWeather);
	

  useEffect(() => {
    if (!hydrated) return;

    favorites.forEach((city) => {
      if (!weatherData[city]) {
        fetchWeather(city);
      }
    });
  }, [hydrated, favorites]);

  if (!hydrated) {
    return <p className="text-center">Загрузка данных из localStorage...</p>;
  }

  if (favorites.length === 0) {
    return <p className="text-center">Нет избранных городов.</p>;
  }

  return (
    <div className="d-flex flex-wrap gap-4 justify-content-center">
      {favorites.map((city) => {
        const weather = weatherData[city]?.data;

        return weather ? (
          <WeatherCard key={city} city={city} weather={weather} />
        ) : (
          <div key={city} className="card text-center p-4" style={{ width: 300 }}>
            <p className="mb-0">Загрузка погоды для {city}...</p>
          </div>
        );
      })}
    </div>
  );
}
