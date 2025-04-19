import { ForecastResponse } from "@/types/weather";

export function mapTodayHourlyForecast(forecast: ForecastResponse) {
  const now = Math.floor(Date.now() / 1000); // текущий момент в секундах
  const end = now + 24 * 60 * 60;

  return forecast.list
    .filter((item) => item.dt >= now && item.dt <= end)
    .map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-EN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      dt: item.dt,
      temp: item.main.temp,
      icon: item.weather[0].icon,
    }));
}
