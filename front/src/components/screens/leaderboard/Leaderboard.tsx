'use client'

import { format } from 'date-fns'
import { CircleUserRound, Crown } from 'lucide-react'
import { useEffect } from 'react'

import type { NextComponentType } from '@/types/next-component.type'

import { useGetTop100 } from '@/hooks/attempt/useGetTop100'
import { useProfile } from '@/hooks/user/useProfile'

import style from './Leaderboard.module.scss'
import { cn } from '@/lib/utils'

const Leaderboard: NextComponentType = () => {
	const { data } = useGetTop100('week')

	const { profile } = useProfile()

	return (
		<div className={style.leaderboard}>
			<div className={style.list}>
				{data &&
					data.map(({ wpm, acc, user, createdAt }, i) => (
						<div
							className={cn(style.row, { [style.dark]: !(i % 2) })}
							key={`row1-${i}`}
						>
							<div className={style['row-left']}>
								<div className={style['row-number']}>
									{i ? <div>{i + 1}</div> : <Crown />}
								</div>
								<div className={style['row-name']}>
									<CircleUserRound />
									<span>{user.name}</span>
									<span className={style.you}>
										{user.id === profile?.id && 'you'}
									</span>
								</div>
							</div>
							<div className={style['row-right']}>
								<div className={style.stats}>
									<span>{wpm.toFixed(2)}</span>
									<span>{acc.toFixed(2)}%</span>
								</div>
								<div className={style.date}>
									<span>{format(createdAt, 'dd LLL y')}</span>
									<span>{format(createdAt, 'hh:mm')}</span>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export { Leaderboard }
