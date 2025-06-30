import type { Metadata, NextPage } from 'next'

import { Profile } from '@/components/screens/profile/Profile'

import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	...NO_INDEX_PAGE
}

const ProfilePage: NextPage = () => {
	return <Profile />
}

export default ProfilePage
