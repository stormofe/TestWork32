import FavoriteWeatherList from './FavoriteWeatherList';

export const metadata = {
  title: 'Избранные города — Weather App',
  description: 'Просмотр избранных городов и текущей погоды по каждому',
};

export default function FavoritesPage() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Избранные города</h2>
      <FavoriteWeatherList />
    </div>
  );
}
