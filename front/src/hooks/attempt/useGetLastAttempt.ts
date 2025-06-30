import { useQuery } from '@tanstack/react-query'

import { attemptService } from '@/services/attempt.service'

export const useGetLastAttempt = () => {
	const { data: lastAttempt, ...rest } = useQuery({
		queryKey: ['last', 'attempt'],
		queryFn: () => attemptService.getLastAttempt()
	})

	return { lastAttempt, ...rest }
}
