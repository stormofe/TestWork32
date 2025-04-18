import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import Navbar from "@ui/Navbar";

export const metadata: Metadata = {
	title: 'Weather',
	description: 'Check current weather',
};

//const geistSans = Geist({
//  variable: "--font-geist-sans",
//  subsets: ["latin"],
//});

//const geistMono = Geist_Mono({
//  variable: "--font-geist-mono",
//  subsets: ["latin"],
//});


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body cz-shortcut-listen="true">
				<Navbar />
				<div className="container">
					{children}
				</div>
			</body>
		</html>
	);
}
