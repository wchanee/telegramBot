export const state = {
	records: [] as {
		date: Date
		fee: number
		rate: number
		value: number
		status: 'deposited' | 'withdrawn' | 'withdrawnissue'
		condition: 'remove' | 'normal'
	}[],
	rate: 4.45, // Exchange rate
	fee: 2, // Fee rate
	isActive: false,
}
