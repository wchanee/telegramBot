import { bot } from '@/bot'

export const authorization = async ({
	idChat,
	idUser,
	idReplyTo,
}: {
	idChat: number
	idUser: number | undefined
	idReplyTo: number
}) => {
	try {
		if (!idUser) throw new Error('没有用户ID')
		const ChatMember = await bot.getChatMember(idChat, idUser)
		if (
			ChatMember.status === 'administrator' ||
			ChatMember.status === 'creator'
		) {
			return true // User is authorized
		} else {
			throw new Error()
		}
	} catch (error) {
		console.error('❌ 授权错误: ', error)
		await bot.sendMessage(
			idChat,
			`❌ 您没有权限或权限已过期，请打开机器人申请使用或联系客服授权。`,
			{ reply_to_message_id: idReplyTo }
		)
	}
}
