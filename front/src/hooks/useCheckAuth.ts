import { cookies } from 'next/headers'

import { EnumTokens } from '@/types/auth.type'

export const useCheckAuth = () => {
	const refreshToken = cookies().get(EnumTokens.REFRESH_TOKEN)?.value

	if (refreshToken) return true

	return false
}
