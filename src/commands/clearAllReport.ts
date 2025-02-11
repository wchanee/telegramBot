import { state } from '@/state'
import { sendMessage } from './__utils'
import { bot } from '@/bot'

export const commandClearAllReport = async ({
	idChat,
	idReplyTo,
	hideReport = true,
}: {
	idChat: number
	idReplyTo: number
	hideReport?: boolean
}) => {
	const totalRecords =
		Object.keys(state.recordsFiat).length +
		Object.keys(state.recordsSpot).length

	if (totalRecords === 0) {
		await sendMessage({
			idChat,
			idReplyTo,
			message: '✅ 当前没有账单记录可清除。',
			hideReport,
		})
		return
	}

	await sendMessage({
		idChat,
		idReplyTo,
		message: `⚠️ 您确定要清除全部账单记录吗？共有 ${totalRecords} 笔记录。\n请回复 "确认" 以继续。`,
		hideReport,
	})

	bot.once('message', async msg => {
		if (msg.text?.trim() === '确认') {
			state.recordsFiat = {}
			state.recordsSpot = {}

			await sendMessage({
				idChat,
				idReplyTo,
				message: `✅ 已清除全部账单记录（共 ${totalRecords} 笔）。`,
				hideReport,
			})
		} else {
			await sendMessage({
				idChat,
				idReplyTo,
				message: '❌ 清除操作已取消。',
				hideReport,
			})
		}
	})
}
