'use client';
import { ForecastResponse } from '@/types/weather';
import { mapTodayHourlyForecast } from '@/utils/mapTodayHourlyForecast';
import TemperatureChart from '@ui/charts/TemperatureChart';

interface Props {
	forecast: ForecastResponse;
}

export default function TodayTempChart({ forecast }: Props) {
	const data = mapTodayHourlyForecast(forecast);
	return (
		<TemperatureChart
			data={data}
			xKey="time"
			tooltipPrefix="⏰"
			fillColor="rgba(255, 193, 7, 0.4)"
		/>
	);
}
