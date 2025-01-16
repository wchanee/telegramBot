import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandWithdrawSpot = async ({
	idChat,
	idReplyTo,
	value,
}: {
	value: string | undefined
	idChat: number
	idReplyTo: number
}) => {
	const value_ = Number(value)
	if (coerce.number().min(0).safeParse(value_).success) {
		state.records.push({
			value: value_,
			fee: state.fee,
			rate: state.rate,
			status: 'withdrawnSpot',
			date: new Date(),
			condition: 'normal',
		})
		await sendMessage({
			idChat,
			idReplyTo,
			message: `✔️ 下发成功！`,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 withdrawSpot[下发Spotnumber, 例:下发Spot100]。`,
		})
	}
}
