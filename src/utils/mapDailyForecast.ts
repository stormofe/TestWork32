import { ForecastResponse } from '@/types/weather';

export function mapDailyForecast(data: ForecastResponse) {
  const grouped: Record<string, { temps: number[]; icon: string }> = {};

  data.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short', // Mon, Tue...
      day: 'numeric',
      month: 'short',
    });

    if (!grouped[date]) {
      grouped[date] = { temps: [], icon: entry.weather[0].icon };
    }

    grouped[date].temps.push(entry.main.temp);
  });

  return Object.entries(grouped).map(([date, { temps, icon }]) => ({
    date,
    temp: +(temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
    icon,
  }));
}
