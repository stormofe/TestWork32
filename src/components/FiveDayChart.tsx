'use client';

import { ForecastResponse } from '@/types/weather';
import { mapDailyForecast } from '@/utils/mapDailyForecast';

import TemperatureChart from '@ui/charts/TemperatureChart';

interface Props {
	forecast: ForecastResponse;
}

export default function FiveDayChart({ forecast }: Props) {
	const data = mapDailyForecast(forecast).slice(0, 5);

	return (
		<TemperatureChart
			data={data}
			xKey="date"
			tooltipPrefix="📅"
		/>
	);
}
