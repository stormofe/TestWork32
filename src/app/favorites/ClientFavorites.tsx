'use client';

import { useEffect } from 'react';

import { useWeatherStore } from '@store/useWeatherStore';
import WeatherCard from '@ui/WeatherCard';
import WeatherCardSk from '@ui/skeletons/WeatherCardSk';
import WeatherBackground from '@ui/WeatherBackground';

export default function ClientFavorites() {
	const hydrated = useWeatherStore((state) => state.hydrated);
	const favorites = useWeatherStore((state) => state.favorites);
	const weatherData = useWeatherStore((state) => state.weatherData);
	const fetchWeather = useWeatherStore((state) => state.fetchWeather);

	useEffect(() => {
		if (!hydrated || favorites.length === 0) return;

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

	const weatherType = weatherData[favorites[0]]?.data?.weather[0]?.main.toLowerCase() || 'default';

	return (
		<WeatherBackground weatherType={weatherType}>
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
		</WeatherBackground>
	);
}
