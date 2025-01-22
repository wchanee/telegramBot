import { bot } from '@/bot'

export const commandEnableChat = async (idChat: number) => {
	try {
		await bot.setChatPermissions(idChat, {
			can_send_messages: true,
			can_send_polls: true,
			can_add_web_page_previews: true,
			can_change_info: false,
			can_invite_users: true,
			can_pin_messages: false,
		})
		await bot.sendMessage(idChat, '✅ 群中每个人现在都可以参与对话。')
	} catch (error) {
		console.error('启用聊天时出错:', error)
		await bot.sendMessage(idChat, '❌ 未能成功启用聊天。')
	}
}

export const commandRestrictChat = async (idChat: number) => {
	try {
		await bot.setChatPermissions(idChat, {
			can_send_messages: false,
			can_send_polls: false,
			can_add_web_page_previews: false,
			can_change_info: false,
			can_invite_users: false,
			can_pin_messages: false,
		})
		await bot.sendMessage(idChat, '🚫 群中现在只有管理员可以发送消息。')
	} catch (error) {
		console.error('限制聊天时出错:', error)
		await bot.sendMessage(idChat, '❌ 未能成功限制聊天。')
	}
}
