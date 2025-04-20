'use client';

import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { useWeatherStore } from '@store/useWeatherStore';

import SearchInput from '@ui/SearchInput';
import SuggestionList from '@ui/SuggestionList';

import styles from './SearchBar.module.scss';

export default function SearchBar() {
	const [query, setQuery] = useState('');
	const [debouncedQuery, skipNextDebounce, isPending] = useDebouncedValue(query, 400);

	const {
		citySuggestions,
		fetchForecast,
		fetchCitySuggestions,
		clearCitySuggestions,
		selectedCity,
		setSelectedCity,
		fetchWeather,
		 hydrated
	} = useWeatherStore();

	useEffect(() => {
		if (hydrated && selectedCity) {
			setQuery(selectedCity);
			skipNextDebounce()
		}
	}, [hydrated, selectedCity]);

	useEffect(() => {
		if (isPending) return;
		fetchCitySuggestions(debouncedQuery);
	}, [debouncedQuery, isPending]);

	const handleSelect = async (city: string) => {
		skipNextDebounce();
		setQuery(city);
		setSelectedCity(city);
		clearCitySuggestions();
		fetchWeather(city)
		fetchForecast(city);
	};

	return (
		<div className={`position-relative mx-auto ${styles.wrapper}`}>
			<SearchInput
				id="city"
				value={query}
				placeholder="Enter the city"
				onChange={(e) => setQuery(e.target.value)}
			/>
			<SuggestionList items={citySuggestions} onSelect={handleSelect} />
		</div>
	);
}
