'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { URLS } from '@/config/urls.config'

import { usePhraseStore } from '@/store/phrase.store'
import { IUserConfig } from '@/store/user-config.store'

import { useCreateAttempt } from '@/hooks/attempt/useCreateAttempt'
import { usePhrase } from '@/hooks/usePhrase'

export const timeMode = ({ timeAmount, countMode }: IUserConfig) => {
	const [...searchParams] = useSearchParams()
	const { replace } = useRouter()

	const { phrase: persistPhrase, updatePhrase } = usePhraseStore()

	const { createAttempt } = useCreateAttempt()

	const { data, isSuccess, refetch, isRefetching } = usePhrase(100)

	const [phrase, setPhrase] = useState('')

	const [text, setText] = useState('')

	const [printedText, setPrintedText] = useState('')
	const [wrongText, setWrongText] = useState('')
	const [notPrintedText, setNotPrintedText] = useState('')

	const [isStart, setIsStart] = useState(false)
	const [isRepeat, setIsRepeat] = useState(false)

	//1 time = 10ms
	const [time, setTime] = useState((timeAmount || 15) * 100)

	const [interv, setInterv] = useState<NodeJS.Timeout>()

	const [words, setWords] = useState(0)
	const [errors, setErrors] = useState(0)

	//on letter delete
	const onKeydown = ({ code }: globalThis.KeyboardEvent) => {
		if (code === 'Backspace') {
			setText(text => text.slice(0, text.length - 1))
		}
	}

	const enter = (letter: string) => {
		setText(text => text + letter)
	}

	//on enter letter
	const onKeypressW = ({ key }: globalThis.KeyboardEvent) => {
		if (!isStart) {
			setIsStart(true)

			setText(text => text + key)
		} else {
			setText(text => text + key)
		}
	}

	//restart
	const restart = () => {
		setInterv(i => (clearInterval(i), undefined))
		setIsStart(false)
		setPrintedText('')
		setWrongText('')
		setNotPrintedText('')
		setText('')
		setTime((timeAmount || 15) * 100)
		setWords(0)
		setErrors(0)
		refetch()
	}

	useEffect(() => {
		const isR = searchParams.find(el => el[0] === 'isRepeat')
		setIsRepeat(isR !== undefined ? Boolean(isR[1]) : false)
	}, [searchParams])

	useEffect(() => {
		if (isStart) {
			setInterv(
				setInterval(() => {
					setTime(t => t - 1)
				}, 10)
			)
		}
	}, [isStart])

	//change printed, wrong and not printed text
	useEffect(() => {
		if (phrase) {
			let index
			for (const [i, letter] of [...text].entries()) {
				if (letter !== phrase[i]) {
					index = i
					setErrors(e => e + 1)
					break
				}
			}

			if (index === undefined) {
				setPrintedText(text)
				setWrongText('')
			} else {
				setPrintedText(text.slice(0, index))
				setWrongText(phrase.slice(index, text.length).replaceAll(' ', '_'))
			}

			setNotPrintedText(phrase.slice(text.length))
		}
	}, [text])

	//add event listeners
	useEffect(() => {
		if (data) {
			document.addEventListener('keypress', onKeypressW)
			document.addEventListener('keydown', onKeydown)

			if (!isRepeat) {
				setPhrase(data)
				setNotPrintedText(data)
			}
		}

		return () => {
			document.removeEventListener('keypress', onKeypressW)
			document.removeEventListener('keydown', onKeydown)
			clearInterval(interv)
		}
	}, [isSuccess, isRefetching])

	useEffect(() => {
		if (isRepeat && data && persistPhrase) {
			setPhrase(persistPhrase)
			setNotPrintedText(persistPhrase)
			replace(URLS.TYPE)
		}

		if (!isRepeat && data) updatePhrase(data)
	}, [data, persistPhrase])

	//end time
	useEffect(() => {
		setWords(printedText.split(' ').length - 1)

		if (time === 0 && phrase) {
			document.removeEventListener('keypress', onKeypressW)
			document.removeEventListener('keydown', onKeydown)

			clearInterval(interv)

			createAttempt({
				chars: printedText.length,
				mistakes: errors,
				time: (timeAmount || 15) * 1000,
				words: words,
				text: phrase
			})
		}
	}, [printedText, time, phrase])

	useEffect(() => {
		restart()
	}, [countMode])

	return {
		printedText,
		notPrintedText,
		wrongText,
		isStart,
		restart,
		info: (time / 100).toFixed()
	}
}
