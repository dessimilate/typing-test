import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IActions {
	phrase: string
	updatePhrase: (phrase: string) => void
}

export const usePhraseStore = create<IActions>()(
	persist(
		(set, get) => ({
			phrase: get()?.phrase || '',
			updatePhrase: phrase => set({ phrase })
		}),
		{ name: 'phrase' }
	)
)
