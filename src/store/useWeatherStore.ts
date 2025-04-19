'use client';

import { getCitySuggestions, getCurrentWeather, getForecast } from '@services/weatherApi';
import { ForecastResponse, WeatherData } from '@/types/weather';
import axios from 'axios';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

type WeatherState = {
	selectedCity: string;
	favorites: string[];
	isLoading: boolean;
	error: string | null;

	weatherData: Record<string, { data: WeatherData; timestamp: number }>;
	forecastData: Record<string, { data: ForecastResponse; timestamp: number }>;

	citySuggestions: string[];
	isSuggestionsLoading: boolean;
	suggestionError: string | null;

	hydrated: boolean;

	setSelectedCity: (city: string) => void;

	fetchCitySuggestions: (query: string) => Promise<void>;
	setCitySuggestions: (cities: string[]) => void;
	clearCitySuggestions: () => void;
	setSuggestionsLoading: (loading: boolean) => void;
	setSuggestionError: (msg: string | null) => void;

	fetchWeather: (city: string) => Promise<void>;
	setWeatherData: (city: string, data: WeatherData) => void;

	fetchForecast: (city: string) => Promise<void>;
	setForecastData: (city: string, data: ForecastResponse) => void;

	addFavorite: (city: string) => void;
	removeFavorite: (city: string) => void;
	isFavorite: (city: string) => boolean;

	setLoading: (loading: boolean) => void;
	setError: (message: string | null) => void;

	setHydrated: () => void;

	cleanupCache: () => void;
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
				forecastData: {},

				citySuggestions: [],
				isSuggestionsLoading: false,
				suggestionError: null,

				hydrated: false,

				setSelectedCity: (city) => set({ selectedCity: city }),

				fetchCitySuggestions: async (query: string) => {
					const {
						setSuggestionsLoading,
						setSuggestionError,
						setCitySuggestions,
						clearCitySuggestions,
					} = get();
				
					const trimmed = query.trim();
				
					if (trimmed.length < 2) {
						clearCitySuggestions();
						return;
					}
				
					try {
						setSuggestionsLoading(true);
						const suggestions = await getCitySuggestions(trimmed);
						const names = suggestions.map((c) =>
							`${c.name}, ${c.country}${c.state ? `, ${c.state}` : ''}`
						);
						setCitySuggestions(names);
					} catch {
						setSuggestionError('Ошибка загрузки подсказок');
					} finally {
						setSuggestionsLoading(false);
					}
				},
				
				setCitySuggestions: (cities) => set({ citySuggestions: cities }),
				clearCitySuggestions: () => set({ citySuggestions: [] }),
				setSuggestionsLoading: (loading) => set({ isSuggestionsLoading: loading }),
				setSuggestionError: (msg) => set({ suggestionError: msg }),

				fetchWeather: async (city: string) => {
					get().cleanupCache();

					const {
						setLoading,
						setError,
						setWeatherData,
						weatherData,
					} = get();

					const key = city;
					const cacheEntry = weatherData[key];
					const ttl = 10 * 60 * 1000;

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

				fetchForecast: async (city: string) => {
					const { forecastData, setForecastData } = get();
					const ttl = 10 * 60 * 1000;
					const key = city.toLowerCase();
					const cached = forecastData[key];

					if (cached && Date.now() - cached.timestamp < ttl) {
						console.log('[forecast] Используем кэш');
						return;
					}

					try {
						const data = await getForecast(city); // из API
						setForecastData(city, data);
					} catch (err) {
						console.error('[forecast error]', err);
					}
				},

				setForecastData: (city, data) =>
					set((state) => ({
						forecastData: {
							...state.forecastData,
							[city]: {
								data,
								timestamp: Date.now(),
							},
						},
					})),

				addFavorite: (city) =>
					set((state) =>
						state.favorites.includes(city)
							? state
							: { favorites: [...state.favorites, city] }
					),

				removeFavorite: (city) =>
					set((state) => ({
						favorites: state.favorites.filter((c) => c !== city),
					})),

				isFavorite: (city) => get().favorites.includes(city),

				setLoading: (loading) => set({ isLoading: loading }),
				setError: (message) => set({ error: message }),

				setHydrated: () => set({ hydrated: true }),

				cleanupCache: () => {
					const TTL = 10 * 60 * 1000;
					const now = Date.now();
					const current = get().weatherData;

					const filtered = Object.fromEntries(
						Object.entries(current).filter(([_, entry]) => now - entry.timestamp < TTL)
					);

					set({ weatherData: filtered });
				},
			}),
			{
				name: 'weather-store',
				partialize: (state) => ({
					favorites: state.favorites,
					weatherData: state.weatherData,
					selectedCity: state.selectedCity,
				}),
				onRehydrateStorage: () => (state) => {
					state?.setHydrated?.();
					state?.cleanupCache?.();
				},
			}
		),
		{
			name: 'WeatherStore',
			enabled: process.env.NODE_ENV === 'development',
		}
	)
);
