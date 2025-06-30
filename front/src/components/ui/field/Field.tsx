import { type PropsWithChildren, forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

import { errorsMessage } from '@/components/screens/auth/errors-message'

import styles from './Field.module.scss'
import { cn } from '@/lib/utils'

export interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	error?: FieldError
}

const Field = forwardRef<HTMLInputElement, PropsWithChildren<IFieldProps>>(
	({ error, style, className, children, ...rest }, ref) => {
		const isServerError = error?.message
			? [
					errorsMessage.server.email.notFound,
					errorsMessage.server.email.alreadyExists,
					errorsMessage.server.password
				].includes(error.message)
			: null

		const classNameError = error?.message
			? { [styles.error]: isServerError, [styles.warning]: !isServerError }
			: {}

		return (
			<label
				className={cn({
					[styles.field]: true,
					[className || '']: className,
					...classNameError
				})}
				style={style}
			>
				<span className={cn(classNameError)}>{children}</span>

				<input
					className={cn(classNameError)}
					{...{ ref, ...rest }}
					readOnly
					onFocus={e => {
						e.target.removeAttribute('readonly')
					}}
				/>

				{error && <div className={cn(classNameError)}>{error.message}</div>}
			</label>
		)
	}
)

export { Field }
