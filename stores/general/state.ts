import type { State } from '~/stores/general/typesStore'

const state = (): State => ({
	name: 'Eduardo',
	count: 0,
	selectedCurrency: 'BTCUSDT',
	logsCurrency: [],
	socket: null,
	ordersBook: {
		'BTCUSDT': { bids: [], asks: [] },
		'BNBBTC': { bids: [], asks: [] },
		'ETHBTC': { bids: [], asks: [] }
	},
	isLoading: false,
	lastUpdateId: 0,
	selectedLimit: '100'
})

export default state
