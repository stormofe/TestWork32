'use client';

import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from 'recharts';
import { ForecastResponse } from '@/types/weather';
import { mapTodayHourlyForecast } from '@/utils/mapTodayHourlyForecast';
import WeatherIconDot from './WeatherIconDot';

import styles from './TodayTempChart.module.scss'

interface Props {
	forecast: ForecastResponse;
}

export default function TodayTempChart({ forecast }: Props) {
	const data = mapTodayHourlyForecast(forecast);

	const getColorByTime = (unix: number, sunrise: number, sunset: number) => {
		if (unix < sunrise || unix > sunset) {
			return 'rgba(63, 81, 181, 0.4)'; // ночь
		}
		return 'rgba(255, 193, 7, 0.5)'; // день
	};

	return (
		<div className={styles.wrapper}>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} padding={{ right: 20 }} margin={{ top: 50, right: 20, left: 0, bottom: 20 }}>
					<defs>
						<filter id="shadow">
							<feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="black" floodOpacity="0.5" />
						</filter>
						<linearGradient id="tempGradient" x1="0" y1="0" x2="1" y2="0">
							{data.map((point, index) => {
								const percent = index / (data.length - 1);
								const color = getColorByTime(point.dt, forecast.city.sunrise, forecast.city.sunset);
								return (
									<stop
										key={index}
										offset={`${percent * 100}%`}
										stopColor={color}
										stopOpacity={0.6}
									/>
								);
							})}
						</linearGradient>
					</defs>

					<XAxis dataKey="time" padding={{ left: 20, right: 20 }} />
					<YAxis
						domain={['auto', 'auto']}
						tickFormatter={(value) => `${Math.floor(+value)}°`}
						padding={{ top: 20, bottom: 0 }}
					/>
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip
						formatter={(value) => `${Math.floor(+value)} °C`}
						labelFormatter={(label) => `⏰ ${label}`}
					/>
					<Area
						animationDuration={800}
						animationBegin={200}
						type="monotone"
						dataKey="temp"
						stroke="#2196f3"
						fill="url(#tempGradient)"
						strokeWidth={2}
						dot={<WeatherIconDot />}
						activeDot={{ r: 6 }}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
