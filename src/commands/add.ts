import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandAdd = async ({
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
	if (coerce.number().min(0).safeParse(value).success) {
		const length = Object.keys(state.recordsFiat).length
		state.recordsFiat[length + 1] = {
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
			message: `✔️ 入款成功！`,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 [+number, 例:+100]。`,
			hideReport,
		})
	}
}
