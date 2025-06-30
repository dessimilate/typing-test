import type { NextComponentType } from '@/types/next-component.type'

import { UserUpdateConfig } from '@/store/user-config.store'

import style from './TimeAmountMenu.module.scss'
import { cn } from '@/lib/utils'

export interface IProps {
	timeAmount?: number
	updateConfig: UserUpdateConfig
}

const TimeAmountMenu: NextComponentType<IProps> = ({
	updateConfig,
	timeAmount
}) => {
	return (
		<div className={style['setting-element']}>
			<button
				className={cn({ [style.active]: timeAmount === 15 })}
				onClick={() => updateConfig({ timeAmount: 15 })}
			>
				15
			</button>
			<button
				className={cn({ [style.active]: timeAmount === 30 })}
				onClick={() => updateConfig({ timeAmount: 30 })}
			>
				30
			</button>
			<button
				className={cn({ [style.active]: timeAmount === 60 })}
				onClick={() => updateConfig({ timeAmount: 60 })}
			>
				60
			</button>
			<button
				className={cn({ [style.active]: timeAmount === 120 })}
				onClick={() => updateConfig({ timeAmount: 120 })}
			>
				120
			</button>
		</div>
	)
}

export { TimeAmountMenu }
