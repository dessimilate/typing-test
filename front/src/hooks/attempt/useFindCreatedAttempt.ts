import { useMutationState } from '@tanstack/react-query'

import type { IAttempt } from '@/types/attempt.type'

export const useFindCreatedAttempt = () => {
	let [createdAttempt] = useMutationState({
		filters: { mutationKey: ['create', 'attempt'] }
	})

	return createdAttempt?.data as IAttempt | undefined
}
