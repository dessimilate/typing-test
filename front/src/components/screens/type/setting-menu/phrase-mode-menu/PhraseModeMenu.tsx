import { AtSign, Hash } from 'lucide-react'

import type { NextComponentType } from '@/types/next-component.type'
import { phraseMode } from '@/types/user-config.type'

import { UserUpdateConfig } from '@/store/user-config.store'

import style from './PhraseModeMenu.module.scss'
import { cn } from '@/lib/utils'

export interface IProps {
	phraseMode: phraseMode[]
	updateConfig: UserUpdateConfig
}

const PhraseModeMenu: NextComponentType<IProps> = ({
	phraseMode,
	updateConfig
}) => {
	const isPunctuation = phraseMode.includes('punctuation')
	const isNumbers = phraseMode.includes('numbers')

	return (
		<div className={style['setting-element']}>
			<button
				className={cn({ [style.active]: isPunctuation })}
				onClick={() =>
					updateConfig({
						phraseMode: isPunctuation
							? phraseMode.filter(el => el !== 'punctuation')
							: phraseMode.concat('punctuation')
					})
				}
			>
				<AtSign />
				punctuation
			</button>
			<button
				className={cn({ [style.active]: isNumbers })}
				onClick={() =>
					updateConfig({
						phraseMode: isNumbers
							? phraseMode.filter(el => el !== 'numbers')
							: phraseMode.concat('numbers')
					})
				}
			>
				<Hash />
				numbers
			</button>
		</div>
	)
}

export { PhraseModeMenu }
