'use client';

import { useEffect, useState } from 'react';

import { getCitySuggestions } from '@services/weatherApi';
import { useWeatherStore } from '@store/useWeatherStore';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import SearchInput from '@ui/SearchInput';
import SuggestionList from '@ui/SuggestionList';

import styles from './SearchBar.module.scss'

export default function SearchBar() {
  const [query, setQuery] = useState('');
	const [debouncedQuery, skipNextDebounce, isPending] = useDebouncedValue(query, 400);

  const {
    citySuggestions,
    setCitySuggestions,
    clearCitySuggestions,
    setSuggestionsLoading,
    setSuggestionError,
    setSelectedCity,
    fetchWeather,
  } = useWeatherStore();

  useEffect(() => {
    const fetchSuggestions = async () => {
			if (isPending || debouncedQuery.length < 2) {
				clearCitySuggestions();
				return;
			}

      try {
        setSuggestionsLoading(true);
        const suggestions = await getCitySuggestions(debouncedQuery);
        const names = suggestions.map((c) => `${c.name}, ${c.country}${c.state ? `, ${c.state}` : ''}`);
        setCitySuggestions(names);
      } catch {
        setSuggestionError('Ошибка загрузки подсказок');
      } finally {
        setSuggestionsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, isPending]);

  const handleSelect = async (city: string) => {
    setQuery(city);
		setSelectedCity(city);
    clearCitySuggestions();
		skipNextDebounce()
    await fetchWeather(city);
  };

  return (
    <div className={`position-relative mx-auto ${styles.wrapper}`} >
      <SearchInput
        id="city"
        label="Город"
        value={query}
        placeholder="Введите город"
        onChange={(e) => setQuery(e.target.value)}
      />
      <SuggestionList items={citySuggestions} onSelect={handleSelect} />
    </div>
  );
}
