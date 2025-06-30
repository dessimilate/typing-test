'use client'

import { ChevronRight, Crown, Repeat } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { MoreInfo } from '@/components/ui/more-info/MoreInfo'
import { Skeleton } from '@/components/ui/skeleton'

import type { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

import { useGetLastAttempt } from '@/hooks/attempt/useGetLastAttempt'

import style from './TypeResults.module.scss'

interface IStats {
	title: string
	info: string
	text: string
}

const TypeResults: NextComponentType = () => {
	const { push } = useRouter()

	const { lastAttempt, isSuccess } = useGetLastAttempt()

	const stats: IStats[] = [
		{
			title: 'lpm',
			info: `${lastAttempt?.lpm} lpm (letters per minute)`,
			text: `${lastAttempt?.lpm.toFixed()}`
		},
		{
			title: 'acc',
			info: `${lastAttempt?.acc}% (${lastAttempt?.chars} correct / ${lastAttempt?.mistakes} miss)`,
			text: `${lastAttempt?.acc.toFixed()}%`
		},
		{
			title: 'time',
			info: `${lastAttempt?.time}s`,
			text: `${lastAttempt?.time.toFixed()}s`
		}
	]

	return (
		<div className={style.results}>
			<div className={style.wrapper}>
				<div className={style['important-info']}>
					<div className={style.stat}>
						<span>
							wpm
							{lastAttempt?.isNewRecord && <Crown className={style.crown} />}
						</span>

						{lastAttempt ? (
							<MoreInfo info={`${lastAttempt.wpm} wpm`}>
								<span>{lastAttempt.wpm.toFixed()}</span>
							</MoreInfo>
						) : (
							<Skeleton className={style.skeleton} />
						)}
					</div>
					<div className={style.graphic}>TODO: сделать график</div>
				</div>

				<div className={style.stats}>
					{stats.map((stat, i) => (
						<div
							className={style.stat}
							key={`stats-result-${i}`}
						>
							{stat.title}
							{lastAttempt ? (
								<MoreInfo info={stat.info}>
									<span>{stat.text}</span>
								</MoreInfo>
							) : (
								<Skeleton className={style.skeleton} />
							)}
						</div>
					))}
				</div>

				<div className={style.buttons}>
					<MoreInfo info='next text'>
						<button onClick={() => push(URLS.TYPE)}>
							<ChevronRight />
						</button>
					</MoreInfo>

					<MoreInfo info='repeat text'>
						<button onClick={() => push(`${URLS.TYPE}?isRepeat=true`)}>
							<Repeat />
						</button>
					</MoreInfo>
				</div>
			</div>
		</div>
	)
}

export { TypeResults }
