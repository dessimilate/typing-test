import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { countMode, phraseMode } from '@/types/user-config.type'

export interface IUserConfig {
	countMode?: countMode
	phraseMode: phraseMode[]
	wordsAmount?: number
	timeAmount?: number
}

export type UserUpdateConfig = (config: Partial<IUserConfig>) => void

export interface IActions {
	userConfig: IUserConfig
	updateConfig: UserUpdateConfig
}

export const useUserConfigStore = create<IActions>()(
	persist(
		(set, get) => ({
			userConfig: {
				countMode: get()?.userConfig.countMode || 'words',
				phraseMode: get()?.userConfig.phraseMode || [],
				wordsAmount: get()?.userConfig.wordsAmount || 10,
				timeAmount: get()?.userConfig.timeAmount || 15
			},
			updateConfig: config =>
				set({ userConfig: { ...get().userConfig, ...config } })
		}),
		{ name: 'user-config' }
	)
)
