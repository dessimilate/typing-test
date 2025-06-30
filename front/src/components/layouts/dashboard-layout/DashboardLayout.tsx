'use client'

import type { HTMLAttributes, PropsWithChildren } from 'react'

import type { NextComponentType } from '@/types/next-component.type'

import style from './DashboardLayout.module.scss'
import { MenuSidebar } from './menu-sidebar/MenuSidebar'
import { ProfileSidebar } from './profile-sidebar/ProfileSidebar'
import { cn } from '@/lib/utils'

const DashboardLayout: NextComponentType<
	PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, className }) => {
	return (
		<div className={cn(style.main, className)}>
			<div className={style.sidebar}>
				<MenuSidebar />
				<ProfileSidebar />
			</div>
			<div className={style.content}>{children}</div>
		</div>
	)
}

export { DashboardLayout }
