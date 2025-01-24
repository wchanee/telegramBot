import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandIssue = async ({
	idChat,
	idReplyTo,
	value,
}: {
	value: string | undefined
	idChat: number
	idReplyTo: number
}) => {
	if (
		coerce
			.number()
			.min(0)
			.max(
				Object.values(state.recordsFiat).reduce(
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
			status: 'deposited',
			date: new Date(),
			condition: 'normal',
		}
		await sendMessage({
			idChat,
			idReplyTo,
			message: `✔️ 下发成功！`,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 [下发number, 例:下发100]。`,
		})
	}
}
