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
import WeatherIconDot from './WeatherIconDot';

import { ForecastChartPoint } from '@/types/weather';

import styles from './TemperatureChart.module.scss';

interface Props {
  data: ForecastChartPoint[];
  xKey: string;
  tooltipPrefix?: string;
  fillColor?: string;
}

export default function TemperatureChart({
  data,
  xKey,
  tooltipPrefix = '',
  fillColor = 'rgba(33, 150, 243, 0.2)',
}: Props) {
  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          padding={{ right: 20 }}
          margin={{ top: 50, right: 20, left: 0, bottom: 20 }}
        >
          <defs>
            <filter id="shadow">
              <feDropShadow
                dx="0"
                dy="1"
                stdDeviation="2"
                floodColor="black"
                floodOpacity="0.5"
              />
            </filter>
          </defs>

          <XAxis dataKey={xKey} padding={{ left: 20, right: 20 }} />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(value) => `${Math.floor(+value)}°`}
            padding={{ top: 20, bottom: 0 }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(value) => `${Math.floor(+value)} °C`}
            labelFormatter={(label) => `${tooltipPrefix} ${label}`}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#2196f3"
            fill={fillColor}
            strokeWidth={2}
            dot={<WeatherIconDot />}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
