import { CitySuggestion, WeatherData, ForecastResponse } from '@/types/weather';
import axios from 'axios';

const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;


const MOCK_WEATHER: WeatherData = {
	name: 'Moscow',
	weather: [
		{
			id: 800,
			main: 'Clear',
			description: 'clear sky',
			icon: '01d',
		},
	],
	main: {
		temp: 23.4,
		feels_like: 24,
		temp_min: 21,
		temp_max: 25,
		pressure: 1013,
		humidity: 56,
	},
	wind: {
		speed: 3.5,
		deg: 180,
	},
	clouds: {
		all: 5,
	},
	sys: {
		country: 'RU',
		sunrise: 1713400000,
		sunset: 1713440000,
	},
	visibility: 10000,
};

const MOCK_SUGGESTIONS: CitySuggestion[] = [
	{ name: 'Moscow', lat: 55.75, lon: 37.62, country: 'RU', state: 'Moscow' },
	{ name: 'Mockville', lat: 50.5, lon: 30.5, country: 'UA', state: 'Mock State' },
];

const MOCK_FORECAST: ForecastResponse = {
	city: {
		name: 'Mock City',
		country: 'MC',
		state: 'Mock State',
	},
	list: Array.from({ length: 5 }, (_, i) => ({
		dt: Date.now() / 1000 + i * 86400,
		dt_txt: new Date(Date.now() + i * 86400000).toISOString(),
		main: {
			temp: 20 + i,
			feels_like: 19 + i,
			temp_min: 18 + i,
			temp_max: 22 + i,
			pressure: 1013 + i,
			humidity: 40 + i,
		},
		weather: [
			{
				id: 800,
				main: 'Rain',
				description: `Ясно +${i}`,
				icon: '01d',
			},
		],
		wind: {
			speed: 2 + i,
			deg: 100 + i * 10,
		},
	})),
};


const BASE_URL = 'https://api.openweathermap.org';

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
});



export const getCurrentWeather = async (city: string, lang = 'ru'): Promise<WeatherData> => {
	if (IS_MOCK) {
		console.log('[MOCK] getCurrentWeather:', city);
		return MOCK_WEATHER;
	}
	const decoded = decodeURIComponent(city);
	const trimmedCity = decoded.split(',')[0].trim();
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

export const getForecast = async (city: string, lang = 'ru') => {
	if (IS_MOCK) {
		console.log('[MOCK] getForecast:', city);
		return MOCK_FORECAST;
	}
	const decoded = decodeURIComponent(city);
	const trimmedCity = decoded.split(',')[0].trim();
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
		return MOCK_SUGGESTIONS;
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