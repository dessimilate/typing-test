import type { NextComponentType } from '@/types/next-component.type'

import { UserUpdateConfig } from '@/store/user-config.store'

import style from './WordsAmountMenu.module.scss'
import { cn } from '@/lib/utils'

export interface IProps {
	wordsAmount?: number
	updateConfig: UserUpdateConfig
}

const WordsAmountMenu: NextComponentType<IProps> = ({
	wordsAmount,
	updateConfig
}) => {
	return (
		<div className={style['setting-element']}>
			<button
				className={cn({ [style.active]: wordsAmount === 10 })}
				onClick={() => updateConfig({ wordsAmount: 10 })}
			>
				10
			</button>
			<button
				className={cn({ [style.active]: wordsAmount === 25 })}
				onClick={() => updateConfig({ wordsAmount: 25 })}
			>
				25
			</button>
			<button
				className={cn({ [style.active]: wordsAmount === 50 })}
				onClick={() => updateConfig({ wordsAmount: 50 })}
			>
				50
			</button>
			<button
				className={cn({ [style.active]: wordsAmount === 100 })}
				onClick={() => updateConfig({ wordsAmount: 100 })}
			>
				100
			</button>
		</div>
	)
}

export { WordsAmountMenu }
