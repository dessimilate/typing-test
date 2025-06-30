import { useMutation, useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export const useIsUsernameUnique = () => {
	return useMutation({
		mutationKey: ['is', 'username', 'unique'],
		mutationFn: (name: string) => userService.isUsernameUnique(name),
		gcTime: 0
	})
}
