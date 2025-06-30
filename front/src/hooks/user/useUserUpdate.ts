import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

import type { IUserUpdate } from '@/types/user.type'

export const useUserUpdate = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['user', 'update'],
		mutationFn: ({ ...data }: IUserUpdate) => userService.update(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
		}
	})
}
