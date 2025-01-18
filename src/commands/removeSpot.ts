import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandRemoveSpot = async ({
	idChat,
	idReplyTo,
	// id: value,
	value,
}: {
	// id: string | undefined
	value: string | undefined
	idChat: number
	idReplyTo: number
}) => {
	if (value && state.recordsSpot[value]) {
		const record = state.recordsSpot[value]
		if (record) {
			record.condition = 'remove'
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
