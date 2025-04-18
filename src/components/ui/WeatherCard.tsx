import type { WeatherData } from '@types/weather';
import Link from 'next/link';
import FavoriteButton from '@components/FavoriteButton';
import Image from 'next/image';

import styles from './WeatherCard.module.scss';


interface Props {
	city: string;
	weather: WeatherData;
}

const formatTime = (timestamp: number) =>
	new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	});

export default function WeatherCard({ city, weather }: Props) {

	const icon = weather.weather[0].icon;
	const description = weather.weather[0].description;
	const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

	return (
		<div className={styles.card}>
			<FavoriteButton city={city} />
			<div className="d-flex align-items-center gap-3">
				<Image src={iconUrl} alt="icon" width={64} height={64} />
				<div>
					<h4 className={styles.title}>{city}</h4>
					<p className="text-muted mb-1 text-capitalize">{description}</p>
				</div>
			</div>

			<hr className="my-3" />

			<div className="d-flex justify-content-between">
				<div>
					<strong>{weather.main.temp}°C</strong>
					<div className="text-muted small">Ощущается как {weather.main.feels_like}°C</div>
				</div>
				<div className="text-end text-muted small">
					<div>Мин: {weather.main.temp_min}°</div>
					<div>Макс: {weather.main.temp_max}°</div>
				</div>
			</div>

			<hr className="my-3" />

			<div className="row text-center text-muted small">
				<div className="col">
					💧 <br />
					Влажность<br />
					<strong>{weather.main.humidity}%</strong>
				</div>
				<div className="col">
					🌬️ <br />
					Ветер<br />
					<strong>{weather.wind.speed} м/с</strong>
				</div>
				{weather.clouds && (
					<div className="col">
						☁️ <br />
						Облачность<br />
						<strong>{weather.clouds.all}%</strong>
					</div>
				)}

				<div className="col">
					📈 <br />
					Давление<br />
					<strong>{weather.main.pressure} гПа</strong>
				</div>
			</div>

			<hr className="my-3" />

			<div className="d-flex justify-content-between text-muted small">
				<div>🌅 Восход: <strong>{formatTime(weather.sys.sunrise)}</strong></div>
				<div>🌇 Закат: <strong>{formatTime(weather.sys.sunset)}</strong></div>
			</div>

			<div className="mt-3 text-center">
				<Link
					href={`/forecast/${city}`}
					className="btn btn-outline-primary"
				>
					📅 Прогноз на 5 дней
				</Link>
			</div>
		</div>
	);
}
