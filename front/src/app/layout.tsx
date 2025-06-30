import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import type { PropsWithChildren } from 'react'

import { MainProvider } from '@/providers/provider'

import { SITE_NAME } from '@/constants/seo.constant'

import './globals.scss'

const font = Roboto_Mono({
	subsets: ['cyrillic', 'latin'],
	weight: ['300', '400', '500', '600']
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Best from f'
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
