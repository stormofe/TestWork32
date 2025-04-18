'use client';

import { useWeatherStore } from '@store/useWeatherStore';

interface FavoriteButtonProps {
  city: string;
  className?: string;
}

export default function FavoriteButton({ city, className }: FavoriteButtonProps) {
  const {
    isFavorite,
    addFavorite,
    removeFavorite,
  } = useWeatherStore();

  const inFavorites = isFavorite(city);

	const toggleFavorite = () => {
		if (inFavorites) {
			removeFavorite(city);
		} else {
			addFavorite(city);
		}
	};
	

  return (
    <button
      className={`btn btn-sm ${inFavorites ? 'btn-outline-danger' : 'btn-outline-primary'} ${className || ''}`}
      onClick={toggleFavorite}
    >
      {inFavorites ? 'Удалить из избранного' : 'Добавить в избранное'}
    </button>
  );
}
