import axios from 'axios';

import { mockForecast } from '@/mocks/mockForecast';
import { mockSuggestions } from '@/mocks/mockSuggestions';
import { mockWeather } from '@/mocks/mockWeather';
import { CitySuggestion, WeatherData } from '@/types/weather';

const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
});

const prepareCityName = (city: string) => {
	const decoded = decodeURIComponent(city);
	const trimmedCity = decoded.split(', ')[0].trim();
	return trimmedCity;
};

export const getCurrentWeather = async (city: string, lang = 'en'): Promise<WeatherData> => {
	if (IS_MOCK) {
		console.log('[MOCK] getCurrentWeather:', city);
		return mockWeather;
	}
	const trimmedCity = prepareCityName(city);
	const res = await instance.get('/data/2.5/weather', {
		params: {
			q: trimmedCity,
			appid: API_KEY,
			units: 'metric',
			lang,
		},
	});
	return res.data;
}

export const getForecast = async (city: string, lang = 'en') => {
	if (IS_MOCK) {
		console.log('[MOCK] getForecast:', city);
		return mockForecast;
	}
	const trimmedCity = prepareCityName(city);
	const res = await instance.get('/data/2.5/forecast', {
		params: {
			q: trimmedCity,
			appid: API_KEY,
			units: 'metric',
			lang,
		},
	});
	return res.data;
};

export const getCitySuggestions = async (query: string, limit = 5): Promise<CitySuggestion[]> => {
	if (IS_MOCK) {
		console.log('[MOCK] getCitySuggestions:', query);
		return mockSuggestions;
	}
	const res = await instance.get('/geo/1.0/direct', {
		params: {
			q: query,
			limit,
			appid: API_KEY,
		},
	});
	return res.data; // массив с [ { name, lat, lon, ... } ]
};