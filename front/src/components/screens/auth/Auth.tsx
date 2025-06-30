'use client'

import { useMutation } from '@tanstack/react-query'
import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field/Field'
import { LoadingComponent } from '@/components/ui/loader/Loader'

import { authService } from '@/services/auth.service'

import type { NextComponentType } from '@/types/next-component.type'
import type { IAuthForm } from '@/types/user.type'

import { URLS } from '@/config/urls.config'

import { MailCheckRegExp } from '@/utils/mail-check'

import { errorCatch } from '@/api/error-catch'

import style from './Auth.module.scss'
import { errorsMessage } from './errors-message'

interface IAuthProps {
	type: 'Login' | 'Register'
}

const Auth: NextComponentType<IAuthProps> = ({ type }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthForm>({
		delayError: 1000,
		mode: 'onChange'
	})

	const { push, refresh } = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(type === 'Login' ? 'login' : 'register', data),
		onSuccess() {
			reset()
			refresh()
		},
		onError(e) {
			const message: string = errorCatch(e)
			if (
				[
					errorsMessage.server.email.notFound,
					errorsMessage.server.email.alreadyExists
				].includes(message)
			) {
				errors.email = {
					type: 'required',
					message
				}
			} else {
				errors.password = {
					type: 'required',
					message
				}
			}
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className={style.main}>
			<h1>
				{type === 'Login' ? 'Login to your account' : 'Create an account'}
			</h1>

			<form
				className={style.form}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Field
					disabled={isPending}
					placeholder='email'
					type='email'
					className={style.field}
					{...register('email', {
						required: errorsMessage.email.required,
						pattern: {
							value: MailCheckRegExp,
							message: errorsMessage.email.incorrect
						}
					})}
					error={errors.email}
				>
					<Mail size={16} />
				</Field>

				<Field
					disabled={isPending}
					placeholder='password'
					type='password'
					className={style.field}
					{...register('password', {
						required: errorsMessage.password.required,
						minLength: {
							value: 6,
							message: errorsMessage.password.incorrect
						}
					})}
					error={errors.password}
				>
					<Lock size={16} />
				</Field>

				<div className={style.buttons}>
					<Button
						className={style['submit-button']}
						disabled={isPending}
					>
						<LoadingComponent isLoading={isPending}>{type}</LoadingComponent>
					</Button>
					<Button
						className={style['link-button']}
						variant={'link'}
						disabled={isPending}
					>
						<Link href={`/auth/${type === 'Login' ? 'register' : 'login'}`}>
							{type === 'Login'
								? "Don't have an account?"
								: 'Already have an account'}
						</Link>
					</Button>
				</div>
			</form>
		</div>
	)
}

export { Auth }
