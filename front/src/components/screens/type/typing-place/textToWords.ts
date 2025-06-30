import { useEffect, useState } from 'react'

interface ILetter {
	letter: string
	type: 'correct' | 'wrong' | 'inactive'
}

export const textToWords = ({
	notPrintedText,
	printedText,
	wrongText
}: {
	notPrintedText: string
	printedText: string
	wrongText: string
}) => {
	const [words, setWords] = useState<ILetter[][]>([])
	const [firstInactive, setFirstInactive] = useState<[number, number]>([0, 0])

	useEffect(() => {
		const printedWords = printedText ? printedText.split(' ') : []
		const wrongWords = wrongText ? wrongText.split('_') : []
		const notPrintedWords = notPrintedText ? notPrintedText.split(' ') : []

		const arr: ILetter[][] = []

		printedWords.forEach((word, i) => {
			word = word.concat(printedWords.length - 1 === i ? '' : ' ')

			arr.push([...word].map(letter => ({ letter, type: 'correct' })))
		})

		wrongWords.forEach((word, i) => {
			word = word.concat(wrongWords.length - 1 === i ? '' : '_')

			if (i) {
				arr.push([...word].map(letter => ({ letter, type: 'wrong' })))
			} else {
				if (arr.length) {
					const lastWord = arr[arr.length - 1]

					arr[arr.length - 1] = lastWord.concat(
						[...word].map(letter => ({ letter, type: 'wrong' }))
					)
				} else {
					arr[0] = [...word].map(letter => ({
						letter,
						type: 'wrong'
					}))
				}
			}
		})

		notPrintedWords.forEach((word, i) => {
			word = word.concat(notPrintedWords.length - 1 === i ? '' : ' ')

			if (i) {
				arr.push([...word].map(letter => ({ letter, type: 'inactive' })))
			} else {
				if (arr.length) {
					const lastWord = arr[arr.length - 1]

					setFirstInactive([arr.length - 1, lastWord.length])

					arr[arr.length - 1] = lastWord.concat(
						[...word].map(letter => ({ letter, type: 'inactive' }))
					)
				} else {
					setFirstInactive([0, 0])

					arr[0] = [...word].map(letter => ({ letter, type: 'inactive' }))
				}
			}
		})

		if (arr.length)
			arr[arr.length - 1].push({
				letter: ' ',
				type: 'inactive'
			})

		setWords(arr)
	}, [notPrintedText])

	return { words, firstInactive }
}
