// import { bot } from '@/bot'

// export const authorization = async ({
// 	idChat,
// 	idUser,
// }: {
// 	idChat: number
// 	idUser: number | undefined
// }) => {
// 	try {
// 		if (!idUser) throw 'No user id'
// 		const ChatMember = await bot.getChatMember(idChat, idUser)
// 		return ChatMember.status === 'administrator' ||
// 			ChatMember.status === 'creator'
// 			? 1
// 			: 0
// 	} catch (error) {
// 		console.error('Permission error: ', error)
// 		throw error
// 	}
// }

import { bot } from '@/bot'

export const authorization = async ({
	idChat,
	idUser,
}: {
	idChat: number
	idUser: number | undefined
}) => {
	try {
		if (!idUser) throw new Error('No user ID provided')
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
		console.error('Authorization error: ', error)
		throw error
	}
}
