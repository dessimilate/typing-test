'use client'

import { RotateCw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import type { NextComponentType } from '@/types/next-component.type'

import { useUserConfigStore } from '@/store/user-config.store'

import style from './TypingPlace.module.scss'
import { timeMode } from './modes/time-mode'
import { wordsMode } from './modes/words-mode'
import { textToWords } from './textToWords'
import { cn } from '@/lib/utils'

interface ICaretProps {
	top: number
	left: number
	font: string
}

const TypingPlace: NextComponentType = () => {
	//ref for positioning caret
	const parentRef = useRef<HTMLDivElement>(null)
	const childRef = useRef<HTMLDivElement>(null)
	const wordRef = useRef<HTMLPreElement>(null)

	//caret position state
	const [caretProps, setCaretProps] = useState<ICaretProps>({
		font: '',
		left: 0,
		top: 0
	})

	//states
	const [isLoaded, setIsLoaded] = useState(false)

	//user config
	const { userConfig } = useUserConfigStore()

	useEffect(() => {
		setIsLoaded(true)
	}, [userConfig])

	//different functions for every modes
	const { isStart, notPrintedText, printedText, wrongText, restart, info } =
		userConfig.countMode === 'time'
			? timeMode(userConfig)
			: wordsMode(userConfig)

	//text to words array
	const { words, firstInactive } = textToWords({
		notPrintedText,
		printedText,
		wrongText
	})

	//change position state on text change
	useEffect(() => {
		if (parentRef.current && wordRef.current && childRef.current) {
			const parentRect = parentRef.current.getBoundingClientRect()
			const childRect = childRef.current.getBoundingClientRect()

			const font = window
				.getComputedStyle(parentRef.current)
				.getPropertyValue('font-size')

			const top = childRect.top - parentRect.top
			const left = childRect.left - parentRect.left

			const wordHeight = +window
				.getComputedStyle(wordRef.current)
				.getPropertyValue('height')
				.replace('px', '')

			//set cater props
			setCaretProps({ top, left, font })

			//set div with words height
			parentRef.current.style.maxHeight = `${wordHeight * 3}px`

			// if (top > wordHeight) {
			// 	const wordsMargin = +window
			// 		.getComputedStyle(wordRef.current)
			// 		.getPropertyValue('margin-top')
			// 		.replace('px', '')

			// 	parentRef.current.style.marginTop = `${wordsMargin - wordHeight}px`
			// }
		}
	}, [notPrintedText, printedText, wrongText, words])

	//FIXME: ctrl+z = error

	console.log(isStart)

	return (
		<div className={style['typing-place']}>
			<div>
				<div className={cn(style.counter, { [style.active]: isStart })}>
					{info}
				</div>

				<div className={style['words-wrapper']}>
					<div
						className={style.words}
						ref={parentRef}
					>
						{words.map((word, i) => (
							<pre
								className={style.word}
								key={`word-${i}`}
								ref={wordRef}
							>
								{word.map((letter, j) => (
									<span
										className={style[letter.type]}
										key={`letter-${i}-${j}`}
										ref={
											i === firstInactive[0] && j === firstInactive[1]
												? childRef
												: null
										}
									>
										{letter.letter}
									</span>
								))}
							</pre>
						))}

						<div
							className={style.caret}
							style={{
								left: caretProps.left,
								height: caretProps.font,
								transform: `translateY(${caretProps.top}px)`
							}}
						/>
					</div>
				</div>
			</div>
			<RotateCw onClick={() => restart()} />
		</div>
	)
}

export { TypingPlace }
