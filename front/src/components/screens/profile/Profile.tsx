'use client'

import { useMutationState } from '@tanstack/react-query'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Check, CircleUserRound, PencilLine, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { DynamicField } from '@/components/ui/dynamic-field/DynamicField'
import { Field } from '@/components/ui/field/Field'
import { Skeleton } from '@/components/ui/skeleton'

import type { NextComponentType } from '@/types/next-component.type'

import { useProfile } from '@/hooks/user/useProfile'
import { useUserUpdate } from '@/hooks/user/useUserUpdate'
import { useUsernameDebounce } from '@/hooks/user/useUsernameDebounce'

import style from './Profile.module.scss'
import { cn } from '@/lib/utils'

const Profile: NextComponentType = () => {
	const [isUniqueData] = useMutationState({
		filters: { mutationKey: ['is', 'username', 'unique'] }
	})

	const {
		register,
		handleSubmit,
		reset,
		setError,
		control,
		watch,
		formState: { errors }
	} = useForm<{ name: string }>({
		delayError: 1000,
		mode: 'onChange'
	})

	useEffect(() => {
		if (isUniqueData?.data !== undefined) {
			if (!isUniqueData?.data) {
				setError('name', {
					type: 'value',
					message: 'username is already exists'
				})
			}
		}
	}, [isUniqueData])

	const { mutate, isPending } = useUserUpdate()

	useUsernameDebounce({ watch })

	const { profile, isLoading } = useProfile()

	const [isUsernameChanging, setIsUsernameChanging] = useState(false)

	const onSubmit: SubmitHandler<{ name: string }> = data => {
		setIsUsernameChanging(false)
		mutate(data)
	}

	return (
		<div className={style.profile}>
			<div className={style.user}>
				<div className={style.userinfo}>
					<motion.div
						key={`${isUsernameChanging}`}
						initial={{ opacity: 0.3, y: 0, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 0 }}
						transition={{ duration: 0.15 }}
					>
						{isLoading ? (
							<>
								<Skeleton className={style['username-skeleton']} />
								<Skeleton className={style['create-date-skeleton']} />
							</>
						) : (
							<>
								<span className={style.username}>
									<form onSubmit={handleSubmit(onSubmit)}>
										<DynamicField
											isFirstChild={!isUsernameChanging}
											secondChild={
												<Controller
													control={control}
													name='name'
													render={({ field: { onChange } }) => (
														<Field
															className={style['username-field']}
															disabled={isPending}
															placeholder='username'
															type='text'
															{...register('name')}
															error={errors.name}
															onChange={onChange}
															autoFocus={true}
														>
															<CircleUserRound />
														</Field>
													)}
												/>
											}
										>
											{profile?.name}
										</DynamicField>

										{isUsernameChanging && (
											<button disabled={isPending}>
												<Check />
											</button>
										)}
									</form>
									{isUsernameChanging ? (
										<X onClick={() => setIsUsernameChanging(el => !el)} />
									) : (
										<PencilLine
											onClick={() => setIsUsernameChanging(el => !el)}
										/>
									)}
								</span>
								<span
									className={cn(style['create-date'], {
										'opacity-0': isUniqueData?.data === false
									})}
								>
									Joined {format(profile?.createdAt || new Date(), 'dd LLLL y')}
								</span>
							</>
						)}
					</motion.div>
				</div>

				<div className={style['user-stats']}>
					<div className={style.stat}>
						<span>tests completed</span>
						<div>{profile?.userStatistics.trainings || 0}</div>
					</div>

					<div className={style.stat}>
						<span>best wpm</span>
						<div>{profile?.userStatistics.bestWPM || 0}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Profile }
