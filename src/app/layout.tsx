import type { Metadata } from "next";
import { Roboto } from 'next/font/google';

import Navbar from "@ui/Navbar";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';

export const metadata: Metadata = {
	title: 'Weather',
	description: 'Check current weather',
};

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body cz-shortcut-listen="true" className={`${roboto.variable}`}>
				<Navbar />
				<div className="container">
					{children}
				</div>
			</body>
		</html>
	);
}
