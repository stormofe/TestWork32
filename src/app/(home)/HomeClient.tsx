'use client';

import { useWeatherStore } from '@store/useWeatherStore';

import SearchBar from '@components/SearchBar';
import WeatherBackground from '@ui/WeatherBackground';
import TodayTempChart from '@components/TodayTempChart';
import WeatherCardSk from '@ui/skeletons/WeatherCardSk';
import WeatherCard from '@ui/WeatherCard';

export default function HomeClient() {
	const {
		selectedCity,
		weatherData,
		forecastData,
		isLoadingForecast,
		errorForecast,
		isLoadingWeather,
		errorWeather,
		hydrated
	} = useWeatherStore();

	if (!hydrated) return <div className="mt-4">	<WeatherCardSk /></div>

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
				{!weather && isLoadingWeather && <WeatherCardSk />}
				{errorWeather && <div className="alert alert-danger text-center">{errorWeather}</div>}
				{weather && <WeatherCard city={selectedCity} weather={weather} />}

				{!forecast && isLoadingForecast && <div className="text-center"><WeatherCardSk /></div>}
				{errorForecast && <div className="alert alert-danger text-center">{errorForecast}</div>}
				{forecast && <TodayTempChart forecast={forecast} />}

			</div>
		</WeatherBackground>
	);
}
