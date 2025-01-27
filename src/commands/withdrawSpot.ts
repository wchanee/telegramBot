import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandWithdrawSpot = async ({
	idChat,
	idReplyTo,
	value,
	hideReport = true,
}: {
	value: string | undefined
	idChat: number
	idReplyTo: number
	hideReport?: boolean
}) => {
	if (
		coerce
			.number()
			.min(0)
			.max(
				Object.values(state.recordsSpot).reduce(
					(acc, { value, status, condition }) => {
						return (
							acc +
							(status === 'deposited' && condition === 'normal' ? value : 0)
						)
					},
					0
				)
			)
			.safeParse(value).success
	) {
		const length = Object.keys(state.recordsSpot).length
		state.recordsSpot[length + 1] = {
			value: Number(value),
			fee: state.fee,
			rate: state.rate,
			status: 'withdrawn',
			date: new Date(),
			condition: 'normal',
		}
		await sendMessage({
			idChat,
			idReplyTo,
			message: `✔️ 取款成功！`,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 withdrawSpot[-number, 例:-100]。`,
			hideReport,
		})
	}
}
