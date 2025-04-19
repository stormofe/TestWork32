'use client';

interface WeatherIconDotProps {
  cx?: number;
  cy?: number;
  payload?: {
    icon: string;
  };
  r?: number;
  color?: string;
}

export default function WeatherIconDot({
  cx = 0,
  cy = 0,
  payload,
  r = 4,
  color = '#2196f3',
}: WeatherIconDotProps) {
  if (!payload || !payload.icon) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${payload.icon}@2x.png`;

  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={color} stroke="#fff" strokeWidth={1.5} />
      <image
        href={iconUrl}
        x={cx - 20}
        y={cy - 60}
        width={40}
        height={40}
        style={{ pointerEvents: 'none' }}
        filter="url(#shadow)"
      />
    </>
  );
}
