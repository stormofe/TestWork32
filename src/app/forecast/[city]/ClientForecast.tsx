'use client';

import { useEffect } from 'react';

import { useWeatherStore } from '@store/useWeatherStore';
import FiveDayChart from '@components/FiveDayChart';
import WeatherCardSk from '@ui/skeletons/WeatherCardSk';
import WeatherBackground from '@ui/WeatherBackground';

interface Props {
	city?: string;
}

export default function ClientForecast({ city }: Props) {
	const {
		selectedCity,
		forecastData,
		fetchForecast,
		isLoadingForecast,
		errorForecast,
		hydrated
	} = useWeatherStore();

	const activeCity = (city && decodeURIComponent(city)) || selectedCity;

	useEffect(() => {
		if (activeCity) {
			fetchForecast(activeCity);
		}
	}, [activeCity]);

	if (!hydrated) return <div className="mt-4">	<WeatherCardSk /></div>

	const forecast = activeCity ? forecastData[activeCity]?.data : null;

	if (!activeCity) {
		return <p className="text-center text-danger">No city selected</p>;
	}

	const weatherType = forecast?.list[0].weather[0].main.toLowerCase() || 'default';

	return (
		<WeatherBackground weatherType={weatherType}>
		<div>
			{!forecast && isLoadingForecast && <div className="mt-4">	<WeatherCardSk /></div>}
			{!forecast && errorForecast && <p className="text-danger text-center">{errorForecast}</p>}
			{forecast && (
				<>
					<h5 className="text-center mb-4">
						{forecast.city.name}, {forecast.city.country}
					</h5>
					<FiveDayChart forecast={forecast} />
				</>
			)}
		</div>
		</WeatherBackground>
	);
}
