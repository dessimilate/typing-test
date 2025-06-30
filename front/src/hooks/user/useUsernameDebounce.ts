'use client'

import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { UseFormWatch } from 'react-hook-form'

import { useIsUsernameUnique } from './useIsUsernameUnique'

interface IUseUserDebounceProps {
	watch: UseFormWatch<{ name: string }>
}

export const useUsernameDebounce = ({ watch }: IUseUserDebounceProps) => {
	const { mutate } = useIsUsernameUnique()

	const debouncedIsUsernameUnique = useCallback(
		debounce((name: string) => {
			if (name) mutate(name)
		}, 600),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(data => {
			debouncedIsUsernameUnique(data.name || '')
		})

		return () => {
			unsubscribe()
		}
	}, [watch(), debouncedIsUsernameUnique])
}
