import type { Store } from 'pinia'
import axios from 'axios'
import type { Actions, Getters, State } from '~/stores/general/typesStore'
import type { NAME_STORE } from '~/stores/general/constants'
import type { OrderBook } from '~/stores/general/interfaces'

const DOMAIN = 'https://api.binance.com'
const URL_PATH = `${DOMAIN}/api/v3/depth`

const actions: Actions = {
	increment(this: Store<typeof NAME_STORE, State, Getters, Actions>) {
		this.count++
	},
	selectCurrency(this: Store<typeof NAME_STORE, State, Getters, Actions>, currency: string): void {
		this.selectedCurrency = currency
	},
	updLogsCurrency(this: Store<typeof NAME_STORE, State, Getters, Actions>, { currency, date }: { currency: string, date: string }): void {
		this.logsCurrency.unshift({ currency, date })
	},
	closeStream(this: Store<typeof NAME_STORE, State, Getters, Actions>): void {
		this.socket?.close()
		this.socket = null
	},
	streamData(this: Store<typeof NAME_STORE, State, Getters, Actions>): void {
		this.socket = new WebSocket(`wss://stream.binance.com:9443/ws/${this.selectedCurrency.toLowerCase()}@depth`)
		this.socket.onmessage = (event) => {
			const eventData = JSON.parse(event.data)
			const { U, u, b, a } = eventData
			const firstUpdateIdEvent = U
			const finalUpdateIdEvent = u

			if (finalUpdateIdEvent <= this.lastUpdateId) return

			if (
				firstUpdateIdEvent > this.lastUpdateId + 1
				|| finalUpdateIdEvent < this.lastUpdateId + 1
			) {
				this.updLastUpdateId(finalUpdateIdEvent)
				return
			}

			this.updateValueCurrency({ bids: b, asks: a })
			this.updLastUpdateId(finalUpdateIdEvent)
		}
	},
	async updateCurrency(this: Store<typeof NAME_STORE, State, Getters, Actions>): Promise<void> {
		if (this.isLoading) return

		const url = `${URL_PATH}?symbol=${this.selectedCurrency}&limit=${this.selectedLimit}`
		this.isLoading = true
		try {
			const { data } = await axios.get<OrderBook>(url)
			if (!data) throw new Error('No data')
			const { bids, asks } = data

			this.updateValueCurrency({ bids, asks })

			this.updLastUpdateId(data.lastUpdateId)
		}
		catch (error) {
			console.error(error)
			throw new Error((error as { message: string })?.message || 'Error get data')
		}
		finally {
			this.isLoading = false
		}
	},
	updLastUpdateId(this: Store<typeof NAME_STORE, State, Getters, Actions>, lastUpdateId: number): void {
		this.lastUpdateId = lastUpdateId
	},
	updateValueCurrency(this: Store<typeof NAME_STORE, State, Getters, Actions>, { asks, bids }: { bids: [string, string][], asks: [string, string][] }): void {
		this.ordersBook[this.selectedCurrency] = { bids, asks }
	},
	selectLimit(this: Store<typeof NAME_STORE, State, Getters, Actions>, limit: string): void {
		this.selectedLimit = limit
	},
	clearLogs(this: Store<typeof NAME_STORE, State, Getters, Actions>): void {
		this.logsCurrency = []
	}
}

export default actions
