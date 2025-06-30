import type { Metadata, NextPage } from 'next/types'

import { Auth } from '@/components/screens/auth/Auth'

import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Register',
	...NO_INDEX_PAGE
}

const RegisterPage: NextPage = () => {
	return <Auth type='Register' />
}

export default RegisterPage
