import { NextRequest, NextResponse } from 'next/server'

import { AUTH_URLS, URLS } from '@/config/urls.config'

import { EnumTokens } from './types/auth.type'

const middleware = async (req: NextRequest, res: NextResponse) => {
	const {
		url,
		cookies,
		nextUrl: { pathname }
	} = req

	if (pathname === '/') {
		return NextResponse.redirect(new URL(URLS.TYPE, url))
	}

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	if (/^\/auth/gi.test(pathname)) {
		if (refreshToken) {
			return NextResponse.redirect(new URL(URLS.PROFILE, url))
		}

		return NextResponse.next()
	} else if (!refreshToken && AUTH_URLS.some(url => pathname.startsWith(url))) {
		return NextResponse.redirect(new URL(URLS.LOGIN, url))
	}

	return
}

export default middleware

export const config = {
	matcher: ['/:path*']
}
