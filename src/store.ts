import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
export interface State {
	stats: {
		downloads: string
		stars: string
		contributors: string
		forks: string
	},
	source: {
		id: string
		repo: string
	}
}
export const key: InjectionKey<Store<State>> = Symbol('docs')
export const store = createStore<State>({
	state: {
		stats: {
			downloads: 'loading',
			stars: 'loading',
			contributors: 'loading',
			forks: 'loading'
		},
		source: {
			id: 'main',
			repo: 'viscoin/viscoin'
		}
	},
	mutations: {
		setStats(state, { stats }: { stats: { downloads: string, stars: string, contributors: string, forks: string } }) {
			state.stats = stats
		}
	},
	actions: {
		fetchStats: async ({ commit }) => {
			let downloads = 0,
			stars = 0,
			contributors = 0,
			forks = 0
			const toJSON = (res: Response) => res.json()
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			const noop = () => {}
			const [ fetchedDownloads, fetchedStats, fetchedContributors ] = await Promise.all([
				fetch('https://api.npmjs.org/downloads/range/2013-08-21:2100-08-21/viscoin').then(toJSON, noop),
				fetch('https://api.github.com/repos/viscoin/viscoin').then(toJSON, noop),
				fetch('https://api.github.com/repos/viscoin/viscoin/stats/contributors').then(toJSON, noop),
			])
			if (fetchedDownloads) {
				downloads = 0
				for (const item of fetchedDownloads.downloads) {
					downloads += item.downloads
				}
			}
			if (fetchedStats) {
				stars = fetchedStats.stargazers_count
				forks = fetchedStats.forks_count
			}
			if (fetchedContributors) {
				contributors = fetchedContributors.length
			}
			commit({
				type: 'setStats',
				stats: {
					downloads,
					stars,
					contributors,
					forks
				}
			})
		}
	}
})
export function useStore() {
	return baseUseStore(key)
}