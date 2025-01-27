import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandRestoreSpot = async ({
	idChat,
	idReplyTo,
	value,
	hideReport = true,
}: {
	value: string
	idChat: number
	idReplyTo: number
	hideReport?: boolean
}) => {
	if (!state.recordsSpot[value]) {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 restoreSpot[恢复id, 例:恢复1], 并且ID必须存在于记录中。`,
			hideReport,
		})
		return
	}

	const record = state.recordsSpot[value]
	if (record) {
		record.condition = 'normal'
		await sendMessage({
			idChat,
			idReplyTo,
			message: `✔️ 恢复记录成功！`,
		})
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 restoreSpot[恢复id, 例:恢复1], 并且ID必须存在于记录中。`,
			hideReport,
		})
	}
}
