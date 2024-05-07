import type { State } from '~/stores/general/typesStore'

const getters = {
	doubleCount: (state: State): number => state.count * 2
}

export default getters
