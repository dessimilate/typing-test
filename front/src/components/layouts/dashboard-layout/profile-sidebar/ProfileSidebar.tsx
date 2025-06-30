import { useMutation } from '@tanstack/react-query'
import { Bell, BellRing, CircleUser, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Skeleton } from '@/components/ui/skeleton'

import { authService } from '@/services/auth.service'

import type { NextComponentType } from '@/types/next-component.type'

import { URLS } from '@/config/urls.config'

import { useProfile } from '@/hooks/user/useProfile'

import style from './ProfileSidebar.module.scss'

const ProfileSidebar: NextComponentType = () => {
	const { profile, isLoading } = useProfile()

	const { refresh } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => refresh()
	})

	return (
		<div className={style.sidebar}>
			<Bell />

			<Link href={URLS.PROFILE}>
				<div className={style.profile}>
					<CircleUser />
					<div className={isLoading ? '!m-0' : ''}>
						{profile ? (
							(profile.name || 'username').toLowerCase()
						) : (
							<Skeleton className='h-[20px] w-20 bg-inactive' />
						)}
					</div>
				</div>
			</Link>

			<LogOut onClick={() => mutate()} />
		</div>
	)
}

export { ProfileSidebar }
