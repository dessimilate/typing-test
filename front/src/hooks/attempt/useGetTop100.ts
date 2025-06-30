import { useQuery } from '@tanstack/react-query'

import { attemptService } from '@/services/attempt.service'

import { Top100Type } from '@/types/attempt.type'

export const useGetTop100 = (type: Top100Type) => {
	return useQuery({
		queryKey: ['top100', type],
		queryFn: ({ queryKey }) =>
			attemptService.getTop100(queryKey[1] as Top100Type),
	})
}
