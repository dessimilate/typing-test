import { SettingMenu } from '@/components/screens/type/setting-menu/SettingMenu'
import { TypingPlace } from '@/components/screens/type/typing-place/TypingPlace'

import type { NextComponentType } from '@/types/next-component.type'

import style from './Type.module.scss'

const Type: NextComponentType = () => {
	return (
		<div className={style.content}>
			<SettingMenu />
			<TypingPlace />
		</div>
	)
}

export { Type }
