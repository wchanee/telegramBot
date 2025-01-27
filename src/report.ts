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
	}[],
	useIssueRow: boolean
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

			const issueRow = `${format(date, 'PPpp')}, ${(
				(value / rate) *
				(1 - fee_)
			).toFixed(2)}U`

			return {
				totalDeposit:
					totalDepositFiat +
					(status === 'deposited' && condition === 'normal'
						? value * (1 - fee_)
						: 0),
				totalWithdraw:
					totalWithdrawFiat +
					(status === 'withdrawn' && condition === 'normal'
						? value * (1 - fee_)
						: 0),

				depositEntries: depositFiatEntries + (status === 'deposited' ? 1 : 0),
				withdrawEntries: withdrawFiatEntries + (status === 'withdrawn' ? 1 : 0),
				removeEntries: removeEntriesFiat + (condition === 'remove' ? 1 : 0),
				tableRows: [
					...tableFiatRows,
					...(condition === 'normal' &&
					(status === 'deposited' || status === 'withdrawn')
						? [useIssueRow ? issueRow : row]
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
	} = cal(Object.values(recordsFiat), false)

	const {
		depositEntries: depositEntriesSpot,
		removeEntries: removeEntriesSpot,
		removedRows: removedRowsSpot,
		totalDeposit: totalDepositSpot,
		tableRows: tableRowsSpot,
		totalWithdraw: totalWithdrawSpot,
		withdrawEntries: withdrawEntriesSpot,
	} = cal(Object.values(recordsSpot), true)

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
移除记录(${removeEntriesFiat}笔):
${removedFiat}
下发(${depositEntriesSpot}笔):
${tableSpot}

入款费率：${fee}%
固定汇率：${rate}

总入款: ${(totalDepositFiat / rate).toFixed(2)} (USDT)
总取款: ${(totalWithdrawFiat / rate).toFixed(2)} (USDT)
已下发: ${(totalDepositSpot / rate).toFixed(2)} (USDT)

总剩余(不扣除下发): ${(balanceFiat / rate).toFixed(2)} (USDT)
总剩余(已扣除下发): ${(totalDepositSpot / rate).toFixed(2)} (USDT)
  `
}
