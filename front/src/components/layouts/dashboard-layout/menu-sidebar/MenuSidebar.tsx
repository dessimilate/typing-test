import { BadgeInfo, Crown, LayoutGrid, Settings } from 'lucide-react'
import Link from 'next/link'

import type { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

import style from './MenuSidebar.module.scss'

const MenuSidebar: NextComponentType = () => {
	return (
		<div className={style.sidebar}>
			<Link href={URLS.TYPE}>
				<div className={style.logo}>
					<LayoutGrid />
					<div>LateType</div>
				</div>
			</Link>

			<Link href={URLS.LEADERBOARD}>
				<Crown />
			</Link>

			<Link href={URLS.ABOUT}>
				<BadgeInfo />
			</Link>

			<Link href={URLS.SETTINGS}>
				<Settings />
			</Link>
		</div>
	)
}

export { MenuSidebar }
