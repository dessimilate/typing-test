import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import type { NextPage } from 'next/types'

import { Type } from '@/components/screens/type/Type'

export const metadata: Metadata = {
	title: 'Type'
}

const TypePage: NextPage = () => {
	return <Type />
}

export default TypePage
