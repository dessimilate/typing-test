import { type PropsWithChildren, type ReactNode } from 'react'

import type { NextComponentType } from '@/types/next-component.type'

import style from './DynamicField.module.scss'

export interface IProps {
	isFirstChild: boolean
	secondChild: ReactNode
}

const DynamicField: NextComponentType<PropsWithChildren<IProps>> = ({
	secondChild,
	isFirstChild,
	children
}) => {
	return isFirstChild ? children : secondChild
}

export { DynamicField }
