'use client'

import { LayoutGrid, LogIn } from 'lucide-react'
import Link from 'next/link'
import type { HTMLAttributes, PropsWithChildren } from 'react'

import type { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

import style from './NoAuthLayout.module.scss'
import { cn } from '@/lib/utils'

const NoAuthLayout: NextComponentType<
	PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, className }) => {
	return (
		<div className={cn(style.main, className)}>
			<div className={style.sidebar}>
				<Link href={URLS.TYPE}>
					<div className={style.logo}>
						<LayoutGrid />
						<div>LateType</div>
					</div>
				</Link>
				<Link href={URLS.LOGIN}>
					<LogIn />
				</Link>
			</div>
			<div className={style.content}>{children}</div>
		</div>
	)
}

export { NoAuthLayout }
