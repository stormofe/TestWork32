'use client';

import { useEffect } from 'react';
import { useWeatherStore } from '@store/useWeatherStore';
import WeatherCard from '@ui/WeatherCard';
import WeatherCardSk from '@/components/ui/skeletons/WeatherCardSk';

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

	if (!hydrated) return <div className="mt-4">	<WeatherCardSk /></div>

	if (favorites.length === 0) {
		return <p className="text-center">There is nothing here yet. Add city to favorites</p>;
	}

	return (
		<div className="d-flex flex-wrap gap-4 justify-content-center">
			{favorites.map((city) => {
				const weather = weatherData[city]?.data;
				
				return weather ? (
					<WeatherCard key={city} city={city} weather={weather} />
				) : (
					<div key={city} className="mt-4" aria-label='Loading weather'>	<WeatherCardSk /></div>
				);
			})}
		</div>
	);
}
