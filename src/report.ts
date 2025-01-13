import { state } from '@/state'
import { format } from 'date-fns'

export const report = () => {
	const { records, rate, fee } = state

	const {
		depositFiatEntries,
		depositSpotEntries,
		tableFiatRows,
		tableSpotRows,
		totalDepositFiat,
		totalWithdrawFiat,
		totalDepositSpot,
		totalWithdrawSpot,
		withdrawFiatEntries,
		withdrawSpotEntries,
		removeEntriesFiat,
		removeEntriesSpot,
		removedRowsFiat,
		removedRowsSpot,
	} = records.reduce<{
		tableFiatRows: string[]
		tableSpotRows: string[]
		depositFiatEntries: number
		depositSpotEntries: number
		withdrawFiatEntries: number
		withdrawSpotEntries: number
		removeEntriesFiat: number
		removeEntriesSpot: number
		totalDepositFiat: number
		totalWithdrawFiat: number
		totalDepositSpot: number
		totalWithdrawSpot: number
		removedRowsFiat: string[]
		removedRowsSpot: string[]
	}>(
		(
			{
				depositFiatEntries,
				depositSpotEntries,
				tableFiatRows,
				tableSpotRows,
				totalDepositFiat,
				totalWithdrawFiat,
				totalDepositSpot,
				totalWithdrawSpot,
				withdrawFiatEntries,
				withdrawSpotEntries,
				removeEntriesFiat,
				removeEntriesSpot,
				removedRowsFiat,
				removedRowsSpot,
			},
			{ fee, date, rate, value, status, condition },
			i
		) => {
			const signFiat = status === 'depositedFiat' ? '+' : '-'

			const signSpot = status === 'depositedSpot' ? '+' : '-'

			const fee_ = fee / 100

			const rowFiat = `${i + 1} | ${format(date, 'PPpp')} | ${signFiat}${value} | ${rate} | ${fee} | ${signFiat}${(
				(value / rate) *
				(1 - fee_)
			).toFixed(2)}`

			const rowSpot = `${i + 1} | ${format(date, 'PPpp')} | ${signSpot}${value} | ${rate} | ${fee} | ${signSpot}${(
				(value / rate) *
				(1 - fee_)
			).toFixed(2)}`

			return {
				totalWithdrawFiat:
					totalWithdrawFiat +
					(status === 'withdrawnFiat' && condition === 'normal'
						? value * (1 - fee_)
						: 0),
				totalWithdrawSpot:
					totalWithdrawSpot +
					(status === 'withdrawnSpot' && condition === 'normal'
						? value * (1 - fee_)
						: 0),
				totalDepositFiat:
					totalDepositFiat +
					(status === 'depositedFiat' && condition === 'normal'
						? value * (1 - fee_)
						: 0),

				totalDepositSpot:
					totalDepositSpot +
					(status === 'depositedSpot' && condition === 'normal'
						? value * (1 - fee_)
						: 0),
				depositFiatEntries:
					depositFiatEntries + (status === 'depositedFiat' ? 1 : 0),
				depositSpotEntries:
					depositSpotEntries + (status === 'depositedSpot' ? 1 : 0),
				withdrawFiatEntries:
					withdrawFiatEntries + (status === 'withdrawnFiat' ? 1 : 0),
				withdrawSpotEntries:
					withdrawSpotEntries + (status === 'withdrawnSpot' ? 1 : 0),
				removeEntriesFiat: removeEntriesFiat + (condition === 'remove' ? 1 : 0),
				removeEntriesSpot:
					removeEntriesSpot + (condition === 'removeSpot' ? 1 : 0),
				tableFiatRows: [
					...tableFiatRows,
					...(condition === 'normal' &&
					(status === 'depositedFiat' || status === 'withdrawnFiat')
						? [rowFiat]
						: []),
				],
				tableSpotRows: [
					...tableSpotRows,
					...(condition === 'normal' &&
					(status === 'depositedSpot' || status === 'withdrawnSpot')
						? [rowSpot]
						: []),
				],
				removedRowsFiat: [
					...removedRowsFiat,
					...(condition === 'remove' ? [rowFiat] : []),
				],
				removedRowsSpot: [
					...removedRowsSpot,
					...(condition === 'removeSpot' ? [rowSpot] : []),
				],
			}
		},
		{
			tableFiatRows: [],
			tableSpotRows: [],
			depositFiatEntries: 0,
			depositSpotEntries: 0,
			withdrawFiatEntries: 0,
			withdrawSpotEntries: 0,
			removeEntriesFiat: 0,
			removeEntriesSpot: 0,
			totalDepositFiat: 0,
			totalWithdrawFiat: 0,
			totalDepositSpot: 0,
			totalWithdrawSpot: 0,
			removedRowsFiat: [],
			removedRowsSpot: [],
		}
	)
	const balanceFiat = totalDepositFiat - totalWithdrawFiat
	const balanceSpot = totalDepositSpot - totalWithdrawSpot
	const tableFiatHeader = `
ID | 时间 | 数额(RM) | 兑换率 | 手续费 | 数额(USDT)
---|------|----------|--------|--------|------------
${tableFiatRows.join('\n')}
`

	const tableSpotHeader = `
ID | 时间 | 数额(RM) | 兑换率 | 手续费 | 数额(USDT)
---|------|----------|--------|--------|------------
${tableSpotRows.join('\n')}
`

	const removedFiatHeader = `
  ID | 时间 | 数额(RM) | 兑换率 | 手续费 | 数额(USDT)
  ---|------|----------|--------|--------|------------
  ${removedRowsFiat.join('\n')}
`

	const removedSpotHeader = `
ID | 时间 | 数额(RM) | 兑换率 | 手续费 | 数额(USDT)
---|------|----------|--------|--------|------------
${removedRowsSpot.join('\n')}
`

	return `
记账管理机器人:
入款(${depositFiatEntries}笔):
取款(${withdrawFiatEntries}笔):
${tableFiatHeader}

法币转换(${depositSpotEntries}笔):
法币取款(${withdrawSpotEntries}笔):
${tableSpotHeader}

移除 Fiat 记录(${removeEntriesFiat}笔):
${removedFiatHeader}

移除 Spot 记录(${removeEntriesSpot}笔):
${removedSpotHeader}

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
