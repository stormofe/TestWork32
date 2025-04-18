import ClientForecast from './ClientForecast';

interface Props {
	params: { city: string };
}

export async function generateMetadata({ params }: Props) {
	const { city } = await params

	return {
		title: `Прогноз погоды в ${city} — Weather App`,
		description: `Прогноз погоды на 5 дней в ${city}. Температура, ветер, осадки.`,
	};
}

export default async function ForecastPage({ params }: Props) {
	const { city } = await params

	return (
		<div className="container py-5">
			<h2 className="text-center mb-4">Прогноз погоды на 5 дней</h2>
			<ClientForecast city={city} />
		</div>
	);
}
