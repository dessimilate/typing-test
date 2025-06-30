import { Baseline, Clock } from 'lucide-react'

import type { NextComponentType } from '@/types/next-component.type'
import type { countMode } from '@/types/user-config.type'

import type { UserUpdateConfig } from '@/store/user-config.store'

import style from './CountModeMenu.module.scss'
import { cn } from '@/lib/utils'

export interface IProps {
	countMode?: countMode
	updateConfig: UserUpdateConfig
}

const CountModeMenu: NextComponentType<IProps> = ({
	countMode,
	updateConfig
}) => {
	return (
		<div className={style['setting-element']}>
			<button
				className={cn({ [style.active]: countMode === 'time' })}
				onClick={() => updateConfig({ countMode: 'time' })}
			>
				<Clock />
				time
			</button>
			<button
				className={cn({ [style.active]: countMode === 'words' })}
				onClick={() => updateConfig({ countMode: 'words' })}
			>
				<Baseline />
				words
			</button>
		</div>
	)
}

export { CountModeMenu }
