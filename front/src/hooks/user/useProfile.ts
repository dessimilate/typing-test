import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export const useProfile = () => {
	const {
		data: profile,
		isLoading,
		isSuccess
	} = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile()
	})

	return { profile, isLoading, isSuccess }
}
