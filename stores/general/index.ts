import actions from '~/stores/general/actions'
import getters from '~/stores/general/getters'
import { NAME_STORE } from '~/stores/general/constants'
import state from '~/stores/general/state'

const useGeneralStore = defineStore(NAME_STORE, {
	state,
	getters,
	actions,
	persist: {
		paths: ['selectedCurrency', 'logsCurrency']
	}
})

export default useGeneralStore
