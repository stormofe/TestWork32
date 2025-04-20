import { Metadata } from 'next';
import ClientForecast from './ClientForecast';

interface Props {
	params: Promise<{ city: string }>
}

export async function generateMetadata(
	{ params }: Props
): Promise<Metadata> {
	// ждём, пока Promise с params разрешится
	const { city } = await params

	return {
		title: `Weather forecast in ${city} — Weather App`,
		description: `Weather forecast for 5 days in ${city}. Temperature, wind, precipitation.`,
	}
}

export default async function ForecastPage({ params }: Props) {
	const { city } = await params
	return (
		<div className="container py-3">
			<h2 className="text-center mb-4">Weather forecast for 5 days</h2>
			<ClientForecast city={city} />
		</div>
	);
}
