export interface CurrencyLog {
	currency: string
	date: string
}

export interface OrderBook {
	lastUpdateId: number
	bids: [string, string][]
	asks: [string, string][]
}
