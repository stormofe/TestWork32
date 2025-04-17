'use client';

import { getCurrentWeather } from '@/services/weatherApi';
import { WeatherData } from '@/types/weather';
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WeatherState = {
	selectedCity: string;
	favorites: string[];
	isLoading: boolean;
	error: string | null;

	weatherData: Record<string, WeatherData | null>;
	setWeatherData: (city: string, data: WeatherData) => void;

	setSelectedCity: (city: string) => void;
	addFavorite: (city: string) => void;
	removeFavorite: (city: string) => void;
	isFavorite: (city: string) => boolean;

	setLoading: (loading: boolean) => void;
	setError: (message: string | null) => void;

	fetchWeather: (city: string) => Promise<void>;
};

export const useWeatherStore = create<WeatherState>()(
	persist(
		(set, get) => ({
			selectedCity: '',
			favorites: [],
			isLoading: false,
			error: null,
			weatherData: {},

			setWeatherData: (city, data) =>
				set((state) => ({
					weatherData: { ...state.weatherData, [city]: data },
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
				const { setLoading, setError, setWeatherData } = get();
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

			// !add suggestions to search input 
		}),
		{
			name: 'weather-store',
			skipHydration: true,
		}
	)
);
