import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandRate = async ({
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
		state.rate = value_
		await sendMessage({
			idChat,
			idReplyTo,
			message: `汇率设置成功！当前汇率: ${value}`,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `格式错误，正确格式为 rate:number 
            汇率设置不成功！当前汇率: ${state.rate}`,
		})
	}
}
