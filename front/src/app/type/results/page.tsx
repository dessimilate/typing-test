import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import type { NextPage } from 'next/types'

import { TypeResults } from '@/components/screens/type-results/TypeResults'

export const metadata: Metadata = {
	title: 'Type Results'
}

const TypeResultsPage: NextPage = () => {
	return <TypeResults />
}

export default TypeResultsPage
