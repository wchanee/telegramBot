import { state } from '@/state'
import { format } from 'date-fns'

export const report = () => {
	const { records, rate, fee } = state

	const {
		depositEntries,
		tableRows,
		totalDeposit,
		totalWithdraw,
		withdrawEntries,
		removeEntries,
		removedRows,
	} = records.reduce<{
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
				depositEntries,
				tableRows,
				totalDeposit,
				totalWithdraw,
				withdrawEntries,
				removeEntries,
				removedRows,
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
					totalWithdraw +
					(status === 'withdrawn' && condition === 'normal'
						? value * (1 - fee_)
						: 0),
				totalDeposit:
					totalDeposit +
					(status === 'deposited' && condition === 'normal'
						? value * (1 - fee_)
						: 0),
				depositEntries: depositEntries + (status === 'deposited' ? 1 : 0),
				withdrawEntries: withdrawEntries + (status === 'withdrawn' ? 1 : 0),
				removeEntries: removeEntries + (condition === 'remove' ? 1 : 0),
				tableRows: [...tableRows, ...(condition === 'normal' ? [row] : [])],
				removedRows: [...removedRows, ...(condition === 'remove' ? [row] : [])],
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
	const balance = totalDeposit - totalWithdraw
	const tableHeader = `
${tableRows.join('\n')}
`
	const removedHeader = `
${removedRows.join('\n')}
`

	return `
记账管理机器人:
入款(${depositEntries}笔):
取款(${withdrawEntries}笔):
${tableHeader}

移除记录(${removeEntries}笔):
${removedHeader}

总入款: ${(totalDeposit / rate).toFixed(2)} (USDT)
入款费率：${fee}%
固定汇率：${rate}

应下发/入款: ${(totalDeposit / rate).toFixed(2)} (USDT)
已下发/取款: ${(totalWithdraw / rate).toFixed(2)} (USDT)
未下发/剩余: ${(balance / rate).toFixed(2)} (USDT)
  `
}
