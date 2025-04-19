'use client';

import Image from 'next/image';
import { WeatherData } from '@/types/weather';
import styles from './WeatherCard.module.scss';
import FavoriteButton from '../FavoriteButton';

interface Props {
	city: string;
	weather: WeatherData;
}

export default function WeatherCard({ city, weather }: Props) {
	const { temp, feels_like, humidity, pressure } = weather.main;
	const { speed } = weather.wind;
	const { icon, main, description } = weather.weather[0];

	const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	const now = new Date();
	const date = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });

	return (
		<div className={`container ${styles.card}`}>
			<FavoriteButton city={city} />
			<div className="row  align-items-center">
				{/* Left: City & time */}
				<div className="col-md-3 text-center text-md-start mb-3 mb-md-0">
					<h4 className="mb-2">{city}</h4>
					<p className="mb-0">{date}</p>
				</div>

				{/* Center: Temp & Icon */}
				<div className="col-md-5 text-center mb-3 mb-md-0">
					<h1 className="display-4 mb-1">{Math.round(temp)}°C</h1>
					<p className="mb-2">Feels like: {Math.round(feels_like)}°C</p>
					<Image
						src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
						alt={description}
						width={80}
						height={80}
					/>
					<p className="fw-semibold mt-2">{main}</p>
				</div>

				{/* Right: Weather details */}
				<div className="col-md-4 text-md-start text-center">
					<p className="mb-1 d-flex justify-content-between"><span >🌅 Sunrise:</span> <strong>{sunrise}</strong></p>
					<p className="mb-1 d-flex justify-content-between"><span>🌇 Sunset:</span> <strong>{sunset}</strong></p>
					<p className="mb-1 d-flex justify-content-between"><span>💧Humidity:</span>  <strong>{humidity}%</strong></p>
					<p className="mb-1 d-flex justify-content-between"><span>💨 Wind:</span> <strong>{speed} m/s</strong></p>
					<p className="mb-1 d-flex justify-content-between"><span>🧭 Pressure:</span> <strong>{pressure} hPa</strong></p>
				</div>
			</div>
		</div>
	);
}
