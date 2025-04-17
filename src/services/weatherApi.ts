import { WeatherData } from '@/types/weather';

import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getCurrentWeather = async (city: string, lang = 'ru'): Promise<WeatherData> => {
  const res = await instance.get('/data/2.5/weather', {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang,
    },
  });
  return res.data;
}

export const getForecast = async (city: string, lang = 'ru') => {
  const res = await instance.get('/data/2.5/forecast', {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang,
    },
  });
  return res.data;
};