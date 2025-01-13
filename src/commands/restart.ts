import { bot } from '@/bot'
import { state } from '@/state'

export const commandRestart = async (idChat: number) => {
	state.rate = 4.45
	state.fee = 2
	state.records = []

	return await bot.sendMessage(idChat, `所有数据已经重置`, {
		parse_mode: 'HTML',
	})
}
