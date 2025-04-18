export interface WeatherData {
	name: string;
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	wind: {
		speed: number;
		deg: number;
	};
	clouds?: {
		all: number;
	};
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};

	visibility?: number;
}


export interface CitySuggestion {
	name: string;
	local_names?: Record<string, string>;
	lat: number;
	lon: number;
	country: string;
	state?: string;
}

export interface ForecastItem {
	dt: number;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	wind: {
		speed: number;
		deg: number;
	};
	dt_txt: string;
}

export interface ForecastResponse {
	city: {
		name: string;
		country: string;
		state: string;
	};
	list: ForecastItem[];
}
