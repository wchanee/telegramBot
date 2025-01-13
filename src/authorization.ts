import { bot } from '@/bot'

export const authorization = async ({
	idChat,
	idUser,
}: {
	idChat: number
	idUser: number | undefined
}) => {
	try {
		if (!idUser) throw 'No user id'
		const ChatMember = await bot.getChatMember(idChat, idUser)
		return ChatMember.status === 'administrator' ||
			ChatMember.status === 'creator'
			? 1
			: 0
	} catch (error) {
		console.error('Permission error: ', error)
		throw error
	}
}
