'use client';

import { useWeatherStore } from '@store/useWeatherStore';
import StarToggle from '@ui/StarToggle';
import styles from './FavoriteButton.module.scss';

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

	const toggle = () => {
		if (inFavorites) {
			removeFavorite(city);
		} else {
			addFavorite(city);
		}
	};


	return (
		<div className={styles.wrapper}>
			<StarToggle
				active={inFavorites}
				onToggle={toggle}
				className={className}
				title={inFavorites ? 'Удалить из избранного' : 'Добавить в избранное'}
			/>
		</div>

	);
}
