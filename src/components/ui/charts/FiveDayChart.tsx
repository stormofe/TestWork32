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
import { mapDailyForecast } from '@/utils/mapDailyForecast';
import WeatherIconDot from './WeatherIconDot';

import styles from './TodayTempChart.module.scss'

interface Props {
  forecast: ForecastResponse;
}

export default function FiveDayChart({ forecast }: Props) {
  const data = mapDailyForecast(forecast).slice(0, 5);

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} padding={{ right: 20 }} margin={{ top: 50, right: 20, left: 0, bottom: 20 }}>
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="black" floodOpacity="0.5" />
            </filter>
          </defs>

          <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(value) => `${Math.floor(+value)}°`}
            padding={{ top: 20, bottom: 0 }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(value) => `${Math.floor(+value)} °C`}
            labelFormatter={(label) => `📅 ${label}`}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#2196f3"
            fill="rgba(33, 150, 243, 0.2)"
            strokeWidth={2}
            dot={<WeatherIconDot />}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
