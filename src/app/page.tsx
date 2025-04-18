'use client';

import { useWeatherStore } from '@/store/useWeatherStore';
import SearchBar from '@/components/SearchBar';

export default function Home() {

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
		<div className="container py-5">
		<h1 className="mb-4 text-center">Погода по городам</h1>

		<SearchBar />

		<div className="mt-4">
			{isLoading && <div className="text-center">Загрузка...</div>}

			{error && <div className="alert alert-danger text-center">{error}</div>}

			{weather && (
				<div className="card mt-3 mx-auto" style={{ maxWidth: '400px' }}>
					<div className="card-body text-center">
						<h4 className="card-title">{selectedCity}</h4>
						<p className="card-text">
							<strong>{weather.weather[0].description}</strong><br />
							Температура: {weather.main.temp} °C<br />
							Ощущается как: {weather.main.feels_like} °C<br />
							Ветер: {weather.wind.speed} м/с
						</p>
					</div>
				</div>
			)}
		</div>
	</div>
	);
}
