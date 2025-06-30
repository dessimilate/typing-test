import type { Metadata, NextPage } from 'next/types'

import { Auth } from '@/components/screens/auth/Auth'

import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Login',
	...NO_INDEX_PAGE
}

const LoginPage: NextPage = () => {
	return <Auth type='Login' />
}

export default LoginPage
