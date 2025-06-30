import { useQuery } from '@tanstack/react-query'

import { attemptService } from '@/services/attempt.service'

export const useGetAttempts = () => {
	const { data: attempts, isLoading } = useQuery({
		queryKey: ['attempts'],
		queryFn: () => attemptService.getMyAttempts()
	})

	return { attempts, isLoading }
}
