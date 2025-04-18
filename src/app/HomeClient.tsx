'use client';

import { useWeatherStore } from '@store/useWeatherStore';
import SearchBar from '@components/SearchBar';
import WeatherCard from '@ui/WeatherCard';

export default function HomeClient() {
	const {
		selectedCity,
		weatherData,
		isLoading,
		error,
	} = useWeatherStore();

	const weather = selectedCity
		? weatherData[selectedCity]?.data
		: null;

	return (
		<>
			<SearchBar />

			<div className="mt-4">
				{isLoading && <div className="text-center">Загрузка...</div>}
				{error && <div className="alert alert-danger text-center">{error}</div>}
				{weather && <WeatherCard city={selectedCity} weather={weather} />}
			</div>
		</>
	);
}
