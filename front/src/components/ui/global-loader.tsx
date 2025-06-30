import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { NextComponentType } from '@/types/next-component.type'

import { Loader } from './loader/Loader'

const GlobalLoader: NextComponentType = () => {
	const [isPageLoading, setIsPageLoading] = useState(true)

	const isMutating = useIsMutating()
	const isFetching = useIsFetching()

	useEffect(() => {
		setIsPageLoading(false)
	}, [])

	if (!(isFetching || isMutating || isPageLoading)) return null

	return (
		<div className='fixed top-5 right-5 z-50 animate-fadeIn'>
			<Loader size={25} />
		</div>
	)
}

export { GlobalLoader }
