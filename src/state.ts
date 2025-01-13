export const state = {
	records: [] as {
		date: Date
		fee: number
		rate: number
		value: number
		status:
			| 'depositedFiat'
			| 'depositedSpot'
			| 'withdrawnFiat'
			| 'withdrawnSpot'
		condition: 'remove' | 'removeSpot' | 'normal'
	}[],
	rate: 4.45, // Exchange rate
	fee: 2, // Fee rate
	isActive: false,
}
