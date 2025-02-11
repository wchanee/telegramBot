import { state } from '@/state'
import { sendMessage } from './__utils'
import { isSameDay } from 'date-fns'
import { bot } from '@/bot'

export const commandClearTodayReport = async ({
	idChat,
	idReplyTo,
	hideReport = true,
}: {
	idChat: number
	idReplyTo: number
	hideReport?: boolean
}) => {
	const today = new Date()

	const todayRecords = [
		...Object.entries(state.recordsFiat),
		...Object.entries(state.recordsSpot),
	].filter(([_, record]) => isSameDay(record.date, today))

	if (todayRecords.length === 0) {
		await sendMessage({
			idChat,
			idReplyTo,
			message: '✅ 今日没有账单记录可清除。',
			hideReport,
		})
		return
	}

	await sendMessage({
		idChat,
		idReplyTo,
		message: `⚠️ 您确定要清除今日账单记录吗？共有 ${todayRecords.length} 笔记录。\n请回复 "确认" 以继续。`,
		hideReport,
	})

	bot.once('message', async msg => {
		if (msg.text?.trim() === '确认') {
			state.recordsFiat = Object.fromEntries(
				Object.entries(state.recordsFiat).filter(
					([_, record]) => !isSameDay(record.date, today)
				)
			)

			state.recordsSpot = Object.fromEntries(
				Object.entries(state.recordsSpot).filter(
					([_, record]) => !isSameDay(record.date, today)
				)
			)

			await sendMessage({
				idChat,
				idReplyTo,
				message: `✅ 已清除今日账单记录（共 ${todayRecords.length} 笔）。`,
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
