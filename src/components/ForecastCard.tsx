'use client';

import type { ForecastItem } from '@/types/weather';

interface Props {
  item: ForecastItem;
}

export default function ForecastCard({ item }: Props) {
  const date = new Date(item.dt_txt);
  const formatted = date.toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="card text-center" style={{ minWidth: 150 }}>
      <div className="card-body p-3">
        <h6 className="card-title mb-2">{formatted}</h6>
        <p className="mb-1">{item.weather[0].description}</p>
        <p className="mb-0">
          {item.main.temp}°C<br />
          <small>ощущается как {item.main.feels_like}°C</small>
        </p>
      </div>
    </div>
  );
}
