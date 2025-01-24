import { state } from '@/state'
import { coerce } from 'zod'
import { sendMessage } from './__utils'

export const commandRestoreSpot = async ({
	idChat,
	idReplyTo,
	value,
}: {
	value: string
	idChat: number
	idReplyTo: number
}) => {
	if (!state.recordsSpot[value]) {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `❌ 格式错误，正确格式为 restore[恢复id, 例:恢复1], 并且id必须存在于记录中。`,
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
			message: `❌ 记录未找到, 请检查输入的ID是否正确。`,
		})
	}
}
