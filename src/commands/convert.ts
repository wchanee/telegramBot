import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandConvert = async ({
	idChat,
	idReplyTo,
	value,
}: {
	value: string | undefined
	idChat: number
	idReplyTo: number
}) => {
	if (coerce.number().min(0).safeParse(value).success) {
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
			message: `✔️ 转换成功！`,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 convert[转换number, 例:转换100]。`,
		})
	}
}
