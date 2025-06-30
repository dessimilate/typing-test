import type { GetServerSideProps, Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { CheckAuthLayout } from '@/components/layouts/CheckAuthLayout'

export const metadata: Metadata = {
	title: 'Type'
}

const TypeLayout = ({ children }: Readonly<PropsWithChildren>) => {
	return <CheckAuthLayout>{children}</CheckAuthLayout>
}

export default TypeLayout
