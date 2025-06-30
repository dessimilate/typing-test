'use client'

import { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import type { NextComponentType } from '@/types/next-component.type'

import { useUserConfigStore } from '@/store/user-config.store'

import style from './SettingMenu.module.scss'
import { CountModeMenu } from './count-mode-menu/CountModeMenu'
import { PhraseModeMenu } from './phrase-mode-menu/PhraseModeMenu'
import { TimeAmountMenu } from './time-amount-menu/TimeAmountMenu'
import { WordsAmountMenu } from './words-amount-menu/WordsAmountMenu'

const SettingMenu: NextComponentType = () => {
	const { userConfig, updateConfig } = useUserConfigStore()
	const [isLoaded, setIsLoaded] = useState(false)

	const { countMode, phraseMode, timeAmount, wordsAmount } = userConfig

	useEffect(() => {
		setIsLoaded(true)
	}, [userConfig])

	return (
		<div className={style.settings}>
			{isLoaded ? (
				<>
					<PhraseModeMenu {...{ phraseMode, updateConfig }} />
					<CountModeMenu {...{ countMode, updateConfig }} />
					{countMode === 'words' ? (
						<WordsAmountMenu {...{ wordsAmount, updateConfig }} />
					) : countMode === 'time' ? (
						<TimeAmountMenu {...{ timeAmount, updateConfig }} />
					) : (
						<></>
					)}
				</>
			) : (
				<Skeleton className={style.skeleton} />
			)}
		</div>
	)
}

export { SettingMenu }
