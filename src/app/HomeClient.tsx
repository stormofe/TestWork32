'use client';

import { useWeatherStore } from '@store/useWeatherStore';
import SearchBar from '@components/SearchBar';
import WeatherCard from '@ui/WeatherCard';
import WeatherBackground from '@/components/ui/WeatherBackground';

export default function HomeClient() {
	const {
		selectedCity,
		weatherData,
		forecastData,
		isLoading,
		error,
	} = useWeatherStore();

	const weather = selectedCity
		? weatherData[selectedCity]?.data
		: null;

		const forecast = selectedCity
		? forecastData[selectedCity]?.data
		: null;

	const weatherType = weather?.weather[0]?.main.toLowerCase() || 'default';
	return (
		<WeatherBackground weatherType={weatherType}>
			<SearchBar />
			<div className="mt-4">
				{isLoading && <div className="text-center">Загрузка...</div>}
				{error && <div className="alert alert-danger text-center">{error}</div>}
				{weather && <WeatherCard city={selectedCity} weather={weather} />}
				
			</div>
		</WeatherBackground>
	);
}
