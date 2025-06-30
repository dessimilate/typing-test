'use client'

import { PropsWithChildren, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { NextComponentType } from '@/types/next-component.type'

import style from './MoreInfo.module.scss'

interface IProps {
	info: string
}

const MoreInfo: NextComponentType<PropsWithChildren<IProps>> = ({
	info,
	children
}) => {
	const [isHover, setIsHover] = useState(false)

	const ref = useRef(null)

	return (
		<>
			<div
				className={style.main}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				{children}
				<div className={style.info}>
					<CSSTransition
						in={isHover}
						timeout={150}
						ref={ref}
						classNames={{
							enter: style.enter,
							enterDone: style['enter-done'],
							exit: style.exit,
							exitDone: style['exit-done']
						}}
					>
						<div ref={ref}>{info}</div>
					</CSSTransition>
				</div>
			</div>
		</>
	)
}

export { MoreInfo }
