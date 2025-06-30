import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { DashboardLayout } from '@/components/layouts/dashboard-layout/DashboardLayout'

export const metadata: Metadata = {
	title: 'Profile'
}

const ProfileLayout = ({ children }: Readonly<PropsWithChildren>) => {
	return <DashboardLayout>{children}</DashboardLayout>
}

export default ProfileLayout
