'use client';

import { useEffect } from 'react';
import { useWeatherStore } from '@/store/useWeatherStore';

export default function Home() {

	const {
		selectedCity,
		setSelectedCity,
		fetchWeather,
		weatherData,
		isLoading,
		error,
	} = useWeatherStore();

	useEffect(() => {
		const city = 'Moscow';
		setSelectedCity(city);
		fetchWeather(city);
	}, [fetchWeather, setSelectedCity]);

	const weather = selectedCity ? weatherData[selectedCity] : null;

	return (
		<div>
			<h1>Погода в {selectedCity}</h1>

			{isLoading && <p>Загрузка...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}

			{weather && (
				<div>
					<p><strong>{weather.weather[0].description}</strong></p>
					<p>Температура: {weather.main.temp} °C</p>
					<p>Ощущается как: {weather.main.feels_like} °C</p>
					<p>Ветер: {weather.wind.speed} м/с</p>
				</div>
			)}
		</div>
	);
}
