'use client';

import { getCurrentWeather } from '@/services/weatherApi';
import { WeatherData } from '@/types/weather';
import axios from 'axios';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';


type WeatherState = {
	selectedCity: string;
	favorites: string[];
	isLoading: boolean;
	error: string | null;

	weatherData: Record<string, { data: WeatherData; timestamp: number }>;
	setWeatherData: (city: string, data: WeatherData) => void;

	addFavorite: (city: string) => void;
	removeFavorite: (city: string) => void;
	isFavorite: (city: string) => boolean;

	setLoading: (loading: boolean) => void;
	setError: (message: string | null) => void;

	fetchWeather: (city: string) => Promise<void>;


	citySuggestions: string[];
	isSuggestionsLoading: boolean;
	suggestionError: string | null;
	setCitySuggestions: (cities: string[]) => void;
	clearCitySuggestions: () => void;
	setSuggestionsLoading: (loading: boolean) => void;
	setSuggestionError: (msg: string | null) => void;


	setSelectedCity: (city: string) => void;

};

export const useWeatherStore = create<WeatherState>()(
	devtools(
		persist(
			(set, get) => ({
				selectedCity: '',
				favorites: [],
				isLoading: false,
				error: null,
				weatherData: {},
				citySuggestions: [],
				isSuggestionsLoading: false,
				suggestionError: null,

				setWeatherData: (city, data) =>
					set((state) => ({
						weatherData: {
							...state.weatherData,
							[city]: {
								data,
								timestamp: Date.now(),
							},
						},
					})),

				setSelectedCity: (city) => set({ selectedCity: city }),
				addFavorite: (city) =>
					set((state) => {
						if (!state.favorites.includes(city)) {
							return { favorites: [...state.favorites, city] };
						}
						return state;
					}),
				removeFavorite: (city) =>
					set((state) => ({
						favorites: state.favorites.filter((c) => c !== city),
					})),
				isFavorite: (city) => get().favorites.includes(city),

				setLoading: (loading) => set({ isLoading: loading }),
				setError: (message) => set({ error: message }),

				fetchWeather: async (city: string) => {
					const {
						setLoading,
						setError,
						setWeatherData,
						weatherData,
					} = get();
				
					const key = city.toLowerCase();
					const cacheEntry = weatherData[key];
					const ttl = 10 * 60 * 1000; // 10 минут
				
					// Проверка кэша
					if (cacheEntry && Date.now() - cacheEntry.timestamp < ttl) {
						console.log(`[WeatherStore] Using cached weather for "${city}"`);
						return;
					}
				
					setLoading(true);
					setError(null);
				
					try {
						const data = await getCurrentWeather(city);
						setWeatherData(city, data);
					} catch (error: unknown) {
						if (axios.isAxiosError(error)) {
							setError(error.response?.data?.message || 'Ошибка запроса к API');
						} else {
							setError('Неизвестная ошибка');
						}
					} finally {
						setLoading(false);
					}
				},
				
				setCitySuggestions: (cities) => set({ citySuggestions: cities }),
				clearCitySuggestions: () => set({ citySuggestions: [] }),
				setSuggestionsLoading: (loading) => set({ isSuggestionsLoading: loading }),
				setSuggestionError: (msg) => set({ suggestionError: msg }),

			}),
			{
				name: 'weather-store',
				skipHydration: true,
			}
		),
		{
      name: 'WeatherStore',
      enabled: process.env.NODE_ENV === 'development',
    }
	)
);
