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
	const value_ = Number(value)
	if (coerce.number().min(0).safeParse(value_).success) {
		state.records.push({
			value: value_,
			fee: state.fee,
			rate: state.rate,
			status: 'depositedSpot',
			date: new Date(),
			condition: 'normal',
		})
		await sendMessage({ idChat, idReplyTo, message: '转换成功！' })
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `格式错误，正确格式为 convert:number`,
		})
	}
}
