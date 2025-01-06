import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Box, Grid, Grid2 } from '@mui/material'
import Navbar from './components/Navbar'
import SessionWrapper from './components/SessionWrapper'
import ProtectedByAuth from '@/utils/ProtectedByAuth'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Box>
					<Navbar />
					<Box
						sx={{
							overflowY: 'scroll',
						}}
					>
						{children}
					</Box>
				</Box>
			</body>
		</html>
	)
}
