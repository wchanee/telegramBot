import { state } from '@/state'
import { format } from 'date-fns'

const cal = (
	records: {
		date: Date
		fee: number
		rate: number
		value: number
		status: 'deposited' | 'withdrawn'
		condition: 'remove' | 'normal'
	}[]
) => {
	return records.reduce<{
		tableRows: string[]
		depositEntries: number
		withdrawEntries: number
		removeEntries: number
		totalDeposit: number
		totalWithdraw: number
		removedRows: string[]
	}>(
		(
			{
				depositEntries: depositFiatEntries,
				tableRows: tableFiatRows,
				totalDeposit: totalDepositFiat,
				totalWithdraw: totalWithdrawFiat,
				withdrawEntries: withdrawFiatEntries,
				removeEntries: removeEntriesFiat,
				removedRows: removedRowsFiat,
			},
			{ fee, date, rate, value, status, condition },
			i
		) => {
			const sign = status === 'deposited' ? '+' : '-'

			const fee_ = fee / 100

			const row = `${i + 1}, ${format(date, 'PPpp')}, ${sign}${value} / ${rate} (${fee}%) = ${sign}${(
				(value / rate) *
				(1 - fee_)
			).toFixed(2)}`

			return {
				totalWithdraw:
					totalWithdrawFiat +
					(status === 'withdrawn' && condition === 'normal'
						? value * (1 - fee_)
						: 0),
				totalDeposit:
					totalDepositFiat +
					(status === 'deposited' && condition === 'normal'
						? value * (1 - fee_)
						: 0),

				depositEntries: depositFiatEntries + (status === 'deposited' ? 1 : 0),
				withdrawEntries: withdrawFiatEntries + (status === 'withdrawn' ? 1 : 0),
				removeEntries: removeEntriesFiat + (condition === 'remove' ? 1 : 0),
				tableRows: [
					...tableFiatRows,
					...(condition === 'normal' &&
					(status === 'deposited' || status === 'withdrawn')
						? [row]
						: []),
				],

				removedRows: [
					...removedRowsFiat,
					...(condition === 'remove' ? [row] : []),
				],
			}
		},
		{
			tableRows: [],
			depositEntries: 0,
			withdrawEntries: 0,
			removeEntries: 0,
			totalDeposit: 0,
			totalWithdraw: 0,
			removedRows: [],
		}
	)
}

export const report = () => {
	const { recordsFiat, recordsSpot, rate, fee } = state

	const {
		depositEntries: depositEntriesFiat,
		removeEntries: removeEntriesFiat,
		removedRows: removedRowsFiat,
		totalDeposit: totalDepositFiat,
		tableRows: tableRowsFiat,
		totalWithdraw: totalWithdrawFiat,
		withdrawEntries: withdrawEntriesFiat,
	} = cal(Object.values(recordsFiat))

	const {
		depositEntries: depositEntriesSpot,
		removeEntries: removeEntriesSpot,
		removedRows: removedRowsSpot,
		totalDeposit: totalDepositSpot,
		tableRows: tableRowsSpot,
		totalWithdraw: totalWithdrawSpot,
		withdrawEntries: withdrawEntriesSpot,
	} = cal(Object.values(recordsSpot))

	const balanceFiat = totalDepositFiat - totalWithdrawFiat
	const balanceSpot = totalDepositSpot - totalWithdrawSpot
	const tableFiat = `
${tableRowsFiat.join('\n')}
`

	const tableSpot = `
${tableRowsSpot.join('\n')}
`

	const removedFiat = `
${removedRowsFiat.join('\n')}
`

	const removedSpot = `
${removedRowsSpot.join('\n')}
`

	return `
记账管理机器人:
入款(${depositEntriesFiat}笔):
取款(${withdrawEntriesFiat}笔):
${tableFiat}

法币转换(${depositEntriesSpot}笔):
法币取款(${withdrawEntriesSpot}笔):
${tableSpot}

移除 Fiat 记录(${removeEntriesFiat}笔):
${removedFiat}

移除 Spot 记录(${removeEntriesSpot}笔):
${removedSpot}

手续费：${fee}%
兑换率：${rate}

Fiat:
总入款: RM${totalDepositFiat.toFixed(2)} / USDT${(totalDepositFiat / rate).toFixed(2)}
总取款: RM${totalWithdrawFiat.toFixed(2)} / USDT${(totalWithdrawFiat / rate).toFixed(2)}
剩余: RM${balanceFiat.toFixed(2)} / USDT${(balanceFiat / rate).toFixed(2)}

Spot:
总转换: RM${totalDepositSpot.toFixed(2)} / USDT${(totalDepositSpot / rate).toFixed(2)}
总下发/取款: RM${totalWithdrawSpot.toFixed(2)} / USDT${(totalWithdrawSpot / rate).toFixed(2)}
剩余: RM${balanceSpot.toFixed(2)} / USDT${(balanceSpot / rate).toFixed(2)}
  `
}
