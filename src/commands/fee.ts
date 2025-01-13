import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandFee = async ({
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
		state.fee = value_
		await sendMessage({
			idChat,
			idReplyTo,
			message: `手续费设置成功！当前手续费: ${value}%`,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `格式错误，正确格式为 fee:number 
            手续费设置不成功！当前手续费: ${state.fee}%`,
		})
	}
}
