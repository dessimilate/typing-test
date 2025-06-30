import { useQuery } from '@tanstack/react-query'

import { phraseService } from '@/services/phrase.service'

export const usePhrase = (amount: number) => {
	const { data, ...rest } = useQuery({
		queryKey: ['phrase', amount],
		queryFn: ({ queryKey }) => phraseService.getPhrase(+queryKey[1]),
		gcTime: 0,
		refetchOnMount: false,
		refetchOnReconnect: false
	})

	return { data, ...rest }
}
