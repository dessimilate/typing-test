import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import type { NextPage } from 'next/types'

import { Leaderboard } from '@/components/screens/leaderboard/Leaderboard'

export const metadata: Metadata = {
	title: 'Leaderboard'
}

const LeaderboardPage: NextPage = () => {
	return <Leaderboard />
}

export default LeaderboardPage
