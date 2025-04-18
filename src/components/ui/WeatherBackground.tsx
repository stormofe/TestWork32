'use client';

import { useEffect } from 'react';

interface Props {
  weatherType: string;
  children: React.ReactNode;
}

const normalizeWeather = (type: string): string => {
  const key = type.toLowerCase();

  if (key.includes('clear')) return 'clear';
  if (key.includes('rain')) return 'rain';
  if (key.includes('cloud')) return 'clouds';
  if (key.includes('snow')) return 'snow';
  if (key.includes('thunder')) return 'thunderstorm';

  return 'default';
};

export default function WeatherBackground({ weatherType, children }: Props) {
  const className = `weather-${normalizeWeather(weatherType)}`;

  useEffect(() => {
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);

  return <>{children}</>;
}
