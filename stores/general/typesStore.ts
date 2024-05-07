import type {CurrencyLog, OrderBook} from '~/stores/general/interfaces'

export interface State {
	count: number
	name: string
	selectedCurrency: string
	socket: WebSocket | null
	logsCurrency: CurrencyLog[]
	ordersBook: Record<string, {
		bids: [price: string, amount: string][]
		asks: [price: string, amount: string][]
	}>
	isLoading: boolean
	lastUpdateId: number,
	selectedLimit: string
}

export interface Getters {
	doubleCount: (state: State) => number
}

export interface Actions {
	increment: () => void
	selectCurrency: (currency: string) => void
	updLogsCurrency: ({currency, date}: {currency: string, date: string}) => void
	streamData: () => void
	closeStream: () => void,
	updateCurrency: () => Promise<void>
	updateValueCurrency: ({asks, bids}: {bids: [string, string][]; asks: [string, string][]}) => void
	selectLimit: (limit: string) => void
	clearLogs: () => void
	updLastUpdateId: (lastUpdateId: number) => void
}
