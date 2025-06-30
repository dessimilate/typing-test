import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { attemptService } from '@/services/attempt.service'

import { IAttemptRecord } from '@/types/attempt.type'

import { URLS } from '@/config/urls.config'

export const useCreateAttempt = () => {
	const queryClient = useQueryClient()

	const { push } = useRouter()

	const { mutate: createAttempt, ...rest } = useMutation({
		mutationKey: ['create', 'attempt'],
		mutationFn: ({ ...data }: IAttemptRecord) =>
			attemptService.createAttempt(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['attempts']
			})

			queryClient.invalidateQueries({
				queryKey: ['profile']
			})

			push(URLS.TYPE_RESULTS)
		}
	})

	return { createAttempt, ...rest }
}
