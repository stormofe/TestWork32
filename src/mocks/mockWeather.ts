import { WeatherData } from "@/types/weather";

export const mockWeather: WeatherData = {
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