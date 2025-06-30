import type { HTMLAttributes, PropsWithChildren } from 'react'

import type { NextComponentType } from '@/types/next-component.type'

import { useCheckAuth } from '@/hooks/useCheckAuth'

import { DashboardLayout } from './dashboard-layout/DashboardLayout'
import { NoAuthLayout } from './no-auth-layout/NoAuthLayout'

const CheckAuthLayout: NextComponentType<
	PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, className }) => {
	const isAuth = useCheckAuth()

	const Layout = isAuth ? DashboardLayout : NoAuthLayout

	return <Layout className={className}>{children}</Layout>
}

export { CheckAuthLayout }
