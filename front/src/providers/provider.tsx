'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type PropsWithChildren, useState } from 'react'

import { GlobalLoader } from '@/components/ui/global-loader'

const MainProvider = ({ children }: PropsWithChildren) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					gcTime: 1000 * 60 * 60 * 24
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			<GlobalLoader />
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}

export { MainProvider }
