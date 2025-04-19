'use client';

import { useEffect } from 'react';
import { useWeatherStore } from '@store/useWeatherStore';
import WeatherCardSk from '@/components/ui/skeletons/WeatherCardSk';
import FiveDayChart from '@/components/ui/charts/FiveDayChart';

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

  return (
    <div>
      {isLoadingForecast && <div className="mt-4">	<WeatherCardSk /></div>}
      {errorForecast && <p className="text-danger text-center">{errorForecast}</p>}

      {forecast && (
        <>
          <h5 className="text-center mb-4">
            {forecast.city.name}, {forecast.city.country}
          </h5>
					<FiveDayChart forecast={forecast} />
        </>
      )}
    </div>
  );
}
