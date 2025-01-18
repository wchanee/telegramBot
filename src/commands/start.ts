import { bot } from '@/bot'
import { state } from '@/state'

export const commandStart = async (idChat: number) => {
	state.isActive = true
	return await bot.sendMessage(
		idChat,
		`
📢 记账管理机器人已成功启动！
祝您记账愉快！ 😊
        `,
		{
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [[{ text: '详细说明 📍', callback_data: 'help' }]],
			},
		}
	)
}
