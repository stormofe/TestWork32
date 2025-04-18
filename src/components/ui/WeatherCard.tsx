import type { WeatherData } from '@types/weather';
import Link from 'next/link';
import { useWeatherStore } from '@store/useWeatherStore';
import FavoriteButton from './FavoriteButton';

interface Props {
  city: string;
  weather: WeatherData;
}

export default function WeatherCard({ city, weather }: Props) {
  const { isFavorite } = useWeatherStore();
  const inFavorites = isFavorite(city);
  const encodedCity = encodeURIComponent(city);

  return (
    <div className="card mt-3 mx-auto shadow-sm position-relative" style={{ maxWidth: '400px' }}>
      <div className="card-body text-center">
        <Link href={`/forecast/${encodedCity}`} className="text-decoration-none text-dark">
          <h4 className="card-title mb-2">
            {city}
            {inFavorites && <span className="text-warning ms-2">★</span>}
          </h4>
          <p className="card-text mb-2">
            <strong>{weather.weather[0].description}</strong><br />
            Температура: {weather.main.temp} °C<br />
            Ощущается как: {weather.main.feels_like} °C<br />
            Ветер: {weather.wind.speed} м/с
          </p>
        </Link>

        <FavoriteButton city={city} className="mt-2" />
      </div>
    </div>
  );
}
