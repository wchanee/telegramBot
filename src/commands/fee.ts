import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandFee = async ({
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
		state.fee = value_
		await sendMessage({
			idChat,
			idReplyTo,
			message: `✔️ 费率设置成功！当前费率: ${value}%`,
			hideReport,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `
			❌ 格式错误，正确格式为 [设置费率number, 例:设置费率1], 费率设置不成功！当前费率: ${state.fee}%`,
			hideReport,
		})
	}
}
