'use client';

import { useEffect, useState } from 'react';
import { getForecast } from '@services/weatherApi';
import type { ForecastResponse } from '@/types/weather';
import ForecastCard from '@components/ForecastCard';

interface Props {
  city: string;
}

export default function ClientForecast({ city }: Props) {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getForecast(city);
        setForecast(data);
      } catch {
        setError('Ошибка загрузки прогноза');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [city]);

  if (!city) {
    return <p className="text-center text-danger">Город не указан</p>;
  }

  return (
    <div>
      {loading && <p className="text-center">Загрузка...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {forecast && (
        <>
          <h5 className="text-center mb-4">
            {forecast.city.name}, {forecast.city.country}
          </h5>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {forecast.list.slice(0, 5).map((item, index) => (
              <ForecastCard key={index} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
