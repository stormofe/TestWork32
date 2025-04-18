'use client';

import { useEffect, useState } from 'react';
import { getCitySuggestions } from '@services/weatherApi';
import { useWeatherStore } from '@store/useWeatherStore';
import SearchInput from '@ui/SearchInput';
import SuggestionList from '@ui/SuggestionList';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const {
    citySuggestions,
    setCitySuggestions,
    clearCitySuggestions,
    setSuggestionsLoading,
    setSuggestionError,
    setSelectedCity,
    fetchWeather,
  } = useWeatherStore();

  // debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  // fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 2) {
        clearCitySuggestions();
        return;
      }

      try {
        setSuggestionsLoading(true);
        const suggestions = await getCitySuggestions(debouncedQuery);
        const names = suggestions.map((c) => `${c.name}, ${c.country}, ${c.state}`);
        setCitySuggestions(names);
      } catch {
        setSuggestionError('Ошибка загрузки подсказок');
      } finally {
        setSuggestionsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSelect = async (city: string) => {
    setQuery(city);
		setSelectedCity(city);
    clearCitySuggestions();
    await fetchWeather(city);
  };

  return (
    <div className="position-relative" style={{ maxWidth: '400px', margin: '0 auto' }}>
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
