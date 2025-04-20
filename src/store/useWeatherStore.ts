'use client';

import axios from 'axios';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { getCitySuggestions, getCurrentWeather, getForecast } from '@services/weatherApi';
import { ForecastResponse, WeatherData } from '@/types/weather';
import { wrapAsync } from '@/utils/wrapAsync';

type WeatherState = {
	selectedCity: string;
	favorites: string[];

	weatherData: Record<string, { data: WeatherData; timestamp: number }>;
	isLoadingWeather: boolean;
	errorWeather: string | null;

	forecastData: Record<string, { data: ForecastResponse; timestamp: number }>;
	isLoadingForecast: boolean;
	errorForecast: string | null;

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
	setWeatherLoading: (loading: boolean) => void;
	setWeatherError: (msg: string | null) => void;

	fetchForecast: (city: string) => Promise<void>;
	setForecastData: (city: string, data: ForecastResponse) => void;
	setForecastLoading: (loading: boolean) => void;
	setForecastError: (error: string | null) => void;

	addFavorite: (city: string) => void;
	removeFavorite: (city: string) => void;
	isFavorite: (city: string) => boolean;

	setHydrated: () => void;

	cleanupWeatherCache: () => void;
	cleanupForecastCache: () => void;

};

export const useWeatherStore = create<WeatherState>()(
	devtools(
		persist(
			(set, get) => ({
				selectedCity: '',
				favorites: [],

				weatherData: {},
				isLoadingWeather: false,
				errorWeather: null,

				forecastData: {},
				isLoadingForecast: false,
				errorForecast: null,

				citySuggestions: [],
				isSuggestionsLoading: false,
				suggestionError: null,

				hydrated: false,

				setSelectedCity: (city) => { 
					console.log(city, 'CITY')
					set({ selectedCity: city })
				},

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

					await wrapAsync(
						() => getCitySuggestions(trimmed),
						{
							onStart: () => {
								setSuggestionsLoading(true);
								setSuggestionError(null);
							},
							onSuccess: (suggestions) => {
								const names = suggestions.map(
									(c) => `${c.name}, ${c.country}${c.state ? `, ${c.state}` : ''}`
								);
								setCitySuggestions(names);
							},
							onError: (error) => {
								console.error('[City Suggestions Error]', error);
								setSuggestionError('Failed to load city suggestions.');
							},
							onFinally: () => setSuggestionsLoading(false),
						}
					);
				},
				setCitySuggestions: (cities) => set({ citySuggestions: cities }),
				clearCitySuggestions: () => set({ citySuggestions: [] }),
				setSuggestionsLoading: (loading) => set({ isSuggestionsLoading: loading }),
				setSuggestionError: (msg) => set({ suggestionError: msg }),

				fetchWeather: async (city: string) => {
					get().cleanupWeatherCache();

					const {
						setWeatherLoading,
						setWeatherError,
						setWeatherData,
						weatherData,
					} = get();

					const ttl = 10 * 60 * 1000;
					const key = city;
					const cacheEntry = weatherData[key];

					if (cacheEntry && Date.now() - cacheEntry.timestamp < ttl) {
						console.log(`[WeatherStore] Using cached weather for "${city}"`);
						return;
					}

					await wrapAsync(
						() => getCurrentWeather(city),
						{
							onStart: () => {
								setWeatherLoading(true);
								setWeatherError(null);
							},
							onSuccess: (data) => {
								setWeatherData(city, data);
							},
							onError: (err) => {
								console.error('[Weather Error]', err);
								const msg = axios.isAxiosError(err)
									? err.response?.data?.message || 'API request failed.'
									: 'Unexpected error while fetching weather.';
									setWeatherError(msg);
							},
							onFinally: () => {
								setWeatherLoading(false);
							},
						}
					);
				},
				setWeatherData: (city, data) =>
					set((state) => {
						const key = city;
						const now = Date.now();
						const existing = state.weatherData[key];
						const ttl = 10 * 60 * 1000;

						if (existing && now - existing.timestamp < ttl) {
							return state;
						}

						return {
							weatherData: {
								...state.weatherData,
								[key]: {
									data,
									timestamp: now,
								},
							},
						};
					}),

				setWeatherLoading: (loading) => set({ isLoadingWeather: loading }),
				setWeatherError: (msg) => set({ errorWeather: msg }),

				fetchForecast: async (city: string) => {
					const {
						forecastData,
						setForecastData,
						setForecastLoading,
						setForecastError,
					} = get();

					const ttl = 10 * 60 * 1000;
					const key = city;
					const cached = forecastData[key];
					if (cached && Date.now() - cached.timestamp < ttl) {
						console.log('[Forecast] Using cached forecast for:', city);
						return;
					}
					console.log('FORECAST', city);
					await wrapAsync(
						() => getForecast(city),
						{
							onStart: () => {
								setForecastLoading(true);
								setForecastError(null);
							},
							onSuccess: (data) => {
								setForecastData(city, data);
							},
							onError: (err) => {
								console.error('[Forecast Error]', err);
								setForecastError('Failed to load forecast data.');
							},
							onFinally: () => setForecastLoading(false),
						}
					);
				},
				setForecastData: (city, data) =>
					set((state) => {
						const key = city;
						const now = Date.now();
						const current = state.forecastData[key];
						const ttl = 10 * 60 * 1000;

						if (current && now - current.timestamp < ttl) {
							return state; // skip update if still fresh
						}

						return {
							forecastData: {
								...state.forecastData,
								[key]: {
									data,
									timestamp: Date.now(),
								},
							},
						}
					}),

				setForecastLoading: (loading) => set({ isLoadingForecast: loading }),
				setForecastError: (msg) => set({ errorForecast: msg }),

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

				setHydrated: () => set({ hydrated: true }),

				cleanupWeatherCache: () => {
					const TTL = 10 * 60 * 1000;
					const now = Date.now();
					const current = get().weatherData;

					const filtered = Object.fromEntries(
						Object.entries(current).filter(([_, entry]) => now - entry.timestamp < TTL)
					);

					set({ weatherData: filtered });
				},
				cleanupForecastCache: () => {
					const TTL = 10 * 60 * 1000;
					const now = Date.now();
					const current = get().forecastData;

					const filtered = Object.fromEntries(
						Object.entries(current).filter(([_, entry]) => now - entry.timestamp < TTL)
					);

					set({ forecastData: filtered });
				},


			}),
			{
				name: 'weather-store',
				partialize: (state) => ({
					favorites: state.favorites,
					weatherData: state.weatherData,
					selectedCity: state.selectedCity,
					forecastData: state.forecastData,
				}),
				onRehydrateStorage: () => (state) => {
					state?.setHydrated?.();
					state?.cleanupWeatherCache?.();
					state?.cleanupForecastCache?.();
				},
			}
		),
		{
			name: 'WeatherStore',
			enabled: process.env.NODE_ENV === 'development',
		}
	)
);
