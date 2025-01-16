import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandRemoveSpot = async ({
	idChat,
	idReplyTo,
	value,
}: {
	value: string | undefined
	idChat: number
	idReplyTo: number
}) => {
	const value_ = Number(value)
	if (
		coerce.number().min(0).int().max(state.records.length).safeParse(value_)
			.success
	) {
		const record = state.records[value_ - 1]
		if (record) {
			record.condition = 'removeSpot'
			await sendMessage({
				idChat,
				idReplyTo,
				message: `✔️ 移除Spot记录成功!`,
			})
		}
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 removeSpot[移除Spotid, 例:移除Spot1],
			并且id不可大于记录数量。`,
		})
	}
}
