import { LoaderCircle } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import type { NextComponentType } from '@/types/next-component.type'

import style from './Loader.module.scss'

interface ILoaderProps {
	size?: number
}

interface ILoadingComponentProps extends PropsWithChildren {
	isLoading?: boolean
}

const Loader: NextComponentType<ILoaderProps> = ({ size }) => {
	return (
		<LoaderCircle
			className={style.loader}
			size={size || 20}
		/>
	)
}

const LoadingComponent: NextComponentType<ILoadingComponentProps> = ({
	isLoading = true,
	children
}) => {
	return (
		<div className={style['loading-component']}>
			{isLoading ? <Loader /> : children}
		</div>
	)
}

export { Loader, LoadingComponent }
