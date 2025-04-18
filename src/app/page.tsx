import HomeClient from './HomeClient';

export default function HomePage() {
	return (
		<div className="container py-5">
			<h1 className="mb-4 text-center">Прогноз погоды</h1>
			<HomeClient />
		</div>
	);
}
