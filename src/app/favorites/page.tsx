import FavoriteWeatherList from './FavoriteWeatherList';

export const metadata = {
  title: 'Featured Cities - Weather App',
  description: 'View your favorite cities and the current weather for each',
};

export default function FavoritesPage() {
  return (
    <div className="container py-3">
      <FavoriteWeatherList />
    </div>
  );
}
