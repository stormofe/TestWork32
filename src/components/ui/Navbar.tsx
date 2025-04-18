'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWeatherStore } from '@store/useWeatherStore';

export default function Navbar() {
  const pathname = usePathname();
  const selectedCity = useWeatherStore((s) => s.selectedCity);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm mb-4">
      <Link className="navbar-brand fw-bold" href="/">
        Weather App
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto gap-3">
          <li className="nav-item">
            <Link
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              href="/"
            >
              Главная
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${pathname === '/favorites' ? 'active' : ''}`}
              href="/favorites"
            >
              Избранное
            </Link>
          </li>
          {selectedCity && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  pathname.startsWith('/forecast') ? 'active' : ''
                }`}
                href={`/forecast/${encodeURIComponent(selectedCity)}`}
              >
                Прогноз
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
