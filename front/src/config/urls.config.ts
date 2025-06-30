class DASHBOARD {
	private profile = '/profile'

	PROFILE = this.profile

	TYPE = '/type'
	TYPE_RESULTS = '/type/results'

	LOGIN = '/auth/login'
	REGISTER = '/auth/register'

	LEADERBOARD = '/leaderboard'
	ABOUT = '/about'
	SETTINGS = '/settings'
}

export const URLS = new DASHBOARD()

export const AUTH_URLS = ['/profile', '/type/results']
