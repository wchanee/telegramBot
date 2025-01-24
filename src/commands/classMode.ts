import { bot } from '@/bot'

export const commandEnableChat = async (idChat: number) => {
	try {
		await bot.setChatPermissions(idChat, {
			can_send_messages: true, // Allow everyone to send messages
			can_send_polls: true, // Allow polls
			can_add_web_page_previews: true, // Allow web page previews
			can_change_info: false, // Disallow changing group info
			can_invite_users: true, // Allow inviting users
			can_pin_messages: false, // Disallow pinning messages
		})
		await bot.sendMessage(
			idChat,
			'✅ Everyone can now participate in the conversation.'
		)
	} catch (error) {
		console.error('Error enabling chat:', error)
		await bot.sendMessage(idChat, '❌ Failed to enable chat.')
	}
}

export const commandRestrictChat = async (idChat: number) => {
	try {
		await bot.setChatPermissions(idChat, {
			can_send_messages: false, // Restrict normal users from sending messages
			can_send_polls: false, // Disallow polls
			can_add_web_page_previews: false, // Disallow web page previews
			can_change_info: false, // Disallow changing group info
			can_invite_users: false, // Disallow inviting users
			can_pin_messages: false, // Disallow pinning messages
		})
		await bot.sendMessage(idChat, '🚫 Only admins can send messages now.')
	} catch (error) {
		console.error('Error restricting chat:', error)
		await bot.sendMessage(idChat, '❌ Failed to restrict chat.')
	}
}
