import { state } from '@/state'

import { sendMessage } from './__utils'

export const commandRemove = async ({
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
	if (value && state.recordsFiat[value]) {
		const record = state.recordsFiat[value]
		if (record) {
			record.condition = 'remove'
			await sendMessage({
				idChat,
				idReplyTo,
				message: `✔️ 移除记录成功!`,
			})
		}
	} else {
		await sendMessage({
			idChat,
			idReplyTo,
			message: `
			❌ 格式错误，正确格式为 [移除id, 例:移除1], 并且ID不可大于记录数量。`,
			hideReport,
		})
	}
}
