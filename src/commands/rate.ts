import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandRate = async ({
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
	const value_ = Number(value)
	if (coerce.number().min(0).safeParse(value_).success) {
		state.rate = value_
		await sendMessage({
			idChat,
			idReplyTo,
			message: `✔️ 汇率设置成功！当前汇率: ${value}`,
			hideReport,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `
			❌ 格式错误，正确格式为 [设置汇率number, 例:设置汇率4.45], 汇率设置不成功！当前汇率: ${state.rate}`,
			hideReport,
		})
	}
}
