import { bot } from '@/bot'
import { report } from '@/report'

export const sendMessage = async ({
	idChat,
	idReplyTo,
	message,
	hideReport,
}: {
	idChat: number
	idReplyTo: number
	message: string
	hideReport?: boolean
}) => {
	await bot.sendMessage(
		idChat,
		`${message}
        ${hideReport ? '' : report()}
        `,
		{
			reply_to_message_id: idReplyTo,
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [
					hideReport
						? [{ text: '帮助', callback_data: 'help' }]
						: [
								{ text: '导出PDF', callback_data: 'pdf' },
								{ text: '帮助', callback_data: 'help' },
							],
				],
			},
		}
	)
}
