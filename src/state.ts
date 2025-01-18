export const state = {
	recordsFiat: {} as {
		[k in string]: {
			date: Date
			fee: number
			rate: number
			value: number
			status: 'deposited' | 'withdrawn'
			condition: 'remove' | 'normal'
		}
	},
	recordsSpot: {} as {
		[k in string]: {
			date: Date
			fee: number
			rate: number
			value: number
			status: 'deposited' | 'withdrawn'
			condition: 'remove' | 'normal'
		}
	},
	rate: 4.45, // Exchange rate
	fee: 2, // Fee rate
	isActive: false,
}
