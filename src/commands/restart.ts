import { bot } from '@/bot'
import { state } from '@/state'

export const commandRestart = async (idChat: number) => {
	state.rate = 4.45
	state.fee = 2
	state.records = []

	return await bot.sendMessage(
		idChat,
		`
		📢设置收工成功!
		所有数据已经重置,
		祝您2025顺风顺水顺顺财神,
		明日依旧丝滑。
		`,
		{
			parse_mode: 'HTML',
		}
	)
}
