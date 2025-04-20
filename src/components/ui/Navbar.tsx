'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useWeatherStore } from '@store/useWeatherStore';

export default function Navbar() {
	const pathname = usePathname();
	const selectedCity = useWeatherStore((s) => s.selectedCity);

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen((prev) => !prev);
	const closeMenu = () => setIsOpen(false);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm mb-4">
			<div className="ms-auto d-lg-none">
				<button
					className="navbar-toggler"
					type="button"
					aria-label="Toggle navigation"
					onClick={toggleMenu}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
			</div>

			<div className={`collapse navbar-collapse justify-content-center ${isOpen ? 'show' : ''}`}>
				<ul className="navbar-nav text-center gap-3">
					<li className="nav-item">
						<Link
							className={`nav-link ${pathname === '/' ? 'active' : ''}`}
							href="/"
							onClick={closeMenu}
						>
							Weather
						</Link>
					</li>
					<li className="nav-item">
						<Link
							className={`nav-link ${pathname === '/favorites' ? 'active' : ''}`}
							href="/favorites"
							onClick={closeMenu}
						>
							Favorite cities
						</Link>
					</li>
					{selectedCity && (
						<li className="nav-item">
							<Link
								className={`nav-link ${pathname.startsWith('/forecast') ? 'active' : ''}`}
								href={`/forecast/${encodeURIComponent(selectedCity)}`}
								onClick={closeMenu}
							>
								Forecast
							</Link>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
}
